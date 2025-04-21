"use client";

import type { ComponentPropsWithoutRef } from "react";

import { createContext } from "@radix-ui/react-context";

import type { Button } from "./Button";

export const [ButtonProvider, useButtonContext] = createContext<
  Pick<ComponentPropsWithoutRef<typeof Button>, "size">
>("@optiaxiom/react/Button", { size: undefined });
