import { type RefObject, useEffect } from "react";

export const useObserveValue = (
  inputRef: RefObject<HTMLInputElement | HTMLSelectElement>,
  setValue: (value: string) => void,
) => {
  useEffect(() => {
    const input = inputRef.current;
    if (!input) {
      return;
    }

    const descriptor = Object.getOwnPropertyDescriptor(
      input.constructor.prototype,
      "value",
    );
    Object.defineProperty(input, "value", {
      configurable: true,
      enumerable: true,
      get: function () {
        return descriptor?.get?.call(input);
      },
      set: function (value) {
        descriptor?.set?.call(input, value);
        setValue(value);
      },
    });
  }, [inputRef, setValue]);

  return (value: string) => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.value = value;
    inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
  };
};
