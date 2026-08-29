export type DayPart = "Morning" | "Afternoon" | "Evening" | "Night";

export function dayGreeting(): DayPart {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  if (hour < 22) return "Evening";
  return "Night";
}
