import type { ComponentPropsWithRef } from "react";

import { defineConfig } from "@/components/demo";

import type { App } from "./App";

export default defineConfig<ComponentPropsWithRef<typeof App>>({
  controls: [
    {
      defaultValue: 2,
      max: 4,
      min: 1,
      prop: "lineClamp",
      type: "number",
    },
  ],
});
