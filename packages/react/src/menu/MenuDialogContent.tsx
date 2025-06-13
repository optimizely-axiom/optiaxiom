import clsx from "clsx";
import { type ComponentPropsWithoutRef, forwardRef, useId } from "react";

import type { MenuContent } from "./MenuContent";

import { DialogContent, DialogHeader } from "../dialog";
import { useFieldContext } from "../field/FieldContext";
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

    return (
      <DialogContent
        aria-labelledby={clsx(fieldLabelId ?? triggerRef.current?.id, labelId)}
        ref={ref}
        {...styles.content({}, className)}
        {...props}
      >
        {children}

        <VisuallyHidden asChild tabIndex={-1}>
          <h2 id={labelId}>{ariaLabel || "Menu"}</h2>

          <DialogHeader
          // Prevent radix from throwing warnings in development mode
          />
        </VisuallyHidden>
      </DialogContent>
    );
  },
);

MenuDialogContent.displayName = "@optiaxiom/react/MenuDialogContent";
