import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { IconAngleRight } from "../icons/IconAngleRight";
import { extractSprinkles } from "../sprinkles";
import { fallbackSpan } from "../utils";
import * as styles from "./DropdownSubTrigger.css";

type SubTriggerProps = BoxProps<
  typeof RadixMenu.SubTrigger,
  {
    endDecorator?: ReactNode;
    startDecorator?: ReactNode;
  } & styles.SubTriggerVariants
>;

export const DropdownSubTrigger = forwardRef<HTMLDivElement, SubTriggerProps>(
  (
    {
      asChild,
      children,
      colorScheme = "neutral",
      endDecorator,
      startDecorator,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex
        asChild
        ref={ref}
        {...styles.subTrigger({ colorScheme })}
        {...sprinkleProps}
      >
        <RadixMenu.SubTrigger {...restProps}>
          {asChild ? (
            children
          ) : (
            <>
              {startDecorator && (
                <Box asChild h="16" w="auto">
                  {fallbackSpan(startDecorator)}
                </Box>
              )}

              <Box flex="1">{children}</Box>

              {endDecorator && (
                <Box asChild ml="xs">
                  {fallbackSpan(endDecorator)}
                </Box>
              )}

              {!endDecorator && <IconAngleRight />}
            </>
          )}
        </RadixMenu.SubTrigger>
      </Flex>
    );
  },
);

DropdownSubTrigger.displayName = "@optiaxiom/react/DropdownSubTrigger";
