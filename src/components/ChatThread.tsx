import { useEffect, useRef, useState } from "react";
import type { IntentId } from "../data/intents";
import { linkify } from "../lib/linkify";
import type { ChatMessage } from "../types";
import { Chip } from "./Chip";

type ChatThreadProps = {
  messages: ChatMessage[];
  onChip: (id: IntentId) => void;
};

export function ChatThread({ messages, onChip }: ChatThreadProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<number>(0);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  useEffect(() => {
    return () => window.clearTimeout(hideTimer.current);
  }, []);

  function onScroll() {
    setScrolling(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setScrolling(false), 700);
  }

  const lastAvez = [...messages].reverse().find((item) => item.role === "avez");

  return (
    <div
      onScroll={onScroll}
      className={`chat-scroll flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto pr-2 ${
        scrolling ? "is-scrolling" : ""
      }`}
    >
      {messages.map((message) => {
        const showChips =
          message.role === "avez" &&
          message.done &&
          lastAvez?.id === message.id &&
          message.chips.length > 0;

        return (
          <article
            key={message.id}
            className="animate-in max-w-[40rem]"
          >
            <p className="mb-2 text-[11px] tracking-[0.02em] text-ink-faint">
              {message.role === "you" ? "You" : "Avez"}
            </p>
            <p
              className={
                message.role === "you"
                  ? "whitespace-pre-wrap text-[16px] font-medium leading-[1.65] tracking-[-0.011em] text-ink"
                  : "whitespace-pre-wrap text-[16px] leading-[1.65] tracking-[-0.011em] text-ink"
              }
            >
              {message.role === "avez"
                ? linkify(message.displayed)
                : message.displayed}
              {!message.done && message.role === "avez" ? (
                <span className="ml-0.5 inline-block h-[1em] w-[1px] translate-y-0.5 bg-ink align-middle" />
              ) : null}
            </p>
            {message.done ? (
              <p className="mt-2 text-[11px] tracking-[0.02em] text-ink-faint">
                {message.time}
              </p>
            ) : null}
            {showChips ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {message.chips.map((chip) => (
                  <Chip key={chip} id={chip} onSelect={onChip} />
                ))}
              </div>
            ) : null}
          </article>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}
