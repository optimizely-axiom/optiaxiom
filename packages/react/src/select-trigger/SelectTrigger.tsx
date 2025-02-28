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
import { useFieldContext } from "../field-context";
import { useSelectContext } from "../select-context";

type SelectTriggerProps = ButtonProps<typeof PopperAnchor>;

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (
    {
      "aria-labelledby": ariaLabelledBy,
      asChild,
      children,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const { disabled, downshift, isOpen } = useSelectContext("SelectTrigger");
    const { boxProps, restProps } = extractBoxProps(props);

    const { labelId = ariaLabelledBy } = useFieldContext();
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
            children
          ) : (
            <AngleMenuButton ref={buttonRef}>{children}</AngleMenuButton>
          )}
        </Slot>
      </PopperAnchor>
    );
  },
);

SelectTrigger.displayName = "@optiaxiom/react/SelectTrigger";
