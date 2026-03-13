import type { ReactNode } from "react";

import { Box, extractBoxProps, Group, Text } from "@optiaxiom/react";
import { VisuallyHidden } from "@optiaxiom/react/unstable";

import type { ProteusEventHandler } from "./schemas";

import * as styles from "./ProteusChoiceGroup.css";
import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { useRadioGroupContext } from "./RadioGroupContext";
import { useResolvedProteusProps } from "./useResolvedProteusProps";

export function ProteusChoice({
  addonBefore,
  children,
  className,
  description,
  onClick,
  value,
  ...props
}: {
  addonBefore?: ReactNode;
  children?: ReactNode;
  className?: string;
  description?: ReactNode;
  onClick?: ProteusEventHandler;
  value?: string;
}) {
  const { boxProps, restProps } = extractBoxProps(props);
  const groupContext = useRadioGroupContext("@optiaxiom/react/ProteusChoice");
  const { onEvent } = useProteusDocumentContext(
    "@optiaxiom/react/ProteusChoice",
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

ProteusChoice.displayName = "@optiaxiom/react/ProteusChoice";
