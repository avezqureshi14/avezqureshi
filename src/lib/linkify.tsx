import type { ReactNode } from "react";
import { profile } from "../data/profile";

const hrefByLabel: Record<string, string> = Object.fromEntries(
  profile.links.map((link) => [link.label, link.href]),
);

hrefByLabel["avezqureshi4785@gmail.com"] = "mailto:avezqureshi4785@gmail.com";
hrefByLabel.avezqureshi14 = "https://github.com/avezqureshi14";

const tokenPattern =
  /(LinkedIn|GitHub|LeetCode|avezqureshi4785@gmail\.com|avezqureshi14)/g;

export function linkify(text: string): ReactNode[] {
  const parts = text.split(tokenPattern);

  return parts.map((part, index) => {
    const href = hrefByLabel[part];
    if (!href) return part;

    const external = !href.startsWith("mailto:");
    return (
      <a
        key={`${part}-${index}`}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="underline decoration-ink-faint underline-offset-3 transition-colors duration-150 hover:decoration-ink"
      >
        {part}
      </a>
    );
  });
}
