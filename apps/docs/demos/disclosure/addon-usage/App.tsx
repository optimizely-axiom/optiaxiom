"use client";

import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
  toaster,
} from "@optiaxiom/react";
import { Pill } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Disclosure maxW="sm" w="full">
      <DisclosureTrigger
        addonAfter={
          <Pill onClick={() => toaster.create("Clicked pill")}>3</Pill>
        }
      >
        Categories
      </DisclosureTrigger>
      <DisclosureContent>
        Aenean neque dui, lobortis et sem quis, mattis varius nisl. Nulla turpis
        sapien, venenatis eu pharetra at, ullamcorper sed nibh.
      </DisclosureContent>
    </Disclosure>
  );
}
