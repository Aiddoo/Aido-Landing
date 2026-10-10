"use client";
import { noop } from "es-toolkit";
import { useSyncExternalStore } from "react";

const subscribe = () => noop;
// Keep stateful controls disabled until event handlers have hydrated.
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
