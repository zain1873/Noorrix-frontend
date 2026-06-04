import { NextResponse } from "next/server";

const DRF_URL = process.env.NEXT_PUBLIC_API_URL?.trim();

export async function POST(request) {
  if (!DRF_URL) {
    console.error("[contact route] NEXT_PUBLIC_API_URL is not set");
    return NextResponse.json(
      { success: false, message: "Server misconfiguration. Please contact us directly." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    const errors = {};
    if (!name?.trim() || name.trim().length < 2)
      errors.name = ["Name must be at least 2 characters."];
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errors.email = ["Enter a valid email address."];
    if (!subject?.trim() || subject.trim().length < 3)
      errors.subject = ["Subject must be at least 3 characters."];
    if (!message?.trim() || message.trim().length < 10)
      errors.message = ["Message must be at least 10 characters."];

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const backendUrl = `${DRF_URL}/api/contact/`;
    console.log("[contact route] calling:", backendUrl);
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || "",
        subject: subject.trim(),
        message: message.trim(),
      }),
    });

    const rawText = await res.text();
    console.log("[contact route] backend status:", res.status, "body:", rawText.substring(0, 300));

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        { success: false, message: "Backend returned unexpected response." },
        { status: 500 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { success: false, errors: data.errors || {}, message: data.message || "Something went wrong." },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, message: data.message || "Your message has been sent. We'll be in touch shortly." });
  } catch (err) {
    console.error("[contact route] error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
