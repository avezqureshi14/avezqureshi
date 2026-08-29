import { useEffect, useRef, useState } from "react";
import "./App.css";
import { AskInput } from "./components/AskInput";
import { ChatThread } from "./components/ChatThread";
import { IntroColumn } from "./components/IntroColumn";
import { TimelineTour } from "./components/TimelineTour";
import { TopMark } from "./components/TopMark";
import {
  defaultChips,
  timelineAsk,
  type Intent,
  type IntentId,
} from "./data/intents";
import { fallbackReply, replies } from "./data/replies";
import { matchById, matchIntent } from "./lib/matchIntent";
import { applyTheme, type Theme } from "./lib/theme";
import { stamp } from "./lib/time";
import { hasSeenTour, markTourSeen } from "./lib/tour";
import { useScrollbarReveal } from "./lib/useScrollbarReveal";
import type { ChatMessage } from "./types";

const welcome = "What do you want to know?";

function welcomeMessage(): ChatMessage {
  return {
    id: "welcome",
    role: "avez",
    text: welcome,
    displayed: welcome,
    time: stamp(),
    chips: defaultChips,
    done: true,
  };
}

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function chunks(text: string): string[] {
  return text.split(/(\s+)/).filter((part) => part.length > 0);
}

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    welcomeMessage(),
  ]);
  const [busy, setBusy] = useState(false);
  const [active, setActive] = useState<IntentId | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.dataset.theme === "light" ? "light" : "dark";
  });
  const generation = useRef(0);
  const timelineRef = useRef<HTMLOListElement>(null);
  const askRef = useRef<HTMLInputElement>(null);
  const leftScroll = useScrollbarReveal();
  const [tourOpen, setTourOpen] = useState(false);
  const [tourTarget, setTourTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (hasSeenTour()) return;
    const timer = window.setTimeout(() => {
      setTourTarget(timelineRef.current);
      setTourOpen(true);
    }, 450);
    return () => window.clearTimeout(timer);
  }, []);

  function finishTour() {
    markTourSeen();
    setTourOpen(false);
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  function sendText(value: string) {
    const intent = matchIntent(value);
    void speak(intent, value);
  }

  function sendIntent(id: IntentId) {
    if (tourOpen && (id === "omron" || id === "rakuten" || id === "talentos")) {
      finishTour();
    }
    const intent = matchById(id);
    void speak(intent, timelineAsk[id] ?? intent.prompt);
  }

  async function speak(intent: Intent | null, youText: string) {
    const gen = ++generation.current;
    setBusy(true);
    setActive(intent?.timeline ?? null);

    setMessages((current) => [
      ...current,
      {
        id: uid(),
        role: "you",
        text: youText,
        displayed: youText,
        time: stamp(),
        chips: [],
        done: true,
      },
    ]);

    await sleep(250);
    if (gen !== generation.current) return;

    const reply = intent ? replies[intent.id] : fallbackReply;
    const chips = intent ? intent.followUps : defaultChips;
    const id = uid();

    setMessages((current) => [
      ...current,
      {
        id,
        role: "avez",
        text: reply,
        displayed: "",
        time: stamp(),
        chips,
        done: false,
      },
    ]);

    let shown = "";
    for (const part of chunks(reply)) {
      await sleep(18);
      if (gen !== generation.current) return;
      shown += part;
      const snapshot = shown;
      setMessages((current) =>
        current.map((message) =>
          message.id === id ? { ...message, displayed: snapshot } : message,
        ),
      );
    }

    setMessages((current) =>
      current.map((message) =>
        message.id === id
          ? { ...message, displayed: reply, done: true }
          : message,
      ),
    );
    setBusy(false);
  }

  return (
    <div className="h-full overflow-hidden bg-paper text-ink">
      <div className="mx-auto flex h-full max-w-[1180px] flex-col px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] md:px-14 md:py-8">
        <div className="shrink-0">
          <TopMark theme={theme} onToggleTheme={toggleTheme} />
        </div>
        <div className="mt-5 flex min-h-0 flex-1 flex-col gap-5 overflow-hidden lg:mt-8 lg:grid lg:grid-cols-[minmax(240px,0.85fr)_minmax(0,1.55fr)] lg:gap-20">
          <div
            className={`sleek-scroll max-h-[42dvh] min-h-0 shrink-0 overflow-y-auto lg:max-h-none lg:overflow-y-auto ${
              leftScroll.scrolling ? "is-scrolling" : ""
            }`}
            onScroll={leftScroll.onScroll}
          >
            <IntroColumn
              active={active}
              onSelect={sendIntent}
              onAskMe={() => askRef.current?.focus()}
              timelineRef={timelineRef}
              tourActive={tourOpen}
            />
          </div>
          <section className="flex min-h-0 flex-1 flex-col">
            <ChatThread messages={messages} onChip={sendIntent} />
            <div className="mt-4 shrink-0 lg:mt-6">
              <AskInput disabled={busy} onSend={sendText} inputRef={askRef} />
            </div>
          </section>
        </div>
      </div>
      <TimelineTour
        open={tourOpen}
        target={tourTarget}
        onSkip={finishTour}
      />
    </div>
  );
}
