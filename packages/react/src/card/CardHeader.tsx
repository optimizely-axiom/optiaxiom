import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { Heading } from "../heading";
import { useCardContext } from "./CardContext";
import * as styles from "./CardHeader.css";

export type CardHeaderProps = BoxProps<
  "div",
  {
    /**
     * Display content inside the header after `children`.
     */
    addonAfter?: ReactNode;
    /**
     * Display content inside the header before `children`.
     */
    addonBefore?: ReactNode;
    /**
     * Add secondary text after the primary title.
     */
    description?: ReactNode;
  }
>;

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  (
    { addonAfter, addonBefore, children, className, description, ...props },
    ref,
  ) => {
    const { descriptionId, labelId } = useCardContext(
      "@optiaxiom/react/CardHeader",
    );

    return (
      <Flex ref={ref} {...styles.header({}, className)} {...props}>
        <Box {...styles.content()}>
          <Heading fontSize="md" fontWeight="500" id={labelId} level="2">
            {children}
          </Heading>

          {description && (
            <Box color="fg.tertiary" fontSize="sm" id={descriptionId}>
              {description}
            </Box>
          )}
        </Box>

        {addonBefore && (
          <Flex {...styles.addon({ slot: "before" })}>{addonBefore}</Flex>
        )}

        {addonAfter && (
          <Flex {...styles.addon({ slot: "after" })}>{addonAfter}</Flex>
        )}
      </Flex>
    );
  },
);

CardHeader.displayName = "@optiaxiom/react/CardHeader";
