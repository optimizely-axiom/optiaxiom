import { PopperAnchor } from "@radix-ui/react-popper";
import { Slot } from "@radix-ui/react-slot";
import {
  forwardRef,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { AngleMenuButton } from "../angle-menu-button";
import { extractBoxProps } from "../box";
import { type ButtonProps } from "../button";
import { useSelectContext } from "../select-context";
import { useFieldLabelTrigger } from "../use-field-label-trigger";
import { decorateChildren } from "../utils";

type SelectTriggerProps = ButtonProps<
  typeof PopperAnchor,
  {
    placeholder?: string;
  }
>;

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (
    {
      "aria-labelledby": ariaLabelledBy,
      asChild,
      children,
      onKeyDown,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const { disabled, downshift, isOpen, itemToLabel, selectedItem } =
      useSelectContext("@optiaxiom/react/SelectTrigger");
    const { boxProps, restProps } = extractBoxProps(props);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const labelId = useFieldLabelTrigger(buttonRef, ariaLabelledBy);

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

    const value = selectedItem ? itemToLabel(selectedItem) : placeholder;

    return (
      <PopperAnchor
        asChild
        {...boxProps}
        {...downshift.getToggleButtonProps({
          ...restProps,
          "aria-labelledby": labelId,
          disabled,
          onKeyDown: (event) => {
            onKeyDown?.(event as KeyboardEvent<HTMLDivElement>);
            document.dispatchEvent(new Event("tooltip.open"));
          },
        })}
      >
        <Slot ref={ref}>
          {asChild ? (
            decorateChildren(
              { asChild, children },
              (children) => children ?? value,
            )
          ) : (
            <AngleMenuButton ref={buttonRef}>
              {children ?? value}
            </AngleMenuButton>
          )}
        </Slot>
      </PopperAnchor>
    );
  },
);

SelectTrigger.displayName = "@optiaxiom/react/SelectTrigger";
