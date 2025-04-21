import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { DialogContent } from "../dialog";
import type { PopoverContent } from "../popover";
import type { ExcludeProps } from "../utils";

import { useCommandContext } from "../command/internals";
import { useFieldContext } from "../field/internals";
import { VisuallyHidden } from "../visually-hidden";
import { useMenuContext } from "./MenuContext";
import { MenuDialogContent } from "./MenuDialogContent";
import { MenuInput } from "./MenuInput";
import { MenuListbox } from "./MenuListbox";
import { MenuPopoverContent } from "./MenuPopoverContent";

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
