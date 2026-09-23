import { NextResponse } from "next/server";
import { getCars } from "@/lib/cars";
import { buildSystemPrompt } from "@/lib/chatPrompt";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL?.trim() || "openai/gpt-oss-120b";

const MAX_HISTORY = 20;       // messages sent to the model per request
const MAX_MESSAGE_LEN = 1000; // characters per message

// Simple in-memory rate limit per IP. Resets on server restart and is per
// instance, which is fine for a single small deployment.
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

const fail = (message, status) => NextResponse.json({ error: message }, { status });

export async function POST(request) {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    console.error("[chat route] GROQ_API_KEY is not set");
    return fail("Chat is unavailable right now.", 503);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (rateLimited(ip)) {
    return fail("You're sending messages too quickly. Please wait a few minutes, or call us on 07300 503113.", 429);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid request.", 400);
  }

  const messages = (Array.isArray(body?.messages) ? body.messages : [])
    .filter((m) => (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_MESSAGE_LEN) }));

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return fail("Invalid request.", 400);
  }

  const cars = await getCars();

  let groqRes;
  try {
    groqRes = await fetch(GROQ_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.4,
        max_completion_tokens: 500,
        reasoning_effort: "low",
        include_reasoning: false,
        messages: [{ role: "system", content: buildSystemPrompt(cars || []) }, ...messages],
      }),
      signal: AbortSignal.timeout(20000),
    });
  } catch (err) {
    console.error("[chat route] Groq request failed:", err?.message);
    return fail("Chat is unavailable right now.", 503);
  }

  if (!groqRes.ok || !groqRes.body) {
    console.error("[chat route] Groq status:", groqRes.status, (await groqRes.text().catch(() => "")).slice(0, 300));
    return fail(
      groqRes.status === 429 ? "Our assistant is busy right now." : "Chat is unavailable right now.",
      groqRes.status === 429 ? 429 : 503
    );
  }

  // Groq streams OpenAI-style SSE ("data: {...}\n\n"). Forward only the text
  // content to the browser as a plain text stream.
  const reader = groqRes.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();
        for (const line of lines) {
          const data = line.startsWith("data:") ? line.slice(5).trim() : "";
          if (!data || data === "[DONE]") continue;
          try {
            const text = JSON.parse(data).choices?.[0]?.delta?.content;
            if (text) controller.enqueue(encoder.encode(text));
          } catch {
            /* partial or non-JSON line — skip */
          }
        }
      } catch (err) {
        console.error("[chat route] stream error:", err?.message);
        controller.close();
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
