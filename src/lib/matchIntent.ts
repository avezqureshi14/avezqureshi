import { intents, type Intent, type IntentId } from "../data/intents";

export function normalize(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

export function matchIntent(input: string): Intent | null {
  const query = ` ${normalize(input)} `;
  if (!query.trim()) return null;

  if (
    query.trim() === "go" ||
    query.includes(" golang") ||
    query.includes(" why go")
  ) {
    return intents.find((item) => item.id === "whygo") ?? null;
  }

  for (const intent of intents) {
    for (const alias of intent.aliases) {
      if (query.includes(` ${normalize(alias)} `) || query.includes(normalize(alias))) {
        return intent;
      }
    }
  }

  return null;
}

export function matchById(id: IntentId): Intent {
  const found = intents.find((item) => item.id === id);
  if (!found) {
    throw new Error(`Unknown intent: ${id}`);
  }
  return found;
}
