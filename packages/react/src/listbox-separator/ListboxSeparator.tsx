import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Separator } from "../separator";

type ListboxSeparatorProps = BoxProps<typeof Separator>;

export const ListboxSeparator = forwardRef<
  HTMLDivElement,
  ListboxSeparatorProps
>((props, ref) => (
  <Separator
    bg="border.secondary"
    flex="none"
    mx="8"
    my="4"
    ref={ref}
    {...props}
  />
));

ListboxSeparator.displayName = "@optiaxiom/react/ListboxSeparator";
