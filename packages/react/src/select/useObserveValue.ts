import { type RefObject, useEffect } from "react";

export const useObserveValue = (
  inputRef: RefObject<HTMLElement>,
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
};
