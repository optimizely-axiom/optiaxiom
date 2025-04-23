"use client";

import { createContext } from "@radix-ui/react-context";
import { type RefObject } from "react";

export const [TransitionGroupProvider, useTransitionGroupContext] =
  createContext<null | {
    onMount: (ref: RefObject<HTMLElement>) => void;
    onUnmount: (ref: RefObject<HTMLElement>) => void;
    open: boolean | undefined;
    presence: boolean | undefined;
  }>("@optiaxiom/react/TransitionGroup", null);
