import { useLayoutEffect } from "react";

import {
  CustomContextEvent,
  CustomMountEvent,
  CustomUnmountEvent,
} from "./events";

export const withContextBridge = (element: Element) => {
  /**
   * Provide the current rendering status and preact context via a custom event.
   */
  let context: unknown = undefined;
  let rendered = false;
  element.addEventListener(CustomContextEvent, (event) => {
    event.detail.context = context;
    event.detail.rendered = rendered;
  });

  return (_props: unknown, _context: unknown) => {
    context = _context;
    rendered = true;

    useLayoutEffect(() => {
      element.dispatchEvent(
        new CustomEvent(CustomMountEvent, {
          cancelable: true,
          detail: { context },
        }),
      );

      return () => {
        element.dispatchEvent(new CustomEvent(CustomUnmountEvent));
      };
    }, []);

    return null;
  };
};
