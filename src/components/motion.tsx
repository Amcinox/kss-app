"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(listener: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

/** Tracks the OS "reduce motion" setting, and follows it if it changes. */
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/** Fires once, the first time the returned ref's element scrolls into view. */
function useInView<T extends HTMLElement>(onEnter: () => void) {
  const ref = useRef<T>(null);
  const latest = useRef(onEnter);

  useEffect(() => {
    latest.current = onEnter;
  }, [onEnter]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        latest.current();
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* -------------------------------------------------------------------------- */
/* Reveal                                                                      */
/* -------------------------------------------------------------------------- */

export type RevealVariant =
  | "lift"
  | "swing"
  | "swingR"
  | "depth"
  | "flip"
  | "roll";

/** [entry transform, transform-origin] for each reveal style. */
const REVEAL_VARIANTS: Record<RevealVariant, [string, string]> = {
  lift: [
    "perspective(1200px) rotateX(16deg) translate3d(0,52px,-110px) scale(.96)",
    "50% 100%",
  ],
  swing: [
    "perspective(1200px) rotateY(-22deg) translate3d(-90px,18px,-140px)",
    "0% 50%",
  ],
  swingR: [
    "perspective(1200px) rotateY(22deg) translate3d(90px,18px,-140px)",
    "100% 50%",
  ],
  depth: ["perspective(1200px) translate3d(0,0,-420px) scale(.86)", "50% 50%"],
  flip: ["perspective(1200px) rotateX(-72deg) translate3d(0,30px,0)", "50% 0%"],
  roll: [
    "perspective(1200px) rotateZ(-6deg) translate3d(-60px,40px,-60px) scale(.94)",
    "0% 100%",
  ],
};

/**
 * Animates its children in as they scroll into view. `index` staggers siblings
 * within a grid; it repeats every 6 items so long lists stay snappy.
 */
export function Reveal({
  variant = "lift",
  index = 0,
  className,
  children,
}: {
  variant?: RevealVariant;
  index?: number;
  className?: string;
  children: ReactNode;
}) {
  const [entered, setEntered] = useState(false);
  const reduced = useReducedMotion();
  const onEnter = useCallback(() => setEntered(true), []);
  const ref = useInView<HTMLDivElement>(onEnter);

  const [transform, origin] = REVEAL_VARIANTS[variant];
  const delay = `${((index % 6) * 0.075).toFixed(3)}s`;
  const shown = entered || reduced;

  const style: CSSProperties = shown
    ? { opacity: 1, transform: "none", filter: "none" }
    : {
        opacity: 0,
        transform,
        filter: variant === "depth" ? "blur(10px)" : undefined,
      };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transformOrigin: origin,
        transition: [
          `opacity .9s cubic-bezier(.16,.84,.24,1) ${delay}`,
          `filter .9s ease ${delay}`,
          `transform 1.1s cubic-bezier(.16,.84,.24,1) ${delay}`,
        ].join(", "),
      }}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CountUp                                                                     */
/* -------------------------------------------------------------------------- */

/** Only plain "digits + optional suffix" values animate, e.g. `8` or `60+`. */
const COUNTABLE = /^(\d+)(\D*)$/;

/**
 * Counts up to `value` when it scrolls into view. The final value is what gets
 * rendered, so it is always present in the markup and for reduced-motion users.
 */
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const parsed = useMemo(() => {
    const match = COUNTABLE.exec(value);
    return match
      ? { end: Number.parseInt(match[1], 10), suffix: match[2] }
      : null;
  }, [value]);

  const animates = parsed !== null && !reduced;

  const start = useCallback(() => {
    const node = ref.current;
    if (!node || !parsed || reduced) return;

    const t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / 900);
      node.textContent = Math.round(parsed.end * (1 - (1 - k) ** 3)) + parsed.suffix;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [parsed, reduced]);

  const ref = useInView<HTMLDivElement>(start);

  // Zero it before the first paint so the count is never seen finishing first.
  useIsomorphicLayoutEffect(() => {
    if (!animates || !parsed || !ref.current) return;
    ref.current.textContent = `0${parsed.suffix}`;
  }, [animates, parsed, ref]);

  return (
    <div ref={ref} className={className}>
      {value}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Tilt                                                                        */
/* -------------------------------------------------------------------------- */

/** Card that leans towards the pointer. No-op on touch and coarse pointers. */
export function Tilt({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const dx = (event.clientX - rect.left) / rect.width - 0.5;
      const dy = (event.clientY - rect.top) / rect.height - 0.5;
      element.style.transform = `perspective(900px) rotateX(${(-dy * 7).toFixed(2)}deg) rotateY(${(dx * 9).toFixed(2)}deg) translateY(-5px)`;
      element.style.boxShadow = "0 26px 60px rgba(0,0,0,.45)";
    };
    const onLeave = () => {
      element.style.transform = "none";
      element.style.boxShadow = "none";
    };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transition:
          "transform .35s cubic-bezier(.2,.7,.2,1), border-color .3s ease, box-shadow .35s ease",
      }}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Parallax                                                                    */
/* -------------------------------------------------------------------------- */

type ParallaxEntry = { element: HTMLElement; speed: number };

const parallaxLayers = new Set<ParallaxEntry>();
let parallaxFrame = 0;

function runParallax() {
  const viewport = window.innerHeight;
  for (const { element, speed } of parallaxLayers) {
    const rect = element.getBoundingClientRect();
    const k = (rect.top + rect.height / 2 - viewport / 2) / viewport; // -1 .. 1
    const shift = (-k * 26 * speed).toFixed(1);
    const scale = (1 + Math.max(0, 0.05 - Math.abs(k) * 0.05) * speed).toFixed(
      3,
    );
    element.style.transform = `translate3d(0,${shift}px,0) scale(${scale})`;
  }
  parallaxFrame = requestAnimationFrame(runParallax);
}

/**
 * Drifts an element against the scroll. All layers share one rAF loop, which
 * only runs while at least one is mounted.
 */
export function Parallax({
  speed = 1,
  className,
  children,
}: {
  speed?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;

    const entry: ParallaxEntry = { element, speed };
    parallaxLayers.add(entry);
    if (!parallaxFrame) parallaxFrame = requestAnimationFrame(runParallax);

    return () => {
      parallaxLayers.delete(entry);
      element.style.transform = "";
      if (parallaxLayers.size === 0) {
        cancelAnimationFrame(parallaxFrame);
        parallaxFrame = 0;
      }
    };
  }, [speed, reduced]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
