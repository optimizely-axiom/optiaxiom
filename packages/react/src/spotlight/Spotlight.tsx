import { type ComponentPropsWithoutRef } from "react";

import type { ExcludeProps } from "../utils";

import { Menu } from "../menu";

export type SpotlightProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof Menu>,
  "inputVisible" | "size"
>;

export function Spotlight({ children, ...props }: SpotlightProps) {
  return (
    <Menu inputVisible="always" size="lg" {...props}>
      {children}
    </Menu>
  );
}

Spotlight.displayName = "@optiaxiom/react/Spotlight";
