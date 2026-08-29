import { useState, type Ref } from "react";
import { profile, type TimelineItem } from "../data/profile";
import type { IntentId } from "../data/intents";

type TimelineProps = {
  active: IntentId | null;
  onSelect: (id: IntentId) => void;
  listRef?: Ref<HTMLOListElement>;
  elevated?: boolean;
};

export function Timeline({
  active,
  onSelect,
  listRef,
  elevated,
}: TimelineProps) {
  const items = profile.timeline;
  const [hovered, setHovered] = useState<TimelineItem["id"] | null>(null);

  return (
    <ol
      ref={listRef}
      className={`mt-10 ${elevated ? "relative z-50" : ""}`}
      onMouseLeave={() => setHovered(null)}
    >
      {items.map((item, index) => {
        const isActive = active === item.id;
        const isOpen = hovered ? hovered === item.id : isActive;
        const isLast = index === items.length - 1;

        return (
          <li key={item.id} className="relative">
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              onMouseEnter={() => setHovered(item.id)}
              className={`grid w-full grid-cols-[3.25rem_12px_1fr] items-start gap-3 text-left transition-colors duration-150 ${
                isLast ? "pb-0" : "pb-6"
              } ${isOpen ? "text-ink" : "text-ink-muted hover:text-ink"}`}
            >
              <span className="pt-px text-[13px] font-medium tabular-nums tracking-[0.02em]">
                {item.year}
              </span>
              <span className="relative flex min-h-4 w-3 justify-center self-stretch">
                {!isLast ? (
                  <span className="absolute top-2.5 bottom-[-1.5rem] w-px bg-line" />
                ) : null}
                <span
                  className={`relative z-10 mt-1 h-2 w-2 rounded-full ${
                    isOpen ? "bg-ink" : "bg-ink-faint"
                  }`}
                />
              </span>
              <span className="min-w-0 text-[13px] leading-5">
                <span className="block">
                  {item.title}
                  <span className="text-ink-faint"> · {item.kind}</span>
                </span>
                <span
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-200 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <span className="min-h-0">
                    <span className="mt-1.5 block text-[12px] leading-5 text-ink-faint">
                      {item.blurb}
                      <br />
                      {item.stack}
                      <br />
                      <span className="text-ink-muted">→ Ask Avez</span>
                    </span>
                  </span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
