import { useComposedRefs } from "@radix-ui/react-compose-refs";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithoutRef, forwardRef, Fragment } from "react";

import type { CommandItem } from "../command-item";
import type { ExcludeProps } from "../utils";

import { type BoxProps } from "../box";
import { useComboboxContext } from "../combobox-context";
import { useComboboxSubContext } from "../combobox-sub-context";
import {
  type Group,
  resolveItemProperty,
  useCommandContext,
} from "../command-context";
import { ListboxCheckboxItem } from "../listbox-checkbox-item";
import { ListboxItem } from "../listbox-item";
import { ListboxLabel } from "../listbox-label";
import { ListboxRadioItem } from "../listbox-radio-item";
import { MenuListbox } from "../menu-listbox";
import { Separator } from "../separator";
import { TransitionGroup } from "../transition-group";
import * as styles from "./SelectContent.css";

type ComboboxSubContentProps = ExcludeProps<
  BoxProps<
    typeof DropdownMenuContent,
    ComponentPropsWithoutRef<typeof CommandItem> &
      Pick<ComponentPropsWithoutRef<typeof MenuListbox>, "maxH" | "minW">
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

export const ComboboxSubContent = forwardRef<
  HTMLDivElement,
  ComboboxSubContentProps
>(
  (
    { align = "start", children, className, item, side = "right", ...props },
    outerRef,
  ) => {
    const { inputRef, setOpen } = useComboboxContext(
      "@optiaxiom/react/ComboboxSubContent",
    );
    const { activePath, downshift, inputValue, setInputValue } =
      useCommandContext("@optiaxiom/react/ComboboxSubContent");
    const {
      contentRef,
      open,
      setOpen: setSubOpen,
      setPresence,
    } = useComboboxSubContext("@optiaxiom/react/ComboboxSubContent");
    const ref = useComposedRefs(contentRef, outerRef);

    let isFirstItem = true;
    let lastGroup: Group | undefined = undefined;
    const shouldShowSeparator = (group: Group | undefined) => {
      const show = !isFirstItem;
      isFirstItem = false;
      return show && group && group !== lastGroup && group.separator;
    };
    const shouldShowGroup = (group: Group | undefined): group is Group => {
      const show = group !== lastGroup;
      lastGroup = group;
      return show && !!group?.visible;
    };

    return (
      <TransitionGroup onPresenceChange={setPresence} open={open}>
        <DropdownMenuPortal forceMount>
          <MenuListbox
            asChild
            maxH="sm"
            minW="trigger"
            provider="popper"
            ref={ref}
            role="listbox"
            {...styles.content({}, className)}
            {...props}
          >
            <DropdownMenuContent
              align={align}
              alignOffset={-4}
              onCloseAutoFocus={(event) => {
                if (activePath.length) {
                  return;
                }
                event.preventDefault();
                inputRef.current?.focus();
              }}
              onEscapeKeyDown={() => {
                setOpen(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  setSubOpen(false);
                } else if (/^[A-Za-z0-9]$/.test(event.key)) {
                  event.preventDefault();
                  event.stopPropagation();
                  inputRef.current?.focus();
                  setInputValue(event.key);
                }
              }}
              side={side}
              sideOffset={0}
            >
              {children ??
                item.subItems?.map((item, index) => {
                  const type =
                    "selected" in item
                      ? item.multi
                        ? "checkbox"
                        : "radio"
                      : "action";
                  let element;
                  switch (type) {
                    case "action":
                      element = (
                        <DropdownMenuItem asChild>
                          <ListboxItem addonBefore={item.addon}>
                            {resolveItemProperty(item.label, { inputValue })}
                          </ListboxItem>
                        </DropdownMenuItem>
                      );
                      break;
                    case "checkbox":
                      element = (
                        <DropdownMenuCheckboxItem
                          asChild
                          checked={resolveItemProperty(item.selected)}
                          onSelect={() => downshift.selectItem(item)}
                        >
                          <ListboxCheckboxItem addonBefore={item.addon}>
                            {resolveItemProperty(item.label, { inputValue })}
                          </ListboxCheckboxItem>
                        </DropdownMenuCheckboxItem>
                      );
                      break;
                    case "radio":
                      element = (
                        <DropdownMenuCheckboxItem
                          asChild
                          checked={resolveItemProperty(item.selected)}
                          onSelect={() => downshift.selectItem(item)}
                        >
                          <ListboxRadioItem addonBefore={item.addon}>
                            {resolveItemProperty(item.label, { inputValue })}
                          </ListboxRadioItem>
                        </DropdownMenuCheckboxItem>
                      );
                      break;
                  }

                  const group = item.group;
                  return (
                    <Fragment key={index}>
                      {shouldShowSeparator(group) && <Separator />}
                      {shouldShowGroup(group) && (
                        <ListboxLabel>{group.name}</ListboxLabel>
                      )}
                      {element}
                    </Fragment>
                  );
                })}
            </DropdownMenuContent>
          </MenuListbox>
        </DropdownMenuPortal>
      </TransitionGroup>
    );
  },
);

ComboboxSubContent.displayName = "@optiaxiom/react/ComboboxSubContent";
