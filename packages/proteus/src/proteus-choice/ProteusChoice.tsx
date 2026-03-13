import type { RadioProps } from "@optiaxiom/react";
import type { ReactNode } from "react";

import { Box, extractBoxProps, Group, Text } from "@optiaxiom/react";
import { VisuallyHidden } from "@optiaxiom/react/unstable";

import type { ProteusEventHandler } from "../proteus-document/schemas";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useResolvedProteusProps } from "../proteus-document/useResolvedProteusProps";
import * as styles from "./ProteusChoiceGroup.css";
import { useProteusChoiceGroupContext } from "./ProteusChoiceGroupContext";

export type ProteusChoiceProps = Omit<RadioProps, "onClick"> & {
  /**
   * Content to display before the choice text (e.g., numbered badge)
   */
  addonBefore?: ReactNode;
  /**
   * Action triggered when choice is selected
   */
  onClick?: ProteusEventHandler;
};

export function ProteusChoice({
  addonBefore,
  children,
  className,
  description,
  onClick,
  value,
  ...props
}: ProteusChoiceProps) {
  const { boxProps, restProps } = extractBoxProps(props);
  const groupContext = useProteusChoiceGroupContext(
    "@optiaxiom/proteus/ProteusChoice",
  );
  const { onEvent } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusChoice",
  );
  const resolvedOnClick = useResolvedProteusProps(
    (onClick ?? {}) as Record<string, unknown>,
  ) as ProteusEventHandler;

  return (
    <Box asChild {...styles.choice({}, className)} {...boxProps}>
      <label>
        <VisuallyHidden>
          <Box asChild {...styles.input()}>
            <input
              checked={groupContext?.value === value}
              name={groupContext?.name}
              onChange={(event) => {
                groupContext?.onChange?.(event);
                if (onClick) {
                  void onEvent(resolvedOnClick);
                }
              }}
              type="radio"
              value={value}
              {...restProps}
            />
          </Box>
        </VisuallyHidden>

        <Group gap="12">
          {addonBefore && <Box {...styles.addon()}>{addonBefore}</Box>}

          <Group flex="1" flexDirection="column" gap="2">
            {children && <Text fontWeight="500">{children}</Text>}
            {description && (
              <Text color="fg.secondary" fontSize="sm">
                {description}
              </Text>
            )}
          </Group>
        </Group>
      </label>
    </Box>
  );
}

ProteusChoice.displayName = "@optiaxiom/proteus/ProteusChoice";
