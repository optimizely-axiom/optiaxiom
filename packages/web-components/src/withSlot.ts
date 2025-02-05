import { createElement, forwardRef, useLayoutEffect } from "react";

import { withContextBridge } from "./withContextBridge";

/**
 * Forward correct ref when wrapping children in slot in root node.
 *
 * Instead of forwarding the ref to the <slot> element inside the shadow root
 * we instead assign it to the source HTML element from which we created the
 * slot.
 */
export const withSlot = (element: Element) => {
  const Bridge = withContextBridge(element);

  return forwardRef((props, ref) => {
    useLayoutEffect(() => {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref && "current" in ref) {
        ref.current = element;
      }

      return () => {
        if (typeof ref === "function") {
          ref(null);
        } else if (ref && "current" in ref) {
          ref.current = undefined;
        }
      };
    }, [ref]);

    return createElement("slot", { ...props, ref }, createElement(Bridge));
  });
};
