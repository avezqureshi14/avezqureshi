export type IntentId =
  | "who"
  | "work"
  | "experience"
  | "omron"
  | "rakuten"
  | "talentos"
  | "pipeline"
  | "stack"
  | "contact";

export type Intent = {
  id: IntentId;
  aliases: string[];
  prompt: string;
  timeline: IntentId | null;
  followUps: IntentId[];
};

export const defaultChips: IntentId[] = ["work", "experience", "talentos"];

export const intents: Intent[] = [
  {
    id: "rakuten",
    aliases: [
      "rakuten",
      "sixthsense",
      "sixth sense",
      "observability",
      "rum",
    ],
    prompt: "Rakuten",
    timeline: "rakuten",
    followUps: ["pipeline", "stack", "omron"],
  },
  {
    id: "talentos",
    aliases: [
      "talentos",
      "talent os",
      "talenos",
      "hiring",
      "ats",
      "langgraph",
      "copilot",
    ],
    prompt: "TalentOS",
    timeline: "talentos",
    followUps: ["stack", "experience", "contact"],
  },
  {
    id: "omron",
    aliases: ["omron", "factory", "healthcare", "uptime"],
    prompt: "Omron",
    timeline: "omron",
    followUps: ["rakuten", "stack", "experience"],
  },
  {
    id: "pipeline",
    aliases: [
      "pipeline",
      "ingestion",
      "kafka",
      "golang",
      " go ",
      "clickhouse",
      "keda",
    ],
    prompt: "The Go pipeline",
    timeline: "rakuten",
    followUps: ["rakuten", "stack", "work"],
  },
  {
    id: "work",
    aliases: ["recent work", "what do you build", "projects", "selected work"],
    prompt: "Recent work",
    timeline: null,
    followUps: ["rakuten", "talentos", "omron"],
  },
  {
    id: "experience",
    aliases: ["experience", "where have you worked", "career", "timeline"],
    prompt: "Experience",
    timeline: null,
    followUps: ["omron", "rakuten", "talentos"],
  },
  {
    id: "stack",
    aliases: ["stack", "tech", "languages", "tools"],
    prompt: "Tech stack",
    timeline: null,
    followUps: ["pipeline", "talentos", "contact"],
  },
  {
    id: "who",
    aliases: [
      "who are you",
      "who is avez",
      "about",
      "yourself",
      "know more",
      "about me",
    ],
    prompt: "Know more About me",
    timeline: null,
    followUps: ["experience", "work", "contact"],
  },
  {
    id: "contact",
    aliases: ["contact", "email", "reach", "hello", "linkedin", "github"],
    prompt: "How to reach you",
    timeline: null,
    followUps: ["who", "work", "experience"],
  },
];

export function getIntent(id: IntentId): Intent {
  const found = intents.find((item) => item.id === id);
  if (!found) {
    throw new Error(`Unknown intent: ${id}`);
  }
  return found;
}
