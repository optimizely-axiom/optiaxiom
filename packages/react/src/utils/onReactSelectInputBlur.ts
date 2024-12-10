import type { FocusEvent } from "react";

export function onReactSelectInputBlur(event: FocusEvent<HTMLDivElement>) {
  const { relatedTarget, target } = event;
  if (isReactSelectInput(target) && isNonDialogElement(relatedTarget)) {
    relatedTarget.focus();
  }
}

function isNonDialogElement(
  element: EventTarget | null,
): element is HTMLElement {
  return element instanceof HTMLElement && element.role !== "dialog";
}

function isReactSelectInput(element: EventTarget) {
  return (
    element instanceof HTMLElement &&
    element.id.startsWith("react-select-") &&
    element.id.endsWith("-input") &&
    element.localName === "input"
  );
}
