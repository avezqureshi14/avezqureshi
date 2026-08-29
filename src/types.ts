import type { IntentId } from "./data/intents";

export type Role = "you" | "avez";

export type ChatMessage = {
  id: string;
  role: Role;
  text: string;
  displayed: string;
  time: string;
  chips: IntentId[];
  done: boolean;
};
