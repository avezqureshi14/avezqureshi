import type { Ref } from "react";
import { profile } from "../data/profile";
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

  return (
    <ol
      ref={listRef}
      className={`mt-10 ${elevated ? "relative z-50" : ""}`}
    >
      {items.map((item, index) => {
        const isActive = active === item.id;
        const isLast = index === items.length - 1;

        return (
          <li key={item.id} className="relative">
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              className={`grid w-full grid-cols-[3.25rem_12px_1fr] items-start gap-3 text-left transition-colors duration-150 ${
                isLast ? "pb-0" : "pb-6"
              } ${isActive ? "text-ink" : "text-ink-muted hover:text-ink"}`}
            >
              <span className="pt-px text-[13px] font-medium tabular-nums tracking-[0.02em]">
                {item.year}
              </span>
              <span className="relative flex h-4 w-3 justify-center">
                {!isLast ? (
                  <span className="absolute top-2.5 bottom-[-1.6rem] w-px bg-line" />
                ) : null}
                <span
                  className={`relative z-10 mt-1 h-2 w-2 rounded-full ${
                    isActive ? "bg-ink" : "bg-ink-faint"
                  }`}
                />
              </span>
              <span className="text-[13px] leading-5">
                {item.title}
                <span className="text-ink-faint"> · {item.kind}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
