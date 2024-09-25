import * as RadixSelect from "@radix-ui/react-select";
import { forwardRef, useId } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { IconCheck } from "../icons/IconCheck";
import * as styles from "./SelectItem.css";

type SelectItemProps = BoxProps<typeof RadixSelect.Item, styles.ItemVariants>;

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, colorScheme = "neutral", value, ...props }, ref) => {
    const labelId = useId();

    return (
      <Flex
        alignItems="center"
        asChild
        flexDirection="row"
        fontSize="md"
        gap="xs"
        justifyContent="space-between"
        p="xs"
      >
        <RadixSelect.Item
          aria-labelledby={labelId}
          ref={ref}
          value={value}
          {...styles.item({ colorScheme }, className)}
          {...props}
        >
          <RadixSelect.ItemText>{children}</RadixSelect.ItemText>

          <RadixSelect.ItemIndicator asChild>
            <IconCheck />
          </RadixSelect.ItemIndicator>
        </RadixSelect.Item>
      </Flex>
    );
  },
);

SelectItem.displayName = "@optiaxiom/react/SelectItem";
