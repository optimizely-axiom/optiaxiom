"use client";

import { createContext } from "@radix-ui/react-context";
import { type RefObject } from "react";

export const [TransitionGroupProvider, useTransitionGroupContext] =
  createContext<null | {
    open: boolean | undefined;
    presence: boolean | undefined;
    register: (ref: RefObject<HTMLElement>) => void;
  }>("@optiaxiom/react/TransitionGroup", null);
