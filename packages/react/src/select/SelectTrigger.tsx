import { useId } from "@radix-ui/react-id";
import { PopperAnchor } from "@radix-ui/react-popper";
import { createSlot } from "@radix-ui/react-slot";
import clsx from "clsx";
import {
  type FocusEvent,
  forwardRef,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { AngleMenuButton } from "../angle-menu-button";
import { extractBoxProps } from "../box";
import { type ButtonProps } from "../button";
import { useFieldLabelTrigger } from "../hooks";
import { decorateChildren, type ExcludeProps } from "../utils";
import { useSelectContext } from "./SelectContext";

const Slot = createSlot("@optiaxiom/react/SelectTrigger");

export type SelectTriggerProps = ExcludeProps<
  ButtonProps<
    typeof PopperAnchor,
    {
      /**
       * The placeholder when there is no value.
       */
      placeholder?: string;
    }
  >,
  "disabled"
>;

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (
    {
      "aria-labelledby": ariaLabelledBy,
      asChild,
      children,
      onBlur: onBlurProp,
      onKeyDown,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const { disabled, downshift, isOpen, items, onBlur, selectedItem } =
      useSelectContext("@optiaxiom/react/SelectTrigger");
    const { boxProps, restProps } = extractBoxProps(props);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const labelId = useFieldLabelTrigger(buttonRef, ariaLabelledBy);
    const valueId = useId();

    // Focus the toggle button on first render if defaultOpen is enabled.
    const [focusOnOpen] = useState(isOpen);
    useEffect(
      function () {
        if (focusOnOpen && buttonRef.current) {
          buttonRef.current.focus();
        }
      },
      [focusOnOpen],
    );

    const value = selectedItem?.value
      ? selectedItem.label || placeholder
      : placeholder;

    return (
      <PopperAnchor
        asChild
        {...boxProps}
        {...downshift.getToggleButtonProps({
          ...restProps,
          "aria-labelledby": labelId ? clsx(labelId, valueId) : valueId,
          disabled,
          onBlur: (event) => {
            onBlurProp?.(event as FocusEvent<HTMLDivElement>);
            onBlur?.(event);
          },
          onKeyDown: (event) => {
            onKeyDown?.(event as KeyboardEvent<HTMLDivElement>);
            document.dispatchEvent(new Event("tooltip.open"));

            if (isOpen) {
              return;
            }

            const selectedItemIndex = downshift.selectedItem
              ? items.indexOf(downshift.selectedItem)
              : -1;
            switch (event.key) {
              case "ArrowLeft": {
                let prevItemIndex = selectedItemIndex;
                for (prevItemIndex--; prevItemIndex >= 0; prevItemIndex--) {
                  const item = items[prevItemIndex];
                  if (!item.disabledReason) {
                    break;
                  }
                }

                downshift.selectItem(items[Math.max(0, prevItemIndex)]);
                break;
              }
              case "ArrowRight": {
                let nextItemIndex = selectedItemIndex;
                for (
                  nextItemIndex++;
                  nextItemIndex < items.length;
                  nextItemIndex++
                ) {
                  const item = items[nextItemIndex];
                  if (!item.disabledReason) {
                    break;
                  }
                }

                downshift.selectItem(
                  items[Math.min(nextItemIndex, items.length - 1)],
                );
                break;
              }
            }
          },
          type: "button",
        })}
      >
        <Slot ref={ref}>
          {asChild ? (
            decorateChildren(
              { asChild, children },
              (children) =>
                (children ?? value) && (
                  <span id={valueId}>{children ?? value}</span>
                ),
            )
          ) : (
            <AngleMenuButton ref={buttonRef}>
              <span id={valueId}>{children ?? value}</span>
            </AngleMenuButton>
          )}
        </Slot>
      </PopperAnchor>
    );
  },
);

SelectTrigger.displayName = "@optiaxiom/react/SelectTrigger";
