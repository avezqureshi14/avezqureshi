import { useEffect, useState } from "react";

type TimelineTourProps = {
  target: HTMLElement | null;
  open: boolean;
  onSkip: () => void;
};

type Hole = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const TITLE = "Click a company";
const BODY =
  "Omron, Rakuten, or TalentOS — the chat will tell you what I built there.";

function measure(el: HTMLElement): Hole {
  const rect = el.getBoundingClientRect();
  const pad = 10;
  return {
    top: rect.top - pad,
    left: rect.left - pad,
    width: rect.width + pad * 2,
    height: rect.height + pad * 2,
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function TimelineTour({ target, open, onSkip }: TimelineTourProps) {
  const [hole, setHole] = useState<Hole | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!open || !target) {
      setHole(null);
      return;
    }

    function update() {
      if (target) setHole(measure(target));
    }

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, target]);

  useEffect(() => {
    if (!open) {
      setTitle("");
      setBody("");
      setReady(false);
      return;
    }

    let cancelled = false;

    async function typeLine(full: string, setter: (value: string) => void) {
      let shown = "";
      for (const part of full.split(/(\s+)/).filter((part) => part.length > 0)) {
        if (cancelled) return;
        shown += part;
        setter(shown);
        await sleep(22);
      }
    }

    void (async () => {
      await sleep(180);
      if (cancelled) return;
      await typeLine(TITLE, setTitle);
      if (cancelled) return;
      await sleep(120);
      await typeLine(BODY, setBody);
      if (cancelled) return;
      setReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [open]);

  if (!open || !hole) return null;

  const tipOnRight = hole.left + hole.width + 300 < window.innerWidth;
  const tipStyle = tipOnRight
    ? { top: hole.top + 8, left: Math.min(hole.left + hole.width + 20, window.innerWidth - 300) }
    : { top: hole.top + hole.height + 16, left: hole.left };

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      <div
        className="tour-hole pointer-events-none"
        style={{
          top: hole.top,
          left: hole.left,
          width: hole.width,
          height: hole.height,
        }}
      />
      <div className="pointer-events-auto absolute max-w-[260px]" style={tipStyle}>
        <p className="min-h-[20px] text-[14px] font-medium leading-5 tracking-[-0.011em] text-ink">
          {title}
          {!ready && body.length === 0 ? (
            <span className="ml-0.5 inline-block h-[1em] w-[1px] translate-y-0.5 bg-ink align-middle" />
          ) : null}
        </p>
        <p className="mt-1.5 min-h-[40px] text-[13px] leading-5 text-ink-muted">
          {body}
          {!ready && title === TITLE ? (
            <span className="ml-0.5 inline-block h-[1em] w-[1px] translate-y-0.5 bg-ink-muted align-middle" />
          ) : null}
        </p>
        <button
          type="button"
          onClick={onSkip}
          className="mt-4 rounded-full bg-chip px-4 py-1.5 text-[13px] font-medium text-ink transition-colors duration-150 hover:bg-line"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
