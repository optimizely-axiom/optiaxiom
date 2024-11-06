import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Separator } from "../separator";

type ComboboxSeparatorProps = BoxProps<typeof Separator>;

export const ComboboxSeparator = forwardRef<
  HTMLLIElement,
  ComboboxSeparatorProps
>((props, ref) => (
  <Box asChild>
    <li ref={ref}>
      <Separator asChild bg="border.secondary" mx="-4" my="2" {...props} />
    </li>
  </Box>
));

ComboboxSeparator.displayName = "@optiaxiom/react/ComboboxSeparator";
