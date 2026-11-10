import { useId } from "@radix-ui/react-id";
import clsx from "clsx";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { MenuContent } from "./MenuContent";

import { DialogContent } from "../dialog";
import { useFieldContext } from "../field/internals";
import { useMessages } from "../locale";
import { VisuallyHidden } from "../visually-hidden";
import { useMenuContext } from "./MenuContext";
import * as styles from "./MenuDialogContent.css";

export type MenuDialogContentProps = ComponentPropsWithoutRef<
  typeof MenuContent
>;

export const MenuDialogContent = forwardRef<
  HTMLDivElement,
  MenuDialogContentProps
>(
  (
    {
      align: _align,
      "aria-label": ariaLabel,
      children,
      className,
      minW: _minW,
      side: _side,
      sideOffset: _sideOffset,
      ...props
    },
    ref,
  ) => {
    const { labelId: fieldLabelId } = useFieldContext(
      "@optiaxiom/react/MenuDialogContent",
    );
    const { triggerRef } = useMenuContext("@optiaxiom/react/MenuDialogContent");
    const labelId = useId();
    const messages = useMessages();

    return (
      <DialogContent
        aria-labelledby={clsx(fieldLabelId ?? triggerRef.current?.id, labelId)}
        onPointerDownOutside={() => {
          // Allow light dismiss of menu by passing an empty method
        }}
        ref={ref}
        {...styles.content({}, className)}
        {...props}
      >
        {children}

        <VisuallyHidden asChild>
          <h2 id={labelId}>{ariaLabel || messages["Menu"]}</h2>
        </VisuallyHidden>
      </DialogContent>
    );
  },
);

MenuDialogContent.displayName = "@optiaxiom/react/MenuDialogContent";
