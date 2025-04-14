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
import { ModalLayer } from "../modal-layer";
import { OverlayListbox } from "../overlay-listbox";
import {
  type Group,
  type SelectOption,
  useSelectContext,
} from "../select-context";
import { SelectRadioItem } from "../select-radio-item";
import { TransitionGroup } from "../transition-group";

type SelectContentProps = ExcludeProps<
  BoxProps<
    typeof PopperContent,
    Pick<ComponentPropsWithoutRef<typeof OverlayListbox>, "maxH" | "minW"> & {
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
  ({ align = "start", children, side = "bottom", size, ...props }, ref) => {
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
            <OverlayListbox
              asChild
              maxH="sm"
              minW="trigger"
              provider="popper"
              ref={ref}
              role="dialog"
              size={size}
              {...props}
            >
              <PopperContent align={align} side={side} sideOffset={5}>
                <ListboxItemized
                  highlightedItem={highlightedItem}
                  items={items}
                  itemToKey={(item: SelectOption) => item.value}
                  loading={loading}
                  onPlacedChange={setPlaced}
                  placed={placed}
                  {...downshift.getMenuProps({}, { suppressRefError: !placed })}
                >
                  {children ??
                    ((item: SelectOption, index) => {
                      if (index === 0) {
                        isFirstItem = true;
                        lastGroup = undefined;
                      }

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
              </PopperContent>
            </OverlayListbox>
          </ModalLayer>
        </Portal>
      </TransitionGroup>
    );
  },
);

SelectContent.displayName = "@optiaxiom/react/SelectContent";
