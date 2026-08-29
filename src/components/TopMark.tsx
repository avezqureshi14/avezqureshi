import { profile } from "../data/profile";
import { ThemeToggle } from "./ThemeToggle";

type TopMarkProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

export function TopMark({ theme, onToggleTheme }: TopMarkProps) {
  return (
    <div className="flex items-center justify-end gap-2.5 sm:gap-3">
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink-muted sm:text-[11px] sm:tracking-[0.14em]">
        {profile.mark}
      </p>
      <a
        href={profile.resume}
        target="_blank"
        rel="noreferrer"
        className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink-muted transition-colors duration-150 hover:text-ink sm:text-[11px] sm:tracking-[0.14em]"
      >
        Resume
      </a>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </div>
  );
}
