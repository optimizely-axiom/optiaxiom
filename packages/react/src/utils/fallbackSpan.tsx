import { Fragment, isValidElement, type ReactNode } from "react";

export const fallbackSpan = (content: ReactNode) =>
  isValidElement(content) && content.type !== Fragment ? (
    content
  ) : (
    <span>{content}</span>
  );
