"use client";

import { type RefObject, useContext, useEffect, useState } from "react";

import { TransitionGroupContext } from "../transition-group-context";

export const useTransitionStatus = (ref: RefObject<HTMLElement>) => {
  const { onMount, onUnmount, open } = useContext(TransitionGroupContext) ?? {
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
