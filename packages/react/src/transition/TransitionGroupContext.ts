"use client";

import { Context } from "radix-ui/internal";
import { type RefObject } from "react";

export const [TransitionGroupProvider, useTransitionGroupContext] =
  Context.createContext<null | {
    onMount: (ref: RefObject<HTMLElement>) => void;
    onUnmount: (ref: RefObject<HTMLElement>) => void;
    open: boolean | undefined;
    presence: boolean | undefined;
  }>("@optiaxiom/react/TransitionGroup", null);
