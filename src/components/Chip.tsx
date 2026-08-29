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
      className="min-h-9 rounded-full bg-chip px-3.5 py-2 text-[13px] font-medium tracking-[-0.01em] text-chip-fg transition-colors duration-150 hover:bg-line lg:min-h-0 lg:py-1.5"
    >
      {getIntent(id).prompt}
    </button>
  );
}
