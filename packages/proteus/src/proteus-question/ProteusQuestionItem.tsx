import { Box, Group, Input, Text } from "@optiaxiom/react";
import { Checkbox } from "@optiaxiom/react";
import { VisuallyHidden } from "@optiaxiom/react/unstable";
import { useRef } from "react";

import * as styles from "./ProteusQuestionItem.css";
export type ProteusQuestionItemProps = {
  /**
   * Addons to place after the question text.
   */
  addonAfter?: ReactNode;
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
      <Group>
        <Text flex="1" fontWeight="500">
          {question}
        </Text>
        {addonAfter}
      </Group>

      <Group {...styles.choiceGroup()}>
        {options.map((option, index) => {
          const checked =
            type === "single_select"
              ? value?.[0] === option
              : Array.isArray(value) && value.includes(option);

          return (
            <Box asChild {...styles.choice()} key={option}>
              <label>
                <VisuallyHidden>
                  <Box asChild {...styles.input()}>
                    <input
                      checked={checked}
                      name={
                        type === "single_select" ? "question-item" : undefined
                      }
                      onChange={() => {
                        if (type === "single_select") {
                          onValueChange([option]);
                        } else {
                          const current = Array.isArray(value) ? value : [];
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
          );
        })}

        <Box asChild {...styles.choice()} key="other">
          <label>
            <VisuallyHidden>
              <Box asChild {...styles.input()}>
                <input
                  checked={otherChecked}
                  name={type === "single_select" ? "question-item" : undefined}
                  onChange={() => {
                    if (type === "single_select") {
                      onValueChange([""]);
                    } else {
                      const current = Array.isArray(value) ? value : [];
                      onValueChange(
                        otherChecked
                          ? current.filter((v) => options.includes(v))
                          : [...current, ""],
                      );
                    }
                    otherInputRef.current?.focus();
                  }}
                  type={type === "single_select" ? "radio" : "checkbox"}
                  value="other"
                />
              </Box>
            </VisuallyHidden>

            <Group gap="12">
              <Box {...styles.addon()}>
                {type === "single_select" ? (
                  options.length + 1
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
                <Input
                  onChange={(event) => {
                    const text = event.target.value;
                    if (type === "single_select") {
                      onValueChange([text]);
                    } else {
                      const current = Array.isArray(value) ? value : [];
                      onValueChange([
                        ...current.filter((v) => options.includes(v)),
                        text,
                      ]);
                    }
                  }}
                  onClick={(event) => event.stopPropagation()}
                  placeholder="Other"
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
