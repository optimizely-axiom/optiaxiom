import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { DialogContent } from "../dialog-content";
import type { PopoverContent } from "../popover-content";
import type { ExcludeProps } from "../utils";

import { useCommandContext } from "../command-context";
import { useFieldContext } from "../field-context";
import { useMenuContext } from "../menu-context";
import { MenuDialogContent } from "../menu-dialog-content";
import { MenuInput } from "../menu-input";
import { MenuListbox } from "../menu-listbox";
import { MenuPopoverContent } from "../menu-popover-content";
import { VisuallyHidden } from "../visually-hidden";

type MenuContentProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof DialogContent> &
    ComponentPropsWithoutRef<typeof PopoverContent>,
  "minW" | "size" | "transitionType" | "withArrow"
>;

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ children, ...props }, ref) => {
    const { labelId } = useFieldContext();
    const { inputVisible, placeholder, size } = useMenuContext(
      "@optiaxiom/react/MenuContent",
    );
    const { empty, loading } = useCommandContext(
      "@optiaxiom/react/MenuContent",
    );
    const Comp = size === "sm" ? MenuPopoverContent : MenuDialogContent;

    return (
      <Comp
        aria-labelledby={labelId}
        overflow="hidden"
        p={size === "sm" ? "4" : "0"}
        ref={ref}
        {...props}
      >
        <VisuallyHidden disabled={inputVisible}>
          <MenuInput placeholder={placeholder} />
        </VisuallyHidden>
        <MenuListbox
          empty={empty}
          loading={loading}
          p={size === "lg" ? "6" : "0"}
        >
          {children}
        </MenuListbox>
      </Comp>
    );
  },
);

MenuContent.displayName = "@optiaxiom/react/MenuContent";
