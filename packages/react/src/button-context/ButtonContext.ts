"use client";

import type { ComponentPropsWithoutRef } from "react";

import { createContext } from "@radix-ui/react-context";

import type { Button } from "../button";

export const [ButtonContextProvider, useButtonContext] = createContext<
  Pick<ComponentPropsWithoutRef<typeof Button>, "size">
>("Button", { size: undefined });
