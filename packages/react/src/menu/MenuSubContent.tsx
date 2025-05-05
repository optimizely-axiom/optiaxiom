import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { CommandItem } from "../command";
import type { ExcludeProps } from "../utils";

import { type BoxProps } from "../box";
import { Command, CommandInput } from "../command";
import { useCommandContext } from "../command/internals";
import { PopoverContent } from "../popover";
import { usePopoverContext } from "../popover/PopoverContext";
import { VisuallyHidden } from "../visually-hidden";
import { useMenuContext } from "./MenuContext";
import { MenuListbox } from "./MenuListbox";
import { MenuSubProvider, useMenuSubContext } from "./MenuSubContext";

export type MenuSubContentProps = ExcludeProps<
  BoxProps<
    typeof PopoverContent,
    Pick<ComponentPropsWithoutRef<typeof CommandItem>, "item">
  >,
  "alignOffset" | "maxH" | "minW" | "sideOffset"
>;

export const MenuSubContent = forwardRef<HTMLDivElement, MenuSubContentProps>(
  ({ align = "start", children, item, side = "right", ...props }, ref) => {
    const options = useMemo(() => item.subOptions ?? [], [item]);
    const { onSelect, setOpen: setRootMenuOpen } = useMenuContext(
      "@optiaxiom/react/MenuSubContent",
    );
    const { setInputValue } = useCommandContext(
      "@optiaxiom/react/MenuSubContent",
    );
    const {
      inputRef: parentInputRef,
      open: parentSubMenuOpen,
      setOpen,
    } = useMenuSubContext("@optiaxiom/react/MenuSubContent");
    const { open } = usePopoverContext("@optiaxiom/react/MenuSubContent");

    const inputRef = useRef<HTMLInputElement>(null);

    const [subMenuOpen, setSubMenuOpen] = useState(false);
    useEffect(() => {
      if (!open) {
        setSubMenuOpen(false);
      }
    }, [open]);

    return (
      <PopoverContent
        align={align}
        alignOffset={-4}
        maxH="sm"
        minW="trigger"
        onCloseAutoFocus={(event) => {
          if (parentSubMenuOpen) {
            return;
          }

          event.preventDefault();
          parentInputRef.current?.focus();
        }}
        onEscapeKeyDown={() => setRootMenuOpen(false)}
        p="4"
        ref={ref}
        side={side}
        sideOffset={0}
        {...props}
      >
        {children ?? (
          <Command
            onHover={(item) => {
              setSubMenuOpen(!!item.subOptions?.length);
            }}
            onInputValueChange={(inputValue) => {
              parentInputRef.current?.focus();
              setInputValue(inputValue);
            }}
            onSelect={(item, { close }) => {
              if (item.subOptions?.length) {
                setSubMenuOpen(true);
              } else {
                onSelect(item, { close });
              }
            }}
            open
            options={options}
          >
            <VisuallyHidden>
              <CommandInput
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    setOpen(false);
                  }
                }}
                ref={inputRef}
              />
            </VisuallyHidden>
            <MenuSubProvider
              inputRef={inputRef}
              open={subMenuOpen}
              setOpen={setSubMenuOpen}
            >
              <MenuListbox onScroll={() => setSubMenuOpen(false)} />
            </MenuSubProvider>
          </Command>
        )}
      </PopoverContent>
    );
  },
);

MenuSubContent.displayName = "@optiaxiom/react/MenuSubContent";
