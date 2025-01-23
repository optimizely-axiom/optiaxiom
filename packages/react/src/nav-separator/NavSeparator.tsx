import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Separator } from "../separator";

type NavSeparatorProps = BoxProps<typeof Separator>;

export const NavSeparator = forwardRef<HTMLDivElement, NavSeparatorProps>(
  (props, ref) => <Separator flex="none" mx="8" my="4" ref={ref} {...props} />,
);

NavSeparator.displayName = "@optiaxiom/react/NavSeparator";
