import { Slot } from "@radix-ui/react-slot";
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
              asChild: newElement.props.asChild || newElement.type === Slot,
            },
            decorator,
          ),
        )
      : children;
  } else {
    return decorator(children);
  }
};
