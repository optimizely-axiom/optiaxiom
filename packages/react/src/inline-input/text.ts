// jsdom (Jest's default environment) implements neither `innerText` nor
// `document.execCommand`, so each helper falls back to plain DOM edits there.

/**
 * Read the text of a contenteditable element as the user sees it.
 */
export function getText(element: HTMLElement) {
  const text =
    "innerText" in HTMLElement.prototype
      ? element.innerText
      : (element.textContent ?? "");
  return text.endsWith("\n") ? text.slice(0, -1) : text;
}

/**
 * Insert text at the caret, replacing any selection. Goes through
 * `execCommand` so the edit lands in the browser's undo history.
 */
export function insertText(text: string) {
  if (typeof document.execCommand === "function") {
    document.execCommand("insertHTML", false, text);
    return;
  }

  const selection = window.getSelection();
  if (!selection?.rangeCount) {
    return;
  }
  const range = selection.getRangeAt(0);
  const node = document.createTextNode(text);
  range.deleteContents();
  range.insertNode(node);
  range.setStartAfter(node);
  range.collapse(true);
}

/**
 * Replace the text of a contenteditable element. While it has focus the
 * edit goes through {@link insertText}, keeping the user's undo history.
 */
export function setText(element: HTMLElement, text: string) {
  if (document.activeElement === element) {
    window.getSelection()?.selectAllChildren(element);
    insertText(text);
  } else if ("innerText" in HTMLElement.prototype) {
    element.innerText = text;
  } else {
    element.textContent = text;
  }
}
