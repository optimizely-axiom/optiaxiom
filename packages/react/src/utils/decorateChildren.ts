import { cloneElement, isValidElement, type ReactNode } from "react";

export const decorateChildren = (
  { asChild, children }: { asChild?: boolean; children?: ReactNode },
  decorator: (children: ReactNode) => ReactNode,
): ReactNode => {
  if (asChild) {
    const newElement = isValidElement(children) ? children : null;
    return newElement
      ? cloneElement(
          newElement,
          undefined,
          decorateChildren(
            {
              ...newElement.props,
              asChild:
                newElement.props.asChild ||
                (typeof newElement.type !== "string" &&
                  "displayName" in newElement.type &&
                  typeof newElement.type.displayName === "string" &&
                  newElement.type.displayName?.endsWith(".Slot")),
            },
            decorator,
          ),
        )
      : children;
  } else {
    return decorator(children);
  }
};
