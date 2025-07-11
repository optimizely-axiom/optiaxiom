"use client";

import { type RefObject, useEffect, useState } from "react";

import { useTransitionGroupContext } from "./TransitionGroupContext";

export const useTransitionStatus = (ref: RefObject<HTMLElement>) => {
  const { open, register } = useTransitionGroupContext(
    "useTransitionStatus",
  ) ?? {
    open: true,
  };

  useEffect(() => {
    return register?.(ref);
  }, [register, ref]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setMounted(true));
    }
  }, [open]);

  return open && !mounted ? "starting" : !open ? "ending" : undefined;
};
