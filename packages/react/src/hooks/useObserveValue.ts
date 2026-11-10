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
    const accessor = {
      configurable: true,
      enumerable: true,
      get(this: typeof input) {
        return descriptor?.get?.call(this);
      },
      set(this: typeof input, value: string) {
        descriptor?.set?.call(this, value);
        setValue(value);
      },
    };

    // An own accessor has to sit above React's value tracker on <input> and
    // above the accessor happy-dom copies onto elements. jsdom 26 and older
    // never call an own accessor's setter on <select>, so there it goes on a
    // prototype in front of the element's class.
    if (ownAccessorWorks(input)) {
      Object.defineProperty(input, "value", accessor);
      return;
    }
    const prototype = Object.getPrototypeOf(input);
    Object.setPrototypeOf(input, Object.create(prototype, { value: accessor }));
    return () => {
      Object.setPrototypeOf(input, prototype);
    };
  }, [inputRef, setValue]);

  return (value: string) => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.value = value;
    inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
  };
};

const ownAccessorWorksByTag = new Map<string, boolean>();

const ownAccessorWorks = (element: Element) => {
  let works = ownAccessorWorksByTag.get(element.localName);
  if (works === undefined) {
    works = false;
    const probe = element.ownerDocument.createElement(element.localName);
    Object.defineProperty(probe, "value", {
      configurable: true,
      set() {
        works = true;
      },
    });
    try {
      (probe as HTMLInputElement).value = "";
    } catch {
      // jsdom's <select> proxy throws in strict mode instead of calling it.
    }
    ownAccessorWorksByTag.set(element.localName, works);
  }
  return works;
};
