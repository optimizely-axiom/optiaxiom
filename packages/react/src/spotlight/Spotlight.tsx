import { type ComponentPropsWithoutRef } from "react";

import type { ExcludeProps, ExtendProps } from "../utils";

import { Menu } from "../menu";
import { SpotlightProvider } from "./SpotlightContext";

export type SpotlightProps = ExcludeProps<
  ExtendProps<
    ComponentPropsWithoutRef<typeof Menu>,
    {
      /**
       * Turn off the Cmd/Ctrl+K hotkey, such as when another Spotlight on the
       * page owns it.
       */
      disableHotkey?: boolean;
    }
  >,
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
export function Spotlight({
  children,
  disableHotkey,
  ...props
}: SpotlightProps) {
  return (
    <Menu inputVisible="always" size="lg" {...props}>
      <SpotlightProvider disableHotkey={disableHotkey}>
        {children}
      </SpotlightProvider>
    </Menu>
  );
}

Spotlight.displayName = "@optiaxiom/react/Spotlight";
