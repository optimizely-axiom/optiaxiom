import { IconArrowRight, IconPen } from "@optiaxiom/icons";
import { Box, Button, Checkbox, Group, Text } from "@optiaxiom/react";
import { InlineInput } from "@optiaxiom/react/unstable";
import * as RovingFocus from "@radix-ui/react-roving-focus";
import { useCallback, useEffect, useRef, useState } from "react";

import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";
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
  const { onEvent, onTrack } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusQuestion",
  );
  const [answers, setAnswers] = useState<Array<null | string[]>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const value = answers[currentIndex];
  const valid =
    Array.isArray(value) && value.length > 0 && value.every(Boolean);

  const onDismiss = useCallback(() => {
    onTrack?.("ask_question_card_dismissed", {
      question_index_at_dismiss: String(currentIndex),
    });
    void onEvent({
      message: "[User declined to answer the question]",
    });
  }, [currentIndex, onEvent, onTrack]);

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
    const item =
      questionRef.current?.querySelector<HTMLElement>("[data-selected]") ??
      questionRef.current?.querySelector<HTMLElement>("[tabindex]");
    item?.focus();
  }, [currentIndex]);

  const otherInputRef = useRef<HTMLInputElement>(null);
  const otherItemRef = useRef<HTMLDivElement>(null);

  if (currentIndex >= questions.length) {
    return null;
  }

  const { options, question, type } = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const otherValue = value?.find((v) => !options.includes(v));
  const otherChecked = otherValue !== undefined;

  const onComplete = () => {
    const answeredCount = answers.filter(
      (a) => Array.isArray(a) && a.length > 0,
    ).length;
    onTrack?.("ask_user_question_submitted", {
      answered_count: String(answeredCount),
      skipped_count: String(questions.length - answeredCount),
      total_questions: String(questions.length),
    });
    return onEvent({
      message: answers
        .map(
          (value, index) =>
            `Q: ${questions[index].question}\nA: ${value || "[Not specified]"}`,
        )
        .join("\n\n"),
    });
  };

  const onValueChange = (value: null | string[]) => {
    answers[currentIndex] = value;
    setAnswers([...answers]);
  };

  const onSkip = () => {
    onTrack?.("ask_user_question_skipped", {
      question_index: String(currentIndex),
    });
    answers[currentIndex] = null;
    setAnswers([...answers]);
    if (isLast) {
      void onComplete();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };
  const onSubmit = () => {
    const currentValue = answers[currentIndex];
    if (currentValue) {
      const indices = currentValue.map((v) => options.indexOf(v));
      onTrack?.("ask_user_question_option_selected", {
        question_index: String(currentIndex),
        option_index: String(indices[0]),
        is_custom_text: String(currentValue.some((v) => !options.includes(v))),
      });
    }
    if (isLast) {
      void onComplete();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  return (
    <Group
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          if (type === "multi_select" && valid) {
            onValueChange(null);
          } else {
            onSkip();
          }
        }
        if (
          (event.key === "ArrowLeft" || event.key === "ArrowRight") &&
          !(event.target instanceof HTMLInputElement) &&
          !(event.target as HTMLElement).isContentEditable
        ) {
          event.preventDefault();
          if (event.key === "ArrowLeft" && currentIndex > 0) {
            onTrack?.("Ask User Question Back", {
              from_index: currentIndex,
              to_index: currentIndex - 1,
            });
            setCurrentIndex((i) => i - 1);
          } else if (event.key === "ArrowRight" && !isLast) {
            setCurrentIndex((i) => i + 1);
          }
        }
      }}
      tabIndex={-1}
      {...styles.question()}
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
                    onTrack?.("ask_user_question_back", {
                      from_index: String(currentIndex),
                      to_index: String(currentIndex - 1),
                    });
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

        <RovingFocus.Root asChild loop orientation="vertical" ref={questionRef}>
          <Group
            role={type === "single_select" ? "radiogroup" : "listbox"}
            {...styles.choiceGroup()}
          >
            {options.map((option, index) => {
              const checked =
                type === "single_select"
                  ? value?.[0] === option
                  : value?.includes(option);

              const disabled =
                type === "single_select" && otherChecked && !!otherValue;

              return (
                <RovingFocus.Item asChild key={option}>
                  <Box
                    aria-checked={
                      type === "single_select" ? checked : undefined
                    }
                    data-disabled={disabled ? "" : undefined}
                    data-selected={
                      checked && type === "single_select" ? "" : undefined
                    }
                    onClick={() => {
                      if (type === "single_select") {
                        onValueChange([option]);
                        onSubmit();
                      } else {
                        const current = value ?? [];
                        onValueChange(
                          checked
                            ? current.filter((v) => v !== option)
                            : [...current, option],
                        );
                      }
                    }}
                    onFocus={() => {
                      if (type === "single_select") {
                        onValueChange([option]);
                      }
                    }}
                    onKeyDown={(event) => {
                      if (type === "single_select" && event.key === "Enter") {
                        event.preventDefault();
                        onSubmit();
                      } else if (
                        type === "multi_select" &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        const current = value ?? [];
                        onValueChange(
                          checked
                            ? current.filter((v) => v !== option)
                            : [...current, option],
                        );
                      }
                    }}
                    role={type === "single_select" ? "radio" : "option"}
                    tabIndex={0}
                    {...styles.choice({ cursor: "pointer" })}
                  >
                    <Group gap="12">
                      {type === "single_select" ? (
                        <Box {...styles.addon()}>{index + 1}</Box>
                      ) : (
                        <Checkbox
                          checked={checked}
                          hidden
                          pointerEvents="none"
                          tabIndex={-1}
                        />
                      )}
                      <Group flex="1" flexDirection="column" gap="2">
                        <Text>{option}</Text>
                      </Group>
                      {type === "single_select" && checked && (
                        <Box
                          asChild
                          color="fg.tertiary"
                          h="24"
                          ml="auto"
                          w="24"
                        >
                          <IconArrowRight />
                        </Box>
                      )}
                    </Group>
                  </Box>
                </RovingFocus.Item>
              );
            })}

            <Box
              aria-label="Something else"
              data-selected={otherChecked ? "" : undefined}
              key="other"
              role="group"
              {...styles.choice({ cursor: "text" })}
            >
              <Group gap="12">
                {type === "single_select" ? (
                  <Box {...styles.addon({ cursor: "pointer" })}>
                    <IconPen />
                  </Box>
                ) : (
                  <Checkbox
                    checked={otherChecked}
                    hidden
                    pointerEvents="none"
                    tabIndex={-1}
                  />
                )}
                <RovingFocus.Item asChild>
                  <Group
                    flex="1"
                    flexDirection="column"
                    gap="2"
                    onFocus={() => {
                      if (type === "single_select" && !otherValue) {
                        onValueChange([""]);
                      }
                      otherInputRef.current?.focus();
                    }}
                    ref={otherItemRef}
                  >
                    <InlineInput
                      label="Something else"
                      onKeyDown={(event) => {
                        if (
                          event.key === "ArrowUp" ||
                          event.key === "ArrowDown"
                        ) {
                          event.preventDefault();
                          otherItemRef.current?.focus();
                          otherItemRef.current?.dispatchEvent(
                            new KeyboardEvent("keydown", {
                              bubbles: true,
                              key: event.key,
                            }),
                          );
                        } else if (event.key === "Enter") {
                          onSubmit();
                        }
                      }}
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
                </RovingFocus.Item>
                {type === "single_select" && (
                  <Button
                    appearance={otherValue ? "primary-opal" : "default"}
                    aria-label={otherValue && (isLast ? "Submit" : "Next")}
                    icon={otherValue && <IconArrowRight />}
                    ml="auto"
                    onClick={(event) => {
                      event.preventDefault();
                      if (otherValue) {
                        onSubmit();
                      } else {
                        onSkip();
                      }
                    }}
                  >
                    {!otherValue && "Skip"}
                  </Button>
                )}
              </Group>
            </Box>
          </Group>
        </RovingFocus.Root>
      </Group>

      {type === "multi_select" && (
        <Group
          borderColor="border.secondary"
          borderT="1"
          gap="8"
          pt="16"
          px="16"
        >
          <Text>{value?.length || 0} selected</Text>
          <Button
            ml="auto"
            onClick={(event) => {
              event.preventDefault();
              onSkip();
            }}
          >
            Skip
          </Button>
          <Button
            appearance={valid ? "primary-opal" : "default"}
            aria-label={isLast ? "Submit" : "Next"}
            disabled={!valid}
            icon={<IconArrowRight />}
            onClick={(event) => {
              event.preventDefault();
              onSubmit();
            }}
          />
        </Group>
      )}
    </Group>
  );
}

ProteusQuestion.displayName = "@optiaxiom/proteus/ProteusQuestion";
