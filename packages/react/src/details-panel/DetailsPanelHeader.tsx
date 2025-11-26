import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { ButtonProvider } from "../button/ButtonContext";
import { Flex } from "../flex";
import { Heading } from "../heading";
import { Text } from "../text";
import { fallbackSpan } from "../utils";
import { useDetailsPanelContext } from "./DetailsPanelContext";
import * as styles from "./DetailsPanelHeader.css";

export type DetailsPanelHeaderProps = BoxProps<
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

/**
 * @group DetailsPanel
 */
export const DetailsPanelHeader = forwardRef<
  HTMLHeadingElement,
  DetailsPanelHeaderProps
>(
  (
    { addonAfter, addonBefore, children, className, description, ...props },
    ref,
  ) => {
    const { descriptionId, labelId } = useDetailsPanelContext(
      "@optiaxiom/react/DetailsPanelHeader",
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

DetailsPanelHeader.displayName = "@optiaxiom/react/DetailsPanelHeader";
