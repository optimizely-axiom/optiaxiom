import { forwardRef, type ReactNode } from "react";

import type { TextProps } from "../text";

import { Box } from "../box";
import { Group } from "../group";
import { Heading } from "../heading";
import { useCardContext } from "./CardContext";
import * as styles from "./CardHeader.css";

export type CardHeaderProps = TextProps<
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
 * @group Card
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  (
    {
      addonAfter,
      addonBefore,
      children,
      className,
      description,
      lineClamp,
      truncate,
      ...props
    },
    ref,
  ) => {
    const { descriptionId, labelId } = useCardContext(
      "@optiaxiom/react/CardHeader",
    );

    return (
      <Group ref={ref} {...styles.header({}, className)} {...props}>
        <Box {...styles.content()}>
          <Heading
            fontSize="md"
            fontWeight="500"
            id={labelId}
            level="2"
            lineClamp={lineClamp}
            truncate={truncate}
          >
            {children}
          </Heading>

          {description && (
            <Box color="fg.tertiary" fontSize="sm" id={descriptionId}>
              {description}
            </Box>
          )}
        </Box>
        {addonBefore && (
          <Group {...styles.addon({ slot: "before" })}>{addonBefore}</Group>
        )}
        {addonAfter && (
          <Group {...styles.addon({ slot: "after" })}>{addonAfter}</Group>
        )}
      </Group>
    );
  },
);

CardHeader.displayName = "@optiaxiom/react/CardHeader";
