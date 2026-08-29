import { useEffect, useRef, useState } from "react";

export function useScrollbarReveal(ms = 700) {
  const timer = useRef(0);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function onScroll() {
    setScrolling(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setScrolling(false), ms);
  }

  return { scrolling, onScroll };
}
