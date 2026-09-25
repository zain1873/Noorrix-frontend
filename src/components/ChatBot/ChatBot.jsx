"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { HiXMark, HiPaperAirplane, HiMinus } from "react-icons/hi2";
import { SiChatbot } from "react-icons/si";
import { getCars } from "../../lib/cars";
import ChatCarCard, { ChatCarCardSkeleton, BOOKING_URL } from "./ChatCarCard";
import "./ChatBot.css";

const WELCOME = {
  from: "bot",
  text: "Hi there! 👋 I'm the Noorrix Motors assistant. How can I help you today?",
};

// `href` chips open a page; the rest are sent to the assistant as a message.
const QUICK_REPLIES = [
  { label: "Find me a car" },
  { label: "Book a test drive", href: BOOKING_URL },
  { label: "Browse all stock", href: "/stock" },
  { label: "Part exchange my car", href: "/part-exchange#valuation-form" },
  { label: "Book a service" },
  { label: "Contact the team" },
];

const FALLBACK =
  "Sorry, I can't answer right now. Please call our team on 07300 503113 or use our [contact form](/contact).";

/** Card for a [[car:ID]] tag — skeleton while stock loads, plain link if the car can't be found. */
function CarSlot({ id, car, carsStatus }) {
  if (car) return <ChatCarCard car={car} />;
  if (carsStatus === "loading") return <ChatCarCardSkeleton />;
  return <a href={`/cars/${id}`} className="ncb-link">View car details →</a>;
}

const OPTIONS_RE = /\[\[options:([^\]]*)\]\]/;

/** Answer buttons the bot asked for with [[options: A | B | C]]. */
function parseOptions(text) {
  const m = text.match(OPTIONS_RE);
  return m ? m[1].split("|").map((o) => o.trim()).filter(Boolean).slice(0, 6) : [];
}

// Renders the bot's text: [[car:ID]] cards, **bold** and [markdown links](/path).
// Only site-relative, tel: and mailto: links are turned into anchors.
function renderText(rawText, carsById, carsStatus) {
  const text = rawText
    .replace(new RegExp(OPTIONS_RE.source, "g"), "")  // options render as buttons below the bubble
    .replace(/\[\[[^\]]*\]?$/, "")                  // hide a tag still streaming in
    .replace(/\s*(\[\[car:\d+\]\])\s*/g, "$1");     // cards are blocks; drop surrounding line breaks
  const out = [];
  const re = /\[\[car:(\d+)\]\]|\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      out.push(<CarSlot key={m.index} id={m[1]} car={carsById[m[1]]} carsStatus={carsStatus} />);
    } else if (m[4]) {
      out.push(<strong key={m.index}>{m[4]}</strong>);
    } else if (/^(\/(?!\/)|tel:|mailto:)/.test(m[3])) {
      out.push(<a key={m.index} href={m[3]} className="ncb-link">{m[2]} →</a>);
    } else {
      out.push(m[2]);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last).trimEnd());
  return out;
}

// The conversation is kept in sessionStorage: it survives page changes and refreshes,
// and the browser deletes it when the tab is closed. It is also cleared after a minute
// with no activity (no new message and no typing).
const STORAGE_KEY = "noorrix-chat";
const MAX_STORED = 30; // messages kept, not counting the welcome message
const IDLE_MS = 60 * 1000;

/** Saved chat plus the time of its last activity; a fresh chat if none or it has gone idle. */
function loadMessages() {
  const fresh = { messages: [WELCOME], lastActive: Date.now() };
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(saved?.messages) || !(Date.now() - saved.lastActive < IDLE_MS)) return fresh;
    const valid = saved.messages.filter((m) => (m?.from === "user" || m?.from === "bot") && typeof m.text === "string");
    return { messages: [WELCOME, ...valid.slice(-MAX_STORED)], lastActive: saved.lastActive };
  } catch {
    return fresh;
  }
}

function saveMessages(messages, lastActive) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages: messages.slice(1).slice(-MAX_STORED), lastActive }));
  } catch {
    /* storage full or blocked (private mode) — the chat still works, it just isn't kept */
  }
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const restoredRef = useRef(false);
  const restoringRef = useRef(false); // the next messages change is the restore, not new activity
  const lastActiveRef = useRef(0);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const [carsById, setCarsById] = useState({});
  const [carsStatus, setCarsStatus] = useState("idle"); // idle | loading | ready
  const abortRef = useRef(null);
  const carsLoadedRef = useRef(false);

  // Car details for the in-chat cards — loaded once, the first time the chat opens.
  useEffect(() => {
    if (!open || carsLoadedRef.current) return;
    carsLoadedRef.current = true;
    setCarsStatus("loading");
    getCars()
      .then((cars) => setCarsById(Object.fromEntries((cars || []).map((c) => [String(c.id), c]))))
      .finally(() => setCarsStatus("ready"));
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  // Save after every change — but only once the saved chat has been restored,
  // so the initial welcome-only state never overwrites it.
  useEffect(() => {
    if (!restoredRef.current) return;
    if (restoringRef.current) restoringRef.current = false;
    else lastActiveRef.current = Date.now();
    saveMessages(messages, lastActiveRef.current);
  }, [messages]);

  // Empty the chat once it has been idle for a minute. Paused while a reply is streaming;
  // typing in the box counts as activity.
  useEffect(() => {
    if (typing || messages.length <= 1) return;
    const timer = setTimeout(() => {
      setMessages([WELCOME]);
      setInput("");
    }, Math.max(0, lastActiveRef.current + IDLE_MS - Date.now()));
    return () => clearTimeout(timer);
  }, [messages, input, typing]);

  // The saved chat is restored the first time the chat is opened (the panel is closed
  // on page load, and restoring here keeps the server and client render identical).
  const toggleOpen = () => {
    if (!restoredRef.current) {
      restoredRef.current = true;
      restoringRef.current = true;
      const saved = loadMessages();
      lastActiveRef.current = saved.lastActive;
      setMessages(saved.messages);
    }
    setOpen((o) => !o);
  };

  // Appends streamed text to the last (bot) message.
  const appendToBot = (chunk) =>
    setMessages((m) => {
      const next = [...m];
      next[next.length - 1] = { ...next[next.length - 1], text: next[next.length - 1].text + chunk };
      return next;
    });

  const send = async (text) => {
    const value = text.trim();
    if (!value || typing) return;

    const history = [...messages.slice(1), { from: "user", text: value }]; // skip the welcome message
    setMessages((m) => [...m, { from: "user", text: value }]);
    setInput("");
    setTyping(true);

    const controller = new AbortController();
    abortRef.current = controller;
    let started = false;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text })),
        }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        const error = new Error(data.error || "chat_failed");
        error.fromServer = Boolean(data.error);
        throw error;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value: bytes } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(bytes, { stream: true });
        if (!chunk) continue;
        if (!started) {
          started = true;
          setTyping(false);
          setMessages((m) => [...m, { from: "bot", text: chunk }]);
        } else {
          appendToBot(chunk);
        }
      }
      if (!started) throw new Error("empty_reply");
    } catch (err) {
      if (err.name === "AbortError") return;
      // Our API's error messages already include the phone link — show them as they are.
      // Anything else (network failure, empty reply) gets the generic fallback.
      const msg = err.fromServer ? err.message : FALLBACK;
      if (started) appendToBot("\n\n" + FALLBACK);
      else setMessages((m) => [...m, { from: "bot", text: msg }]);
    } finally {
      setTyping(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  // A link to a section of the page we're already on (e.g. the booking link while on
  // /appointment) only scrolls, so close the chat to reveal it.
  const onPanelClick = (e) => {
    const a = e.target.closest?.("a[href]");
    if (!a || a.target === "_blank") return;
    const url = new URL(a.href, window.location.href);
    if (url.hash && url.pathname === window.location.pathname) setOpen(false);
  };

  return (
    <div className={`ncb ${open ? "ncb--open" : ""}`}>
      <section
        className="ncb-panel"
        role="dialog"
        aria-label="Noorrix Motors chat assistant"
        aria-hidden={!open}
        onClick={onPanelClick}
      >
        <header className="ncb-header">
          <div className="ncb-avatar">
            <SiChatbot size={20} />
          </div>
          <div className="ncb-heading">
            <strong>Noorrix Assistant</strong>
            <span><i className="ncb-dot" /> Online · Replies instantly</span>
          </div>
          <button type="button" className="ncb-icon-btn" onClick={() => setOpen(false)} aria-label="Minimise chat">
            <HiMinus size={20} />
          </button>
        </header>

        <div className="ncb-body" ref={listRef}>
          <p className="ncb-day">Today</p>
          {messages.map((m, i) => {
            const options = m.from === "bot" && i === messages.length - 1 && !typing ? parseOptions(m.text) : [];
            return (
              <Fragment key={i}>
                <div className={`ncb-row ncb-row--${m.from}`}>
                  {m.from === "bot" && (
                    <div className="ncb-mini-avatar"><SiChatbot size={13} /></div>
                  )}
                  <div className="ncb-bubble">
                    {m.from === "bot" ? renderText(m.text, carsById, carsStatus) : m.text}
                  </div>
                </div>
                {options.length > 0 && (
                  <div className="ncb-options">
                    {options.map((o) => (
                      <button key={o} type="button" className="ncb-option" onClick={() => send(o)}>
                        {o}
                      </button>
                    ))}
                  </div>
                )}
              </Fragment>
            );
          })}

          {typing && (
            <div className="ncb-row ncb-row--bot">
              <div className="ncb-mini-avatar"><SiChatbot size={13} /></div>
              <div className="ncb-bubble ncb-typing" aria-label="Assistant is typing">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>

        <div className="ncb-chips">
          {QUICK_REPLIES.map((q) =>
            q.href ? (
              <a key={q.label} href={q.href} className="ncb-chip">{q.label} →</a>
            ) : (
              <button key={q.label} type="button" className="ncb-chip" onClick={() => send(q.label)} disabled={typing}>
                {q.label}
              </button>
            )
          )}
        </div>

        <form className="ncb-form" onSubmit={onSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              lastActiveRef.current = Date.now();
              setInput(e.target.value);
            }}
            placeholder="Type your message…"
            aria-label="Type your message"
            maxLength={500}
          />
          <button type="submit" className="ncb-send" disabled={!input.trim() || typing} aria-label="Send message">
            <HiPaperAirplane size={18} />
          </button>
        </form>
        <p className="ncb-footnote">Powered by Noorrix Motors</p>
      </section>

      <button
        type="button"
        className="ncb-launcher"
        onClick={toggleOpen}
        aria-label={open ? "Close chat" : "Chat with us"}
        aria-expanded={open}
      >
        <span className="ncb-launcher-icon ncb-launcher-icon--chat"><SiChatbot size={26} /></span>
        <span className="ncb-launcher-icon ncb-launcher-icon--close"><HiXMark size={26} /></span>
      </button>
    </div>
  );
}
