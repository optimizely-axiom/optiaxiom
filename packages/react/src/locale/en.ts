import type { Locale } from "./LocaleContext";

/**
 * Built-in labels and messages. Every other locale supplies the same keys.
 */
const messages = {
  "(first page)": "(first page)",
  "(last page)": "(last page)",
  Accept: "Accept",
  "App companion suggestion": "App companion suggestion",
  Bold: "Bold",
  Breadcrumb: "Breadcrumb",
  "Bullet list": "Bullet list",
  Calendar: "Calendar",
  Cancel: "Cancel",
  "change month": "change month",
  "change year": "change year",
  "Character limit reached": "Character limit reached",
  "Check to select": "Check to select",
  "Check to unselect": "Check to unselect",
  Clear: "Clear",
  close: "close",
  Close: "Close",
  Collapse: "Collapse",
  Done: "Done",
  "Drag and drop files here": "Drag and drop files here",
  draggable: "draggable",
  "Dragging was cancelled. {label} returned to position {position} of {count}.":
    (label: string, position: number, count: number) =>
      `Dragging was cancelled. ${label} returned to position ${position} of ${count}.`,
  Error: "Error",
  Expand: "Expand",
  "Filter...": "Filter...",
  "Go to the next month": "Go to the next month",
  "Go to the next year": "Go to the next year",
  "Go to the next year range": "Go to the next year range",
  "Go to the previous month": "Go to the previous month",
  "Go to the previous year": "Go to the previous year",
  "Go to the previous year range": "Go to the previous year range",
  HH: "HH",
  Italic: "Italic",
  Link: "Link",
  Loading: "Loading",
  Main: "Main",
  "Mark suggestion": "Mark suggestion",
  Menu: "Menu",
  MM: "MM",
  "More information": "More information",
  "More items": "More items",
  Next: "Next",
  "Next page": "Next page",
  "No results found.": "No results found.",
  "Numbered list": "Numbered list",
  "Page Size": "Page Size",
  "page {page}": (page: number) => `page ${page}`,
  pagination: "pagination",
  "Pick a date": "Pick a date",
  "Picked up {label}, item {position} of {count}.": (
    label: string,
    position: number,
    count: number,
  ) => `Picked up ${label}, item ${position} of ${count}.`,
  Prev: "Prev",
  "Previous page": "Previous page",
  "Quick search": "Quick search",
  "Remove file": "Remove file",
  Required: "Required",
  "Rich text editor": "Rich text editor",
  Secondary: "Secondary",
  "Select all": "Select all",
  "Select AM or PM": "Select AM or PM",
  "Select files": "Select files",
  "Select hour": "Select hour",
  "Select minute": "Select minute",
  "Show date picker": "Show date picker",
  "sorted ascending": "sorted ascending",
  "sorted descending": "sorted descending",
  Submenu: "Submenu",
  Suggested: "Suggested",
  "Suggested:": "Suggested:",
  Suggestion: "Suggestion",
  "Toggle row": "Toggle row",
  "To pick up a draggable item, press the space bar. While dragging, use the arrow keys to move the item in a given direction. Press space again to drop the item in its new position, or press escape to cancel.":
    "To pick up a draggable item, press the space bar. While dragging, use the arrow keys to move the item in a given direction. Press space again to drop the item in its new position, or press escape to cancel.",
  Unknown: "Unknown",
  "Upload failed": "Upload failed",
  "Why this was suggested": "Why this was suggested",
  "{count} of {max} characters": (count: number, max: number) =>
    `${count} of ${max} characters`,
  "{label} dropped at position {position} of {count}.": (
    label: string,
    position: number,
    count: number,
  ) => `${label} dropped at position ${position} of ${count}.`,
  "{label} moved to position {position} of {count}.": (
    label: string,
    position: number,
    count: number,
  ) => `${label} moved to position ${position} of ${count}.`,
  "{start} - {end} of {total}": (start: number, end: number, total: number) =>
    `${start} - ${end} of ${total}`,
  "{type} is not an accepted file type": (type: string) =>
    `${type} is not an accepted file type`,
};

export type Messages = typeof messages;

/**
 * English, the default language of built-in labels.
 */
export const en: Locale = { code: "en", messages };
