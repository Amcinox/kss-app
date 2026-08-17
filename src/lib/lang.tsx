"use client";

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { COPY, type Copy, type Lang } from "@/lib/copy";

const STORAGE_KEY = "kss-lang";

/**
 * The chosen language lives in localStorage rather than React state so it
 * survives reloads and stays in step across tabs. `useSyncExternalStore` reads
 * it without a hydration mismatch: the server renders `defaultLang`, and the
 * stored value is picked up on the client's first commit.
 */
const listeners = new Set<() => void>();
let snapshot: Lang | null = null;

function subscribe(listener: () => void) {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    snapshot = null;
    listener();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function readLang(fallback: Lang): Lang {
  if (snapshot === null) {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    snapshot = stored === "ja" || stored === "en" ? stored : fallback;
  }
  return snapshot;
}

function writeLang(next: Lang) {
  snapshot = next;
  window.localStorage.setItem(STORAGE_KEY, next);
  for (const listener of listeners) listener();
}

type LangValue = {
  lang: Lang;
  t: Copy;
  toggle: () => void;
};

const LangContext = createContext<LangValue | null>(null);

export function LangProvider({
  children,
  defaultLang = "ja",
}: {
  children: ReactNode;
  defaultLang?: Lang;
}) {
  const getSnapshot = useCallback(() => readLang(defaultLang), [defaultLang]);
  const getServerSnapshot = useCallback(() => defaultLang, [defaultLang]);
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(
    () => writeLang(readLang(defaultLang) === "ja" ? "en" : "ja"),
    [defaultLang],
  );

  return (
    <LangContext value={{ lang, t: COPY[lang], toggle }}>{children}</LangContext>
  );
}

export function useLang(): LangValue {
  const value = use(LangContext);
  if (!value) throw new Error("useLang must be used inside <LangProvider>");
  return value;
}
