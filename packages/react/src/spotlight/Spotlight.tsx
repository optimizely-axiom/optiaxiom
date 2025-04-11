import { type ComponentPropsWithoutRef } from "react";

import type { ExcludeProps } from "../utils";

import { Menu } from "../menu";

type SpotlightProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof Menu>,
  "defaultInputVisible" | "size"
>;

export function Spotlight({ children, ...props }: SpotlightProps) {
  return (
    <Menu defaultInputVisible size="lg" {...props}>
      {children}
    </Menu>
  );
}

Spotlight.displayName = "@optiaxiom/react/Spotlight";
