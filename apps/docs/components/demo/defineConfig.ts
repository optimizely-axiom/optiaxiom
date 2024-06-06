import type { ComponentPropsWithRef } from "react";

import type { DemoControls } from "./DemoControls";

export const defineConfig = <Props>(config: {
  controls: ComponentPropsWithRef<typeof DemoControls<Props>>["controls"];
}) => config;
