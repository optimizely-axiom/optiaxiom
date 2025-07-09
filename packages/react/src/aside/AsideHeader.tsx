import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { ButtonProvider } from "../button/ButtonContext";
import { Flex } from "../flex";
import { Heading } from "../heading";
import { Text } from "../text";
import { fallbackSpan } from "../utils";
import { useAsideContext } from "./AsideContext";
import * as styles from "./AsideHeader.css";

export type AsideHeaderProps = BoxProps<
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

export const AsideHeader = forwardRef<HTMLHeadingElement, AsideHeaderProps>(
  (
    { addonAfter, addonBefore, children, className, description, ...props },
    ref,
  ) => {
    const { descriptionId, labelId } = useAsideContext(
      "@optiaxiom/react/AsideHeader",
    );

    return (
      <ButtonProvider size="sm">
        <Box ref={ref} {...styles.header({}, className)} {...props}>
          {addonBefore && (
            <Flex flexDirection="row" gap="8">
              {addonBefore}
            </Flex>
          )}

          <Heading
            flex="1"
            fontSize="lg"
            fontWeight="600"
            id={labelId}
            level="2"
          >
            {children}
          </Heading>

          {addonAfter && (
            <Flex flexDirection="row" gap="8">
              {addonAfter}
            </Flex>
          )}

          {description && (
            <Text
              asChild
              color="fg.secondary"
              fontSize="sm"
              id={descriptionId}
              w="full"
            >
              {fallbackSpan(description)}
            </Text>
          )}
        </Box>
      </ButtonProvider>
    );
  },
);

AsideHeader.displayName = "@optiaxiom/react/AsideHeader";
