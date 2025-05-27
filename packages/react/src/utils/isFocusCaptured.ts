import type { MouseEvent } from "react";

export const isFocusCaptured = (event: MouseEvent) => {
  if (event.currentTarget.contains(document.activeElement)) {
    return true;
  }

  if (event.target instanceof Element) {
    const label = event.target.closest("label");
    if (label && event.currentTarget.contains(label) && label.control) {
      return true;
    }
  }

  return false;
};
