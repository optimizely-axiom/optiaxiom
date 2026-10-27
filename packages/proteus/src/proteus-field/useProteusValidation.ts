import { useId } from "@radix-ui/react-id";
import {
  type ChangeEvent,
  type ChangeEventHandler,
  type FocusEvent,
  type FocusEventHandler,
  useEffect,
  useRef,
} from "react";

import { useProteusFieldContext } from "./ProteusFieldContext";

/**
 * A message for any failure, or one per `ValidityState` flag. Flags without a
 * message keep the browser's text.
 */
export type ValidationMessage =
  | Partial<Record<(typeof flags)[number], string>>
  | string;

type Control = HTMLInputElement | HTMLTextAreaElement;

// When several constraints fail at once, report the most basic one first.
const flags = [
  "valueMissing",
  "badInput",
  "typeMismatch",
  "tooShort",
  "tooLong",
  "rangeUnderflow",
  "rangeOverflow",
  "stepMismatch",
  "patternMismatch",
] as const;

/**
 * Report a control's validation message to the enclosing `Field`.
 *
 * Errors appear once the control has been blurred, then track every change, so
 * the user isn't told a field is invalid while they're still typing it.
 */
export function useProteusValidation<T extends Control>(
  {
    onBlur,
    onChange,
  }: {
    onBlur?: FocusEventHandler<T>;
    onChange?: ChangeEventHandler<T>;
  },
  message?: ValidationMessage,
) {
  const { setError } = useProteusFieldContext(
    "@optiaxiom/proteus/useProteusValidation",
  );
  const id = useId();
  const touched = useRef(false);
  useEffect(() => () => setError?.(id, ""), [id, setError]);

  const report = (control: Control) => {
    setError?.(id, getMessage(control, message));
  };

  return {
    onBlur: (event: FocusEvent<T>) => {
      onBlur?.(event);
      touched.current = true;
      report(event.currentTarget);
    },
    onChange: (event: ChangeEvent<T>) => {
      onChange?.(event);
      if (touched.current) {
        report(event.currentTarget);
      }
    },
  };
}

function getMessage(control: Control, message?: ValidationMessage) {
  if (control.validity.valid) {
    return "";
  }
  if (typeof message === "string") {
    return message;
  }
  const flag = flags.find((flag) => control.validity[flag]);
  return (flag && message?.[flag]) || control.validationMessage;
}
