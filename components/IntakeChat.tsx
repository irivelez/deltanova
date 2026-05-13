"use client";

import { useChat } from "@ai-sdk/react";
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from "ai";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const OPENING = `You're at the entry point for Deltanova.

We're recruiting our first 10 design partners. I'll help you find out in 15 minutes whether you're a fit — or whether we're not the right match yet. Either way, you'll know fast.

Most aren't a fit. That's how we keep it honest. The ones who are, get our complete focus and resources.

First question:

Walk me through last Tuesday. Where did time go that you couldn't recover?`;

type SubmitOutput = {
  success: boolean;
  verdict?: "qualified" | "borderline" | "not-qualified";
  bookingUrl?: string | null;
  message?: string;
  error?: string;
};

export function IntakeChat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/intake/chat" }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
  });

  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === "streaming" || status === "submitted") return;
    sendMessage({ text: input.trim() });
    setInput("");
  };

  const isBusy = status === "submitted" || status === "streaming";

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-6 md:px-12 py-5 border-b border-foreground/10 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-mono text-foreground/60 hover:text-foreground transition-colors"
        >
          ← deltanova.io
        </Link>
        <div className="text-xs font-mono text-foreground/40 uppercase tracking-widest">
          Entry point · Design-partner cohort
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 md:px-12 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Static opening */}
          <Message role="agent">
            <div className="whitespace-pre-wrap leading-relaxed">{OPENING}</div>
          </Message>

          {messages.map((m) => (
            <Message key={m.id} role={m.role === "user" ? "user" : "agent"}>
              {m.parts.map((part, idx) => {
                if (part.type === "text") {
                  return (
                    <div
                      key={idx}
                      className="whitespace-pre-wrap leading-relaxed"
                    >
                      {part.text}
                    </div>
                  );
                }
                if (part.type === "tool-submit_intake") {
                  if (part.state === "output-available") {
                    const output = part.output as SubmitOutput;
                    return <IntakeResult key={idx} output={output} />;
                  }
                  if (part.state === "input-streaming" || part.state === "input-available") {
                    return (
                      <div
                        key={idx}
                        className="text-xs font-mono text-foreground/40 mt-2"
                      >
                        [submitting intake…]
                      </div>
                    );
                  }
                }
                return null;
              })}
            </Message>
          ))}

          {status === "submitted" && (
            <div className="text-xs font-mono text-foreground/40 mb-6">
              thinking…
            </div>
          )}

          <div ref={endRef} />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-foreground/10 px-4 md:px-12 py-4 bg-background"
      >
        <div className="max-w-3xl mx-auto flex gap-3 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent);
              }
            }}
            rows={1}
            placeholder="Your answer…"
            className="flex-1 bg-transparent border border-foreground/20 px-4 py-3 text-base resize-none focus:outline-none focus:border-foreground/60 placeholder:text-foreground/30 font-sans"
            disabled={isBusy}
          />
          <button
            type="submit"
            disabled={!input.trim() || isBusy}
            className="px-5 py-3 border border-foreground/40 hover:border-foreground hover:bg-foreground/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-medium"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

function Message({
  role,
  children,
}: {
  role: "user" | "agent";
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="text-[10px] font-mono text-foreground/40 mb-2 uppercase tracking-widest">
        {role === "user" ? "you" : "deltanova"}
      </div>
      <div
        className={`text-base md:text-lg ${
          role === "user" ? "text-foreground/85" : "text-foreground"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function IntakeResult({ output }: { output: SubmitOutput }) {
  if (!output.success) {
    return (
      <div className="mt-4 border border-red-400/30 p-6">
        <div className="text-xs font-mono text-red-400/80 uppercase tracking-widest mb-2">
          submission error
        </div>
        <div className="text-foreground/70">
          {output.error || "Something went wrong. Please try again."}
        </div>
      </div>
    );
  }

  const verdict = output.verdict ?? "borderline";
  const tone =
    verdict === "qualified"
      ? "border-emerald-400/40"
      : verdict === "borderline"
        ? "border-yellow-400/40"
        : "border-foreground/20";

  return (
    <div className={`mt-4 border ${tone} p-6`}>
      <div className="text-xs font-mono text-foreground/50 uppercase tracking-widest mb-3">
        intake complete · verdict: {verdict.replace("-", " ")}
      </div>
      <div className="text-foreground/90 mb-5 leading-relaxed">
        {output.message}
      </div>
      {output.bookingUrl && (
        <a
          href={output.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 border border-foreground/40 hover:border-foreground hover:bg-foreground/5 transition-colors font-medium"
        >
          Book the 90-minute discovery →
        </a>
      )}
    </div>
  );
}
