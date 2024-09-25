import * as RadixSelect from "@radix-ui/react-select";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Separator } from "../separator";

type SelectSeparatorProps = BoxProps<typeof RadixSelect.Separator>;

export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(
  (props, ref) => (
    <Separator asChild bg="border.secondary" mx="-4" my="2" {...props}>
      <RadixSelect.Separator ref={ref} />
    </Separator>
  ),
);

SelectSeparator.displayName = "@optiaxiom/react/SelectSeparator";
