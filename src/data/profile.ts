export type TimelineKind = "client" | "internal";

export type TimelineItem = {
  id: "omron" | "rakuten" | "talentos";
  year: string;
  title: string;
  kind: TimelineKind;
  dates: string;
};

export const profile = {
  fullName: "Mohammad Avez Qureshi",
  mark: "Avez Qureshi",
  intro: "Hi! I am Avez.",
  role: "Software engineer, Webknot. Bengaluru.",
  knowMore: "Know more About me",
  resume: "/resume.html",
  links: [
    { label: "Resume", href: "/resume.html" },
    { label: "GitHub", href: "https://github.com/avezqureshi14" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/avezqureshi14/" },
    { label: "LeetCode", href: "https://leetcode.com/avezqureshi14/" },
    { label: "Email", href: "mailto:avezqureshi4785@gmail.com" },
  ],
  timeline: [
    {
      id: "omron",
      year: "2024",
      title: "Omron Healthcare",
      kind: "client",
      dates: "Aug 2024 – Apr 2025",
    },
    {
      id: "rakuten",
      year: "2025",
      title: "Rakuten India",
      kind: "client",
      dates: "May 2025 – July 2026",
    },
    {
      id: "talentos",
      year: "2026",
      title: "TalentOS",
      kind: "internal",
      dates: "July 2026 – Present",
    },
  ] satisfies TimelineItem[],
} as const;
