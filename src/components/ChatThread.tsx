import { useEffect, useRef } from "react";
import type { IntentId } from "../data/intents";
import { linkify } from "../lib/linkify";
import { useScrollbarReveal } from "../lib/useScrollbarReveal";
import type { ChatMessage } from "../types";
import { Chip } from "./Chip";

type ChatThreadProps = {
  messages: ChatMessage[];
  onChip: (id: IntentId) => void;
};

export function ChatThread({ messages, onChip }: ChatThreadProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const { scrolling, onScroll } = useScrollbarReveal();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const lastAvez = [...messages].reverse().find((item) => item.role === "avez");

  return (
    <div
      onScroll={onScroll}
      className={`sleek-scroll flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto pr-1 lg:gap-8 lg:pr-2 ${
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
            className="animate-in max-w-[40rem] break-words"
          >
            <p className="mb-2 text-[11px] tracking-[0.02em] text-ink-faint">
              {message.role === "you" ? "You" : "Avez"}
            </p>
            <p
              className={
                message.role === "you"
                  ? "whitespace-pre-wrap text-[15px] font-medium leading-[1.6] tracking-[-0.011em] text-ink lg:text-[16px] lg:leading-[1.65]"
                  : "whitespace-pre-wrap text-[15px] leading-[1.6] tracking-[-0.011em] text-ink lg:text-[16px] lg:leading-[1.65]"
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
            {showChips && message.id === "welcome" ? (
              <p className="mt-4 text-[13px] tracking-[-0.01em] text-ink-faint">
                or ask me anything ↓
              </p>
            ) : null}
          </article>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}
