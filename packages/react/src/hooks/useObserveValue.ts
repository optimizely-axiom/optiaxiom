import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { type Ref, type RefObject, useCallback, useRef } from "react";

import { useEvent } from "./useEvent";

/**
 * Returns the element's ref, composed from `innerRef` and the consumer's
 * `outerRef`, and a function that sets the value and fires `change`.
 *
 * The ref watches writes from outside (form libraries, resets) from the moment
 * the element attaches, ahead of the consumer's ref. An effect would start too
 * late: react-hook-form writes `defaultValues` from its own ref callback,
 * before effects run.
 */
export const useObserveValue = <T extends HTMLInputElement | HTMLSelectElement>(
  innerRef: RefObject<T>,
  outerRef: Ref<T>,
  setValue: (value: string) => void,
) => {
  const onValue = useEvent(setValue);
  const observedRef = useRef<null | T>(null);

  // Ignores `null`: a consumer ref that changes every render (react-hook-form's
  // `register`) detaches and reattaches the composed ref on each render.
  const observeRef = useCallback(
    (input: null | T) => {
      if (input && input !== observedRef.current) {
        observedRef.current = input;
        observe(input, onValue);
      }
    },
    [onValue],
  );
  const ref = useComposedRefs(innerRef, observeRef, outerRef);

  const forceValueChange = (value: string) => {
    if (!innerRef.current) {
      return;
    }

    innerRef.current.value = value;
    innerRef.current.dispatchEvent(new Event("change", { bubbles: true }));
  };

  return [ref, forceValueChange] as const;
};

const observe = (
  input: HTMLInputElement | HTMLSelectElement,
  setValue: (value: string) => void,
) => {
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
  } else {
    Object.setPrototypeOf(
      input,
      Object.create(Object.getPrototypeOf(input), { value: accessor }),
    );
  }
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
