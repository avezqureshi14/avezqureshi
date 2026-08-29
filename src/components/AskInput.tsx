import { useState, type FormEvent, type KeyboardEvent, type Ref } from "react";

type AskInputProps = {
  disabled?: boolean;
  onSend: (value: string) => void;
  inputRef?: Ref<HTMLInputElement>;
};

export function AskInput({ disabled, onSend, inputRef }: AskInputProps) {
  const [value, setValue] = useState("");

  function submit() {
    const next = value.trim();
    if (!next || disabled) return;
    onSend(next);
    setValue("");
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    submit();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <form onSubmit={onSubmit} className="composer-bar relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        disabled={disabled}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Ask something..."
        className="w-full rounded-[26px] border-0 bg-composer py-3.5 pl-5 pr-14 text-[16px] text-ink outline-none placeholder:text-ink-faint disabled:opacity-60 lg:text-[15px]"
        autoComplete="off"
        autoFocus={
          typeof window !== "undefined" &&
          window.matchMedia("(min-width: 1024px)").matches
        }
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send"
        className={`absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full transition-colors duration-150 lg:h-8 lg:w-8 ${
          value.trim() && !disabled
            ? "bg-send text-send-fg"
            : "text-ink-faint"
        }`}
      >
        <ArrowIcon />
      </button>
    </form>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M4 9h10M10 5l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
