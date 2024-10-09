import { isValidElement, type ReactNode } from "react";

export const fallbackSpan = (content: ReactNode) =>
  isValidElement(content) ? content : <span>{content}</span>;
