import { Box, Group, Separator, Text } from "@optiaxiom/react";
import { Checkbox } from "@optiaxiom/react";
import { InlineInput, VisuallyHidden } from "@optiaxiom/react/unstable";
import { Fragment, type ReactNode, type RefObject, useRef } from "react";

import { IconPencil } from "../icons/IconPencil";
import * as styles from "./ProteusQuestionItem.css";
export type ProteusQuestionItemProps = {
  /**
   * Addons to place after the question text.
   */
  addonAfter?: ReactNode;
  /**
   * A ref pointing to the choice/options container element.
   */
  choiceRef?: RefObject<HTMLDivElement>;
  /**
   * Handler that is called when the selected value changes.
   */
  onValueChange: (value: null | string[]) => void;
  /**
   * Choices presented to the user.
   */
  options: string[];
  /**
   * The question being presented.
   */
  question: string;
  /**
   * Whether the user can select multiple or single answers.
   */
  type: "multi_select" | "single_select";
  /**
   * The selected value in controlled mode.
   */
  value: null | string[];
};

export function ProteusQuestionItem({
  addonAfter,
  choiceRef,
  onValueChange,
  options,
  question,
  type,
  value,
}: ProteusQuestionItemProps) {
  const otherInputRef = useRef<HTMLInputElement>(null);

  const otherValue = value?.find((v) => !options.includes(v));
  const otherChecked = otherValue !== undefined;

  return (
    <Group flexDirection="column" gap="16">
      <Group pl="16">
        <Text flex="1" fontWeight="500">
          {question}
        </Text>
        {addonAfter}
      </Group>

      <Group ref={choiceRef} {...styles.choiceGroup()}>
        {options.map((option, index) => {
          const checked =
            type === "single_select"
              ? value?.[0] === option
              : value?.includes(option);

          const disabled =
            type === "single_select" && otherChecked && !!otherValue;

          return (
            <Fragment key={option}>
              {index > 0 && <Separator />}
              <Box asChild {...styles.choice()}>
                <label>
                  <VisuallyHidden>
                    <Box asChild {...styles.input()}>
                      <input
                        checked={checked}
                        disabled={disabled}
                        name={
                          type === "single_select"
                            ? "question-item"
                            : undefined
                        }
                        onChange={() => {
                          if (type === "single_select") {
                            onValueChange([option]);
                          } else {
                            const current = value ?? [];
                            onValueChange(
                              checked
                                ? current.filter((v) => v !== option)
                                : [...current, option],
                            );
                          }
                        }}
                        type={type === "single_select" ? "radio" : "checkbox"}
                        value={option}
                      />
                    </Box>
                  </VisuallyHidden>

                  <Group gap="12">
                    <Box {...styles.addon()}>
                      {type === "single_select" ? (
                        index + 1
                      ) : (
                        <Checkbox
                          checked={checked}
                          hidden
                          pointerEvents="none"
                          tabIndex={-1}
                        />
                      )}
                    </Box>
                    <Group flex="1" flexDirection="column" gap="2">
                      <Text>{option}</Text>
                    </Group>
                  </Group>
                </label>
              </Box>
            </Fragment>
          );
        })}

        <Separator />
        <Box asChild {...styles.choice({ cursor: "text" })} key="other">
          <label>
            <VisuallyHidden>
              <Box asChild {...styles.input()}>
                <input
                  checked={otherChecked}
                  name={type === "single_select" ? "question-item" : undefined}
                  onChange={() => {
                    if (type === "single_select") {
                      if (!otherValue) {
                        onValueChange([""]);
                      }
                    }
                    otherInputRef.current?.focus();
                  }}
                  type="checkbox"
                  value="other"
                />
              </Box>
            </VisuallyHidden>

            <Group gap="12">
              <Box {...styles.addon({ cursor: "pointer" })}>
                {type === "single_select" ? (
                  <IconPencil />
                ) : (
                  <Checkbox
                    checked={otherChecked}
                    hidden
                    pointerEvents="none"
                    tabIndex={-1}
                  />
                )}
              </Box>
              <Group flex="1" flexDirection="column" gap="2">
                <InlineInput
                  label="Something else"
                  onValueChange={(text) => {
                    if (type === "single_select") {
                      onValueChange([text]);
                    } else {
                      const current = value ?? [];
                      onValueChange([
                        ...current.filter((v) => options.includes(v)),
                        ...(text ? [text] : []),
                      ]);
                    }
                  }}
                  ref={otherInputRef}
                  value={otherValue ?? ""}
                />
              </Group>
            </Group>
          </label>
        </Box>
      </Group>
    </Group>
  );
}

ProteusQuestionItem.displayName = "@optiaxiom/proteus/ProteusQuestionItem";
