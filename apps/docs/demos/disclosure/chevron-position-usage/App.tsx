"use client";

import type { ComponentPropsWithRef } from "react";

import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from "@optiaxiom/react";

export function App({
  chevronPosition,
}: Pick<ComponentPropsWithRef<typeof DisclosureTrigger>, "chevronPosition">) {
  return (
    <Disclosure maxW="sm" w="full">
      <DisclosureTrigger chevronPosition={chevronPosition}>
        Disclosure label
      </DisclosureTrigger>
      <DisclosureContent>
        Aenean neque dui, lobortis et sem quis, mattis varius nisl. Nulla turpis
        sapien, venenatis eu pharetra at, ullamcorper sed nibh.
      </DisclosureContent>
    </Disclosure>
  );
}
