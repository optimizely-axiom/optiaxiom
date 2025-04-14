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
import {
  type Group,
  resolveItemProperty,
  useCommandContext,
} from "../command-context";
import { ListboxCheckboxItem } from "../listbox-checkbox-item";
import { ListboxItem } from "../listbox-item";
import { ListboxLabel } from "../listbox-label";
import { ListboxRadioItem } from "../listbox-radio-item";
import { useMenuContext } from "../menu-context";
import { useMenuSubContext } from "../menu-sub-context";
import { OverlayListbox } from "../overlay-listbox";
import { Separator } from "../separator";
import { TransitionGroup } from "../transition-group";
import * as styles from "./SelectContent.css";

type MenuSubContentProps = ExcludeProps<
  BoxProps<
    typeof DropdownMenuContent,
    ComponentPropsWithoutRef<typeof CommandItem> &
      Pick<ComponentPropsWithoutRef<typeof OverlayListbox>, "maxH" | "minW">
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
  (
    { align = "start", children, className, item, side = "right", ...props },
    outerRef,
  ) => {
    const { activePath, inputRef, onSelect, setOpen } = useMenuContext(
      "@optiaxiom/react/MenuSubContent",
    );
    const { inputValue, setInputValue } = useCommandContext(
      "@optiaxiom/react/MenuSubContent",
    );
    const {
      contentRef,
      open,
      setOpen: setSubOpen,
      setPresence,
    } = useMenuSubContext("@optiaxiom/react/MenuSubContent");
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
          <OverlayListbox
            asChild
            maxH="sm"
            minW="trigger"
            ref={ref}
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
                item.subOptions?.map((item, index) => {
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
                        <DropdownMenuItem
                          asChild
                          onSelect={() => onSelect(item, { close: true })}
                        >
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
                          onKeyDown={(event) => {
                            if (event.key === " ") {
                              event.preventDefault();
                              onSelect(item, { close: false });
                            }
                          }}
                          onSelect={() => onSelect(item, { close: true })}
                        >
                          <ListboxCheckboxItem
                            addonBefore={item.addon}
                            onCheckedChange={() =>
                              onSelect(item, { close: false })
                            }
                          >
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
                          onKeyDown={(event) => {
                            if (event.key === " ") {
                              event.preventDefault();
                              onSelect(item, { close: false });
                            }
                          }}
                          onSelect={() => onSelect(item, { close: true })}
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
          </OverlayListbox>
        </DropdownMenuPortal>
      </TransitionGroup>
    );
  },
);

MenuSubContent.displayName = "@optiaxiom/react/MenuSubContent";
