import { type ComponentPropsWithoutRef } from "react";

import type { ExcludeProps } from "../utils";

import { Menu } from "../menu";

export type SpotlightProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof Menu>,
  "inputVisible" | "size"
>;

/**
 * Command menu for search and application navigation, such as a global
 * search or command palette.
 *
 * Takes the same `options` as `Menu` (groups, `execute`, `href`, `visible`)
 * and always shows the search input. It opens with Cmd/Ctrl+K, and
 * `SpotlightTrigger` renders a search button that opens it too.
 *
 * @category navigation
 * @since 0.5.0
 * @experimental
 */
export function Spotlight({ children, ...props }: SpotlightProps) {
  return (
    <Menu inputVisible="always" size="lg" {...props}>
      {children}
    </Menu>
  );
}

Spotlight.displayName = "@optiaxiom/react/Spotlight";
