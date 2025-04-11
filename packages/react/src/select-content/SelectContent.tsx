import { PopperContent } from "@radix-ui/react-popper";
import { Portal } from "@radix-ui/react-portal";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";

import type { ExcludeProps } from "../utils";

import { type BoxProps } from "../box";
import { ListboxItemized } from "../listbox-itemized";
import { ListboxLabel } from "../listbox-label";
import { ListboxSeparator } from "../listbox-separator";
import { MenuListbox } from "../menu-listbox";
import { ModalLayer } from "../modal-layer";
import {
  type Group,
  type SelectOption,
  useSelectContext,
} from "../select-context";
import { SelectRadioItem } from "../select-radio-item";
import { TransitionGroup } from "../transition-group";
import * as styles from "./SelectContent.css";

type SelectContentProps = ExcludeProps<
  BoxProps<
    typeof PopperContent,
    Pick<ComponentPropsWithoutRef<typeof MenuListbox>, "maxH" | "minW"> & {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children?: ((item: any) => ReactNode) | ReactNode;
    }
  >,
  | "alignOffset"
  | "arrowPadding"
  | "avoidCollisions"
  | "collisionBoundary"
  | "collisionPadding"
  | "hideWhenDetached"
  | "onPlaced"
  | "sideOffset"
  | "sticky"
  | "updatePositionStrategy"
>;

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  (
    { align = "start", children, className, side = "bottom", size, ...props },
    ref,
  ) => {
    const {
      downshift,
      highlightedItem,
      isOpen,
      items,
      loading,
      placed,
      setPlaced,
    } = useSelectContext("@optiaxiom/react/SelectContent");

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
      return show && !group?.hidden;
    };

    return (
      <TransitionGroup open={isOpen}>
        <Portal asChild>
          <ModalLayer asChild>
            <PopperContent align={align} asChild side={side} sideOffset={5}>
              <MenuListbox
                asChild
                maxH="sm"
                minW="trigger"
                provider="popper"
                size={size}
                {...styles.content({}, className)}
                {...downshift.getMenuProps(
                  { ref, ...props },
                  { suppressRefError: !placed },
                )}
              >
                <ListboxItemized
                  highlightedItem={highlightedItem}
                  items={items}
                  loading={loading}
                  onPlacedChange={setPlaced}
                  placed={placed}
                >
                  {children ??
                    ((item: SelectOption) => {
                      const group = item.group;
                      return (
                        <>
                          {shouldShowSeparator(group) && <ListboxSeparator />}
                          {shouldShowGroup(group) && (
                            <ListboxLabel>{group.label}</ListboxLabel>
                          )}
                          <SelectRadioItem
                            addonBefore={item.addon}
                            aria-label={item["aria-label"]}
                            description={item.description}
                            item={item}
                            key={item.value}
                          >
                            {item.label}
                          </SelectRadioItem>
                        </>
                      );
                    })}
                </ListboxItemized>
              </MenuListbox>
            </PopperContent>
          </ModalLayer>
        </Portal>
      </TransitionGroup>
    );
  },
);

SelectContent.displayName = "@optiaxiom/react/SelectContent";
