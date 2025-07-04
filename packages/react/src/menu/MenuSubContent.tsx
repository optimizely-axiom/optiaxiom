import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useId } from "@radix-ui/react-id";
import clsx from "clsx";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";

import type { ExcludeProps } from "../utils";

import { type BoxProps } from "../box";
import { Command } from "../command";
import { resolveItemProperty, useCommandContext } from "../command/internals";
import { PopoverAnchor, PopoverContent } from "../popover";
import { usePopoverContext } from "../popover/internals";
import { VisuallyHidden } from "../visually-hidden";
import { useMenuContext } from "./MenuContext";
import { MenuListbox } from "./MenuListbox";
import { MenuSubProvider, useMenuSubContext } from "./MenuSubContext";
import { MenuSubInput } from "./MenuSubInput";

export type MenuSubContentProps = ExcludeProps<
  BoxProps<typeof PopoverContent>,
  "alignOffset" | "maxH" | "minW" | "sideOffset"
>;

export const MenuSubContent = forwardRef<HTMLDivElement, MenuSubContentProps>(
  ({ align = "start", side = "right", ...props }, outerRef) => {
    const { onSelect, setOpen: setRootMenuOpen } = useMenuContext(
      "@optiaxiom/react/MenuSubContent",
    );
    const {
      highlightedItem: item,
      inputValue: parentInputValue,
      setInputValue: setParentInputValue,
    } = useCommandContext("@optiaxiom/react/MenuSubContent");
    const {
      contentRef: parentContentRef,
      inputRef: parentInputRef,
      itemRef: parentItemRef,
    } = useMenuSubContext("@optiaxiom/react/MenuSubContent");
    const { open, presence } = usePopoverContext(
      "@optiaxiom/react/MenuSubContent",
    );

    const labelId = useId();
    const ref = useComposedRefs(parentContentRef, outerRef);

    const [inputValue, setInputValue] = useState("");
    const options = useMemo(
      () => resolveItemProperty(item?.subOptions, { inputValue }) ?? [],
      [inputValue, item],
    );
    const contentRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const itemRef = useRef<HTMLDivElement | null>(null);

    const [subMenuOpen, setSubMenuOpen] = useState(false);
    useEffect(() => {
      if (!open) {
        setSubMenuOpen(false);
      }
    }, [open]);
    useEffect(() => {
      return () => {
        setInputValue("");
        setSubMenuOpen(false);
      };
    }, [item]);

    if (!item || !(open || presence)) {
      return null;
    }

    return (
      <>
        <PopoverAnchor virtualRef={parentItemRef} />
        <PopoverContent
          align={align}
          alignOffset={item.subOptionsInputVisible ? -46 : -4}
          aria-labelledby={clsx(parentItemRef.current?.id, labelId)}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            parentInputRef.current?.focus();
          }}
          onEscapeKeyDown={() => setRootMenuOpen(false)}
          onPointerDown={(event) => {
            if (event.defaultPrevented) {
              return;
            }

            if (
              event.target instanceof Element &&
              event.target.closest('[role="option"]')
            ) {
              return;
            }

            event.preventDefault();
            inputRef.current?.focus();
          }}
          onPointerEnter={() => {
            if (item.subOptionsInputVisible) {
              inputRef.current?.focus();
            }
          }}
          onPointerLeave={(event) => {
            if (item.subOptionsInputVisible) {
              parentInputRef.current?.focus();
              event.stopPropagation();
            }
          }}
          p="4"
          ref={ref}
          side={side}
          sideOffset={0}
          {...props}
        >
          <VisuallyHidden asChild>
            <h2 id={labelId}>Submenu</h2>
          </VisuallyHidden>
          <Command
            enabled
            inputValue={inputValue}
            key={
              item.key ??
              resolveItemProperty(item.label, {
                inputValue: parentInputValue,
              })
            }
            onHover={(item, pointer) => {
              setSubMenuOpen(
                pointer &&
                  (typeof item.subOptions === "function" ||
                    !!item.subOptions?.length),
              );
            }}
            onInputValueChange={(inputValue) => {
              if (item.subOptionsInputVisible) {
                setInputValue(inputValue);
                return;
              }

              parentInputRef.current?.focus();
              setParentInputValue(inputValue);
            }}
            onSelect={(item, { dismiss }) => {
              if (
                typeof item.subOptions === "function" ||
                item.subOptions?.length
              ) {
                setSubMenuOpen(true);
              } else {
                onSelect(item, { dismiss });
              }
            }}
            options={options}
          >
            <VisuallyHidden disabled={item.subOptionsInputVisible}>
              <MenuSubInput placeholder="Filter..." ref={inputRef} />
            </VisuallyHidden>
            <MenuSubProvider
              contentRef={contentRef}
              inputRef={inputRef}
              itemRef={itemRef}
              open={subMenuOpen}
              setOpen={setSubMenuOpen}
            >
              <MenuListbox onScroll={() => setSubMenuOpen(false)} />
            </MenuSubProvider>
          </Command>
        </PopoverContent>
      </>
    );
  },
);

MenuSubContent.displayName = "@optiaxiom/react/MenuSubContent";
