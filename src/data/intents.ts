export type IntentId =
  | "who"
  | "work"
  | "experience"
  | "omron"
  | "rakuten"
  | "talentos"
  | "pipeline"
  | "architecture"
  | "improved"
  | "whygo"
  | "stack"
  | "contact";

export type Intent = {
  id: IntentId;
  aliases: string[];
  prompt: string;
  timeline: IntentId | null;
  followUps: IntentId[];
};

export const defaultChips: IntentId[] = ["who", "work", "experience"];

export const timelineAsk: Partial<Record<IntentId, string>> = {
  omron: "What did you build at Omron?",
  rakuten: "What did you build at Rakuten?",
  talentos: "What did you build at TalentOS?",
};

export const intents: Intent[] = [
  {
    id: "rakuten",
    aliases: ["rakuten", "sixthsense", "sixth sense", "observability", "rum"],
    prompt: "Tell me about SixthSense",
    timeline: "rakuten",
    followUps: ["architecture", "talentos", "omron"],
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
    prompt: "Tell me about TalentOS",
    timeline: "talentos",
    followUps: ["stack", "who", "contact"],
  },
  {
    id: "omron",
    aliases: ["omron", "factory", "healthcare", "uptime"],
    prompt: "Tell me about Omron",
    timeline: "omron",
    followUps: ["rakuten", "talentos", "stack"],
  },
  {
    id: "architecture",
    aliases: ["architecture", "how does it work", "pipeline diagram"],
    prompt: "Show me the architecture",
    timeline: "rakuten",
    followUps: ["stack", "talentos", "omron"],
  },
  {
    id: "pipeline",
    aliases: [
      "pipeline",
      "why kafka",
      "kafka",
      "ingestion",
      "clickhouse",
      "keda",
    ],
    prompt: "Why Kafka?",
    timeline: "rakuten",
    followUps: ["architecture", "rakuten", "stack"],
  },
  {
    id: "whygo",
    aliases: ["why go", "golang", "why golang"],
    prompt: "Why Go?",
    timeline: "rakuten",
    followUps: ["architecture", "stack", "rakuten"],
  },
  {
    id: "improved",
    aliases: ["improve", "improved", "what did you improve", "result"],
    prompt: "What did you improve?",
    timeline: "omron",
    followUps: ["omron", "rakuten", "work"],
  },
  {
    id: "work",
    aliases: [
      "recent work",
      "my work",
      "what do you build",
      "projects",
      "selected work",
    ],
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
    aliases: ["stack", "tech", "languages", "tools", "engineering"],
    prompt: "My engineering",
    timeline: null,
    followUps: ["rakuten", "talentos", "omron"],
  },
  {
    id: "who",
    aliases: [
      "who are you",
      "who is avez",
      "about",
      "yourself",
      "my story",
      "know more",
      "about me",
    ],
    prompt: "Who are you?",
    timeline: null,
    followUps: ["work", "experience", "contact"],
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
