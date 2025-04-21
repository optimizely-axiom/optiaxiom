import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type ComponentPropsWithoutRef, forwardRef, useMemo } from "react";

import type { CommandItem } from "../command";
import type { ExcludeProps } from "../utils";

import { type BoxProps } from "../box";
import { Command, CommandInput } from "../command";
import { useCommandContext } from "../command/internals";
import { PopoverContent } from "../popover";
import { useMenuContext } from "./MenuContext";
import { MenuListbox } from "./MenuListbox";
import { MenuNestedProvider, useMenuNestedContext } from "./MenuNestedContext";
import { useMenuSubContext } from "./MenuSubContext";

type MenuSubContentProps = ExcludeProps<
  BoxProps<
    typeof DropdownMenuContent,
    Pick<ComponentPropsWithoutRef<typeof CommandItem>, "item"> &
      Pick<ComponentPropsWithoutRef<typeof PopoverContent>, "maxH" | "minW">
  >,
  | "alignOffset"
  | "arrowPadding"
  | "avoidCollisions"
  | "collisionBoundary"
  | "collisionPadding"
  | "hideWhenDetached"
  | "sideOffset"
  | "sticky"
  | "updatePositionStrategy"
>;

export const MenuSubContent = forwardRef<HTMLDivElement, MenuSubContentProps>(
  ({ align = "start", children, item, side = "right", ...props }, outerRef) => {
    const options = useMemo(() => item.subOptions ?? [], [item]);
    const {
      activePath,
      inputRef: rootInputRef,
      onSelect,
      setActivePath,
      setOpen,
    } = useMenuContext("@optiaxiom/react/MenuSubContent");
    const { setInputValue } = useCommandContext(
      "@optiaxiom/react/MenuSubContent",
    );
    const {
      contentRef,
      inputRef,
      level,
      setOpen: setSubOpen,
    } = useMenuSubContext("@optiaxiom/react/MenuSubContent");
    const { inputRef: parentInputRef = rootInputRef } = useMenuNestedContext(
      "@optiaxiom/react/MenuSubContent",
    );
    const ref = useComposedRefs(contentRef, outerRef);

    return (
      <PopoverContent
        align={align}
        alignOffset={-4}
        maxH="sm"
        minW="trigger"
        onCloseAutoFocus={(event) => {
          if (activePath.length > level) {
            return;
          }

          event.preventDefault();
          parentInputRef.current?.focus();
        }}
        onEscapeKeyDown={() => setOpen(false)}
        p="4"
        ref={ref}
        side={side}
        sideOffset={0}
        {...props}
      >
        {children ?? (
          <Command
            onHover={(item) => {
              if (item.subOptions?.length) {
                const index = options.indexOf(item);
                setActivePath((path) =>
                  path[level + 1] !== index
                    ? [...path.slice(0, level + 1), index]
                    : path,
                );
              } else {
                setActivePath((path) =>
                  path.length > level + 1 ? path.slice(0, level + 1) : path,
                );
              }
            }}
            onInputValueChange={(inputValue) => {
              parentInputRef.current?.focus();
              setInputValue(inputValue);
            }}
            onSelect={(item, { close }) => {
              if (item.subOptions?.length) {
                const index = options.indexOf(item);
                setActivePath((path) =>
                  path[level + 1] !== index
                    ? [...path.slice(0, level + 1), index]
                    : path,
                );
              } else {
                onSelect(item, { close });
              }
            }}
            options={options}
          >
            <VisuallyHidden>
              <CommandInput
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    setSubOpen(false);
                  }
                }}
                ref={inputRef}
              />
            </VisuallyHidden>
            <MenuNestedProvider inputRef={inputRef} level={level + 1}>
              <MenuListbox />
            </MenuNestedProvider>
          </Command>
        )}
      </PopoverContent>
    );
  },
);

MenuSubContent.displayName = "@optiaxiom/react/MenuSubContent";
