import { useRef, useEffect } from "react";

export function useInfiniteScroll(speed = 0.5) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPos = useRef(0);
  const isPaused = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const original = Array.from(el.children) as HTMLElement[];
    original.forEach((card) => el.appendChild(card.cloneNode(true)));

    rafRef.current = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const halfWidth = el.scrollWidth / 2;

        const step = () => {
          if (!isPaused.current) {
            scrollPos.current += speed;
            if (scrollPos.current >= halfWidth) scrollPos.current = 0;
            el.scrollLeft = scrollPos.current;
          }
          rafRef.current = requestAnimationFrame(step);
        };

        rafRef.current = requestAnimationFrame(step);
      });
    });

    const pause = () => { isPaused.current = true; };
    const resume = () => { isPaused.current = false; };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      original.forEach(() => el.lastChild && el.removeChild(el.lastChild));
    };
  }, [speed]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const halfWidth = el.scrollWidth / 2;

    isPaused.current = true;
    scrollPos.current += dir === "right" ? 325 : -325;
    if (scrollPos.current < 0) scrollPos.current = halfWidth + scrollPos.current;
    if (scrollPos.current >= halfWidth) scrollPos.current -= halfWidth;

    el.scrollLeft = scrollPos.current;
    setTimeout(() => { isPaused.current = false; }, 600);
  };

  return { scrollRef, scroll };
}