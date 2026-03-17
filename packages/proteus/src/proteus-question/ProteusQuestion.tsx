import { Button, Group } from "@optiaxiom/react";
import { Text } from "@optiaxiom/react";
import { useState } from "react";

import { IconAngleLeft } from "../icons/IconAngleLeft";
import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { ProteusQuestionItem } from "./ProteusQuestionItem";

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

  if (currentIndex >= questions.length) {
    return null;
  }

  const current = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const onComplete = () =>
    onEvent({
      message: answers
        .map(
          (value, index) =>
            `Q: ${questions[index].question}\nA: ${value === null ? "[Not specified]" : value}`,
        )
        .join("\n\n"),
    });

  return (
    <Group flexDirection="column" gap="16">
      <ProteusQuestionItem
        onValueChange={(value) => {
          answers[currentIndex] = value;
          setAnswers([...answers]);
        }}
        options={current.options}
        question={current.question}
        type={current.type}
        value={answers[currentIndex] ?? null}
      />

      <Group gap="8" justifyContent="end">
        {questions.length > 1 && (
          <>
            <Button
              aria-label="Previous"
              disabled={currentIndex === 0}
              icon={<IconAngleLeft />}
              onClick={(event) => {
                event.preventDefault();
                setCurrentIndex((i) => i - 1);
              }}
            />
            <Text color="fg.tertiary">
              {currentIndex + 1} of {questions.length}
            </Text>
          </>
        )}
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
          onClick={(event) => {
            event.preventDefault();
            if (isLast) {
              void onComplete();
            } else {
              setCurrentIndex((i) => i + 1);
            }
          }}
        >
          {isLast ? "Submit" : "Next"}
        </Button>
      </Group>
    </Group>
  );
}

ProteusQuestion.displayName = "@optiaxiom/proteus/ProteusQuestion";
