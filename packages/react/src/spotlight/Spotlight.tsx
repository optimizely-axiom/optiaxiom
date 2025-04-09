import { type ComponentPropsWithoutRef } from "react";

import type { ExcludeProps } from "../utils";

import { Combobox } from "../combobox";

type SpotlightProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof Combobox>,
  "defaultInputVisible" | "size"
>;

export function Spotlight({ children, ...props }: SpotlightProps) {
  return (
    <Combobox defaultInputVisible size="lg" {...props}>
      {children}
    </Combobox>
  );
}

Spotlight.displayName = "@optiaxiom/react/Spotlight";
