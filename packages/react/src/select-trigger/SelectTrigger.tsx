import { PopperAnchor } from "@radix-ui/react-popper";
import { Slot } from "@radix-ui/react-slot";
import {
  forwardRef,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { type ButtonProps } from "../button";
import { useFieldContext } from "../field-context";
import { MenuButton } from "../menu-button";
import { useSelectContext } from "../select-context";

type SelectTriggerProps = ButtonProps<typeof PopperAnchor>;

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ asChild, children, onKeyDown, ...props }, ref) => {
    const { disabled, downshift, isOpen } = useSelectContext("SelectTrigger");

    const { labelId } = useFieldContext();
    const buttonRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
      if (!labelId || !buttonRef.current) {
        return;
      }

      const button = buttonRef.current;
      const label = document.getElementById(labelId);
      if (!label) {
        return;
      }

      const onLabelClick = () => button.focus();
      label.addEventListener("click", onLabelClick);
      return () => label.removeEventListener("click", onLabelClick);
    }, [labelId]);

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

    return (
      <PopperAnchor
        asChild
        {...props}
        {...downshift.getToggleButtonProps({
          disabled,
          onKeyDown: (event) => {
            onKeyDown?.(event as KeyboardEvent<HTMLDivElement>);
            document.dispatchEvent(new Event("tooltip.open"));
          },
        })}
      >
        <Slot ref={ref}>
          {asChild ? (
            children
          ) : (
            <MenuButton aria-labelledby={labelId} ref={buttonRef}>
              {children}
            </MenuButton>
          )}
        </Slot>
      </PopperAnchor>
    );
  },
);

SelectTrigger.displayName = "@optiaxiom/react/SelectTrigger";
