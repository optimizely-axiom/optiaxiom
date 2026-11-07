"use client";

import { type RefObject, useEffect, useState } from "react";

import { useAnimationFrame } from "../hooks";
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
  const requestFrame = useAnimationFrame();
  useEffect(() => {
    if (!open) {
      return;
    }

    return requestFrame(() => setMounted(true));
  }, [open, requestFrame]);

  return open && !mounted ? "starting" : !open ? "ending" : undefined;
};
