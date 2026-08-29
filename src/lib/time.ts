export function stamp(): string {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
