import { IconArrowDown, IconArrowRight, IconPen } from "@optiaxiom/icons";
import {
  Box,
  Button,
  Checkbox,
  DisclosureContent,
  DisclosureTrigger,
  Group,
  Text,
} from "@optiaxiom/react";
import { InlineInput } from "@optiaxiom/react/unstable";
import * as RovingFocus from "@radix-ui/react-roving-focus";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";
import { IconX } from "../icons/IconX";
import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import * as styles from "./ProteusQuestion.css";

export type ProteusQuestionProps = {
  /**
   * Name of the interaction to fire when the user finishes or cancels.
   *
   * When set, submit and cancel send a structured `{ questions, answers }`
   * payload via the `interaction` event (under this name) so the host can hand
   * it back to the calling tool. When omitted, a human-readable transcript is
   * sent via the `message` event instead (the default behaviour).
   */
  interaction?: string;
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

export function ProteusQuestion({
  interaction,
  questions,
}: ProteusQuestionProps) {
  const { collapsible, onEvent, onTrack } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusQuestion",
  );
  const [answers, setAnswers] = useState<Array<null | string[]>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const value = answers[currentIndex];
  const valid =
    Array.isArray(value) && value.length > 0 && value.every(Boolean);

  const goBack = useCallback(() => {
    onTrack?.("Ask User Question Back", {
      fromIndex: String(currentIndex),
      toIndex: String(currentIndex - 1),
    });
    setCurrentIndex((i) => i - 1);
  }, [currentIndex, onTrack]);

  const onDismiss = useCallback(() => {
    onTrack?.("Ask User Question Dismissed", {
      questionIndex: String(currentIndex),
    });
    if (interaction) {
      void onEvent({
        interaction,
        params: {
          cancelled: "[User declined to answer the question]",
          questions,
        },
      });
    } else {
      void onEvent({
        message: "[User declined to answer the question]",
      });
    }
  }, [currentIndex, interaction, onEvent, onTrack, questions]);

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

  const scroller = useCanScroll();
  useEffect(() => {
    scroller.update();
  }, [currentIndex, scroller]);

  const otherInputRef = useRef<HTMLInputElement>(null);
  const otherItemRef = useRef<HTMLDivElement>(null);

  if (!Array.isArray(questions) || currentIndex >= questions.length) {
    return null;
  }

  const { options, question, type } = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const otherValue = value?.find((v) => !options.includes(v));
  const otherChecked = otherValue !== undefined;

  const onComplete = () => {
    const answeredCount = answers.filter(
      (answer) => Array.isArray(answer) && answer.length > 0,
    ).length;
    onTrack?.("Ask User Question Submitted", {
      answeredCount: String(answeredCount),
      skippedCount: String(questions.length - answeredCount),
      totalQuestions: String(questions.length),
    });
    if (interaction) {
      return onEvent({
        interaction,
        params: {
          answers: Object.fromEntries(
            questions.map(({ question }, index) => [
              question,
              (answers[index] ?? []).join(", "),
            ]),
          ),
          questions,
        },
      });
    }
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
    onTrack?.("Ask User Question Skipped", {
      questionIndex: String(currentIndex),
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
      const firstIndex = options.indexOf(currentValue[0]);
      onTrack?.("Ask User Question Option Selected", {
        isCustomText: String(currentValue.some((v) => !options.includes(v))),
        optionIndex: String(firstIndex),
        questionIndex: String(currentIndex),
      });
    }
    if (isLast) {
      void onComplete();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const controls = (
    <Group flex="none" gap="6">
      {questions.length > 1 && (
        <>
          <Button
            appearance="subtle"
            aria-label="Previous"
            disabled={currentIndex === 0}
            icon={<IconAngleLeft />}
            onClick={(event) => {
              event.preventDefault();
              goBack();
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
  );

  // Single select pins "Something else" as a footer below the scrolling
  // options; multi select keeps it as the last option.
  const footer = !!collapsible && type === "single_select";
  const other = (
    <Box
      aria-label="Something else"
      data-selected={otherChecked ? "" : undefined}
      role="group"
      {...styles.choice({ cursor: "text", footer })}
    >
      <Group gap={footer ? "4" : "12"}>
        {type === "single_select" ? (
          footer ? (
            <Box
              asChild
              color="fg.tertiary"
              cursor="pointer"
              flex="none"
              onClick={() => otherInputRef.current?.focus()}
              size="sm"
            >
              <IconPen />
            </Box>
          ) : (
            <Box
              onClick={() => otherInputRef.current?.focus()}
              {...styles.addon({ cursor: "pointer" })}
            >
              <IconPen />
            </Box>
          )
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
                if (event.key === "ArrowUp" || event.key === "ArrowDown") {
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
            appearance={otherValue ? "primary" : "default"}
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
  );

  const list = (
    <Box
      // Focus may land inside a row (the "Something else" input), so scroll
      // the whole row into view; otherwise its padding stays clipped.
      onFocus={(event) => {
        if (!collapsible) return;
        let row = event.target as HTMLElement;
        while (row.parentElement && row.parentElement !== event.currentTarget) {
          row = row.parentElement;
        }
        row.scrollIntoView({ block: "nearest" });
      }}
      ref={collapsible ? scroller.ref : undefined}
      {...styles.options({ capped: !!collapsible })}
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
              aria-checked={type === "single_select" ? checked : undefined}
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
              {...styles.choice({
                cursor: "pointer",
                last: footer && index === options.length - 1,
              })}
            >
              <Group gap={collapsible ? "16" : "12"}>
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
                  <Box asChild color="fg.tertiary" h="24" ml="auto" w="24">
                    <IconArrowRight />
                  </Box>
                )}
              </Group>
            </Box>
          </RovingFocus.Item>
        );
      })}
      {!footer && other}
      {collapsible && (
        <Box aria-hidden {...styles.jump()}>
          <Button
            icon={<IconArrowDown />}
            onClick={(event) => {
              event.preventDefault();
              scroller.nodeRef.current?.scrollTo({
                behavior: "smooth",
                top: scroller.nodeRef.current.scrollHeight,
              });
            }}
            rounded="full"
            shadow="sm"
            tabIndex={-1}
          />
        </Box>
      )}
    </Box>
  );

  const content = (
    <>
      <RovingFocus.Root asChild loop orientation="vertical" ref={questionRef}>
        <Group
          role={type === "single_select" ? "radiogroup" : "listbox"}
          {...styles.choiceGroup()}
        >
          {list}

          {footer && other}
        </Group>
      </RovingFocus.Root>

      {type === "multi_select" && (
        <Group {...styles.selection({ bleed: !!collapsible })}>
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
            appearance={valid ? "primary" : "default"}
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
    </>
  );

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
            goBack();
          } else if (event.key === "ArrowRight" && !isLast) {
            setCurrentIndex((i) => i + 1);
          }
        }
      }}
      tabIndex={-1}
      {...styles.question({ collapsible: !!collapsible })}
    >
      {collapsible ? (
        <DisclosureTrigger addonAfter={controls} {...styles.header()}>
          <Text fontWeight="500">{question}</Text>
        </DisclosureTrigger>
      ) : (
        <Group pl="16">
          <Text flex="1" fontWeight="500">
            {question}
          </Text>
          {controls}
        </Group>
      )}
      {collapsible ? (
        <DisclosureContent
          display="flex"
          flexDirection="column"
          gap="16"
          pb="0"
          pt="16"
        >
          {content}
        </DisclosureContent>
      ) : (
        content
      )}
    </Group>
  );
}

ProteusQuestion.displayName = "@optiaxiom/proteus/ProteusQuestion";

/**
 * Flags `data-can-scroll` on the element while there is more to scroll to.
 * A callback ref, since the element remounts whenever the disclosure reopens.
 */
function useCanScroll() {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const updateRef = useRef<() => void>(undefined);
  const cleanupRef = useRef<() => void>(undefined);

  const ref = useCallback((node: HTMLDivElement | null) => {
    cleanupRef.current?.();
    cleanupRef.current = undefined;
    nodeRef.current = node;
    if (!node) return;

    const update = () => {
      if (node.scrollHeight - node.scrollTop - node.clientHeight > 1) {
        node.dataset.canScroll = "";
      } else {
        delete node.dataset.canScroll;
      }
    };
    updateRef.current = update;
    update();

    const observer = new ResizeObserver(update);
    observer.observe(node);
    node.addEventListener("scroll", update, { passive: true });
    cleanupRef.current = () => {
      observer.disconnect();
      node.removeEventListener("scroll", update);
    };
  }, []);

  return useMemo(
    () => ({ nodeRef, ref, update: () => updateRef.current?.() }),
    [ref],
  );
}
