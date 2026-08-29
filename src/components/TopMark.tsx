import { profile } from "../data/profile";
import { ThemeToggle } from "./ThemeToggle";

type TopMarkProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

export function TopMark({ theme, onToggleTheme }: TopMarkProps) {
  return (
    <div className="flex items-center justify-end gap-3">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
        {profile.mark}
      </p>
      <a
        href={profile.resume}
        target="_blank"
        rel="noreferrer"
        className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted transition-colors duration-150 hover:text-ink"
      >
        Resume
      </a>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </div>
  );
}
