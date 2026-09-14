"use client";

import { useCallback, useEffect, useState } from "react";
import type { LabState } from "@/types/lab";

const STORAGE_KEY = "scarlet-lab-state:v2";
const CHANGE_EVENT = "scarlet-lab-state-change";

export const emptyLabState: LabState = {
  schemaVersion: 2,
  runs: [],
  challengeProgress: [],
  endingProgress: Array.from({ length: 7 }, () => false),
  toolUsage: {},
};

function normalizeState(value: unknown): LabState {
  if (!value || typeof value !== "object") return emptyLabState;
  const candidate = value as Partial<LabState>;
  return {
    schemaVersion: 2,
    runs: Array.isArray(candidate.runs) ? candidate.runs : [],
    challengeProgress: Array.isArray(candidate.challengeProgress) ? candidate.challengeProgress : [],
    endingProgress: Array.isArray(candidate.endingProgress) && candidate.endingProgress.length === 7 ? candidate.endingProgress.map(Boolean) : emptyLabState.endingProgress,
    toolUsage: candidate.toolUsage && typeof candidate.toolUsage === "object" ? candidate.toolUsage : {},
  };
}

function readState() {
  if (typeof window === "undefined") return emptyLabState;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try { return normalizeState(JSON.parse(saved)); }
    catch { window.localStorage.removeItem(STORAGE_KEY); }
  }

  const migrated = { ...emptyLabState };
  const oldEnding = window.localStorage.getItem("scarlet-ending-route");
  if (oldEnding) {
    try { migrated.endingProgress = normalizeState({ endingProgress: JSON.parse(oldEnding) }).endingProgress; }
    catch { /* Ignore malformed development data. */ }
  }
  return migrated;
}

function persistState(state: LabState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent<LabState>(CHANGE_EVENT, { detail: state }));
}

export function useLabState() {
  const [state, setState] = useState<LabState>(emptyLabState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setState(readState());
      setLoaded(true);
    });
    const onChange = (event: Event) => setState((event as CustomEvent<LabState>).detail ?? readState());
    const onStorage = () => setState(readState());
    window.addEventListener(CHANGE_EVENT, onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(CHANGE_EVENT, onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const update = useCallback((updater: (current: LabState) => LabState) => {
    // localStorage is the shared source of truth for every useLabState instance.
    // Keep persistence and event dispatch outside React's state updater: an
    // updater may run during render, and notifying sibling subscribers there
    // causes React's "update a component while rendering another" error.
    const next = normalizeState(updater(readState()));
    persistState(next);
    setState(next);
  }, []);

  const recordToolUse = useCallback((tool: string) => {
    update((current) => ({ ...current, toolUsage: { ...current.toolUsage, [tool]: (current.toolUsage[tool] ?? 0) + 1 } }));
  }, [update]);

  return { state, loaded, update, recordToolUse };
}
