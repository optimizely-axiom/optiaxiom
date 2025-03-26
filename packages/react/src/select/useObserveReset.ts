import { type RefObject, useEffect } from "react";

export const useObserveReset = (
  inputRef: RefObject<HTMLElement>,
  setValue: (value: string) => void,
) => {
  useEffect(() => {
    const input = inputRef.current;
    if (!input) {
      return;
    }

    const form = input.closest("form");
    if (!form) {
      return;
    }

    const listener = () => setValue("");
    form.addEventListener("reset", listener);
    return () => form.removeEventListener("reset", listener);
  }, [inputRef, setValue]);
};
