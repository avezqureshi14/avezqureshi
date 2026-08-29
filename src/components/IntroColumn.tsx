import { useEffect, useState, type Ref } from "react";
import { profile } from "../data/profile";
import type { IntentId } from "../data/intents";
import { dayGreeting } from "../lib/greeting";
import { Timeline } from "./Timeline";

type IntroColumnProps = {
  active: IntentId | null;
  onSelect: (id: IntentId) => void;
  onAskMe: () => void;
  timelineRef?: Ref<HTMLOListElement>;
  tourActive?: boolean;
};

export function IntroColumn({
  active,
  onSelect,
  onAskMe,
  timelineRef,
  tourActive,
}: IntroColumnProps) {
  const [part, setPart] = useState(dayGreeting);

  useEffect(() => {
    const id = window.setInterval(() => setPart(dayGreeting()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <aside className="flex min-h-0 flex-col lg:h-full lg:justify-between">
      <div>
        <h1 className="text-[26px] font-medium leading-[1.15] tracking-[-0.03em] text-ink md:text-[36px]">
          {part}
        </h1>
        <p className="mt-4 max-w-[22rem] text-[15px] leading-[1.6] tracking-[-0.011em] text-ink-muted md:mt-6 md:text-[16px] md:leading-[1.65]">
          {profile.intro}
        </p>
        <p className="mt-3 max-w-[22rem] text-[15px] leading-[1.6] tracking-[-0.011em] text-ink-muted md:mt-4 md:text-[16px] md:leading-[1.65]">
          {profile.role}
        </p>
        <button
          type="button"
          onClick={onAskMe}
          className="mt-4 min-h-10 text-left text-[15px] font-medium tracking-[-0.011em] text-ink transition-colors duration-150 hover:text-ink-muted md:mt-5"
        >
          {profile.askMe}
          <span className="ml-1.5 text-ink-muted">→</span>
        </button>
        <Timeline
          active={active}
          onSelect={onSelect}
          listRef={timelineRef}
          elevated={tourActive}
        />
      </div>
      <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2 pb-1 text-[13px] text-ink-muted lg:mt-10">
        {profile.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer"
            className="transition-colors duration-150 hover:text-ink"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
