import { getIntent, type IntentId } from "../data/intents";

type ChipProps = {
  id: IntentId;
  onSelect: (id: IntentId) => void;
};

export function Chip({ id, onSelect }: ChipProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className="rounded-full bg-chip px-3.5 py-1.5 text-[13px] font-medium tracking-[-0.01em] text-chip-fg transition-colors duration-150 hover:bg-line"
    >
      {getIntent(id).prompt}
    </button>
  );
}
