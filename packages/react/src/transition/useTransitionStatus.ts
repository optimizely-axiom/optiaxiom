"use client";

import { type RefObject, useEffect, useState } from "react";

import { useTransitionGroupContext } from "./TransitionGroupContext";

export const useTransitionStatus = (ref: RefObject<HTMLElement>) => {
  const { onMount, onUnmount, open } = useTransitionGroupContext(
    "useTransitionStatus",
  ) ?? {
    open: true,
  };

  useEffect(() => {
    onMount?.(ref);
    return () => onUnmount?.(ref);
  }, [onMount, onUnmount, ref]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setMounted(true));
    }
  }, [open]);

  return open && !mounted
    ? "starting"
    : !open && mounted
      ? "ending"
      : undefined;
};
