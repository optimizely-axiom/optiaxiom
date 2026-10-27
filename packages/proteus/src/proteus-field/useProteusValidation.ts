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

type Control = HTMLInputElement | HTMLTextAreaElement;

/**
 * Report a control's validation message to the enclosing `Field`.
 *
 * Errors appear once the control has been blurred, then track every change, so
 * the user isn't told a field is invalid while they're still typing it.
 */
export function useProteusValidation<T extends Control>({
  onBlur,
  onChange,
}: {
  onBlur?: FocusEventHandler<T>;
  onChange?: ChangeEventHandler<T>;
}) {
  const { setError } = useProteusFieldContext(
    "@optiaxiom/proteus/useProteusValidation",
  );
  const id = useId();
  const touched = useRef(false);
  useEffect(() => () => setError?.(id, ""), [id, setError]);

  const report = (control: Control) => {
    setError?.(id, control.validationMessage);
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
