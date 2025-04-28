import { type ComponentPropsWithoutRef } from "react";

import type { ExcludeProps } from "../utils";

import { Menu } from "../menu";

type SpotlightProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof Menu>,
  "initialInputVisible" | "size"
>;

export function Spotlight({ children, ...props }: SpotlightProps) {
  return (
    <Menu initialInputVisible size="lg" {...props}>
      {children}
    </Menu>
  );
}

Spotlight.displayName = "@optiaxiom/react/Spotlight";
