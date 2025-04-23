"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Context } from "radix-ui/internal";

import type { Button } from "./Button";

export const [ButtonProvider, useButtonContext] = Context.createContext<
  Pick<ComponentPropsWithoutRef<typeof Button>, "size">
>("@optiaxiom/react/Button", { size: undefined });
