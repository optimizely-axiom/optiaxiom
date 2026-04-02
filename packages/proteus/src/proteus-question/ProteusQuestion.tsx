import { Box, Button, Checkbox, Group } from "@optiaxiom/react";
import { Text } from "@optiaxiom/react";
import { InlineInput, VisuallyHidden } from "@optiaxiom/react/unstable";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";
import { IconArrowUp } from "../icons/IconArrowUp";
import { IconPencil } from "../icons/IconPencil";
import { IconX } from "../icons/IconX";
import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import * as styles from "./ProteusQuestion.css";

export type ProteusQuestionProps = {
  /**
   * Array of the questions data.
   */
  questions: QuestionData[];
};

type QuestionData = {
  options: string[];
  question: string;
  type: "multi_select" | "single_select";
};

export function ProteusQuestion({ questions }: ProteusQuestionProps) {
  const { onEvent } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusQuestion",
  );
  const [answers, setAnswers] = useState<Array<null | string[]>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const value = answers[currentIndex];
  const valid =
    Array.isArray(value) && value.length > 0 && value.every(Boolean);

  const onDismiss = useCallback(() => {
    void onEvent({
      message: "[User declined to answer the question]",
    });
  }, [onEvent]);

  const questionRef = useRef<HTMLDivElement>(null);
  const lastIndexRef = useRef(currentIndex);
  useEffect(() => {
    if (lastIndexRef.current !== currentIndex) {
      questionRef.current?.animate(
        [
          {
            opacity: 0,
            translate: currentIndex > lastIndexRef.current ? "8px" : "-8px",
          },
          {
            opacity: 1,
            translate: "0px",
          },
        ],
        {
          duration: 150,
        },
      );
      lastIndexRef.current = currentIndex;
    }
  }, [currentIndex]);

  const otherInputRef = useRef<HTMLInputElement>(null);

  if (currentIndex >= questions.length) {
    return null;
  }

  const { options, question, type } = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const otherValue = value?.find((v) => !options.includes(v));
  const otherChecked = otherValue !== undefined;

  const onComplete = () =>
    onEvent({
      message: answers
        .map(
          (value, index) =>
            `Q: ${questions[index].question}\nA: ${value || "[Not specified]"}`,
        )
        .join("\n\n"),
    });

  const onValueChange = (value: null | string[]) => {
    answers[currentIndex] = value;
    setAnswers([...answers]);
  };

  return (
    <Group
      flexDirection="column"
      gap="16"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onDismiss();
        }
      }}
      p="4"
    >
      <Group flexDirection="column" gap="16">
        <Group pl="16">
          <Text flex="1" fontWeight="500">
            {question}
          </Text>
          <Group gap="6">
            {questions.length > 1 && (
              <>
                <Button
                  appearance="subtle"
                  aria-label="Previous"
                  disabled={currentIndex === 0}
                  icon={<IconAngleLeft />}
                  onClick={(event) => {
                    event.preventDefault();
                    setCurrentIndex((i) => i - 1);
                  }}
                  size="sm"
                />
                <Text color="fg.tertiary" fontSize="sm">
                  {currentIndex + 1} of {questions.length}
                </Text>
                <Button
                  appearance="subtle"
                  aria-label="Next"
                  disabled={isLast}
                  icon={<IconAngleRight />}
                  onClick={(event) => {
                    event.preventDefault();
                    setCurrentIndex((i) => i + 1);
                  }}
                  size="sm"
                />
              </>
            )}
            <Button
              appearance="subtle"
              aria-label="Dismiss"
              icon={<IconX />}
              onClick={(event) => {
                event.preventDefault();
                onDismiss();
              }}
              size="sm"
            />
          </Group>
        </Group>

        <Group ref={questionRef} {...styles.choiceGroup()}>
          {options.map((option, index) => {
            const checked =
              type === "single_select"
                ? value?.[0] === option
                : value?.includes(option);

            const disabled =
              type === "single_select" && otherChecked && !!otherValue;

            return (
              <Fragment key={option}>
                <Box asChild {...styles.choice({ cursor: "pointer" })}>
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

          <Box asChild {...styles.choice({ cursor: "text" })} key="other">
            <label>
              <VisuallyHidden>
                <Box asChild {...styles.input()}>
                  <input
                    checked={otherChecked}
                    name={
                      type === "single_select" ? "question-item" : undefined
                    }
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

      <Group gap="8" justifyContent="end">
        <Button
          onClick={(event) => {
            event.preventDefault();
            answers[currentIndex] = null;
            setAnswers([...answers]);
            if (isLast) {
              void onComplete();
            } else {
              setCurrentIndex((i) => i + 1);
            }
          }}
        >
          Skip
        </Button>
        <Button
          appearance="primary"
          aria-label={isLast ? "Submit" : "Next"}
          disabled={!valid}
          icon={<IconArrowUp />}
          onClick={(event) => {
            event.preventDefault();
            if (isLast) {
              void onComplete();
            } else {
              setCurrentIndex((i) => i + 1);
            }
          }}
        />
      </Group>
    </Group>
  );
}

ProteusQuestion.displayName = "@optiaxiom/proteus/ProteusQuestion";
