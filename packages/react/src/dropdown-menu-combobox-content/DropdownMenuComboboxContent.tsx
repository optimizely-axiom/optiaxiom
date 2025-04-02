import { useComposedRefs } from "@radix-ui/react-compose-refs";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
} from "react";

import { useDropdownMenuComboboxContext } from "../dropdown-menu-combobox-context";
import { DropdownMenuComboboxInput } from "../dropdown-menu-combobox-input";
import { DropdownMenuComboboxListbox } from "../dropdown-menu-combobox-listbox";
import { DropdownMenuSubContent } from "../dropdown-menu-sub-content";
import { useDropdownMenuSubContext } from "../dropdown-menu-sub-context";

type DropdownMenuComboboxContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenuSubContent
>;

export const DropdownMenuComboboxContent = forwardRef<
  HTMLDivElement,
  DropdownMenuComboboxContentProps
>(({ children, onMouseMove, ...props }, outerRef) => {
  const { presence } = useDropdownMenuSubContext(
    "@optiaxiom/react/DropdownMenuComboboxContent",
  );
  const { inputRef } = useDropdownMenuComboboxContext(
    "@optiaxiom/react/DropdownMenuComboboxContent",
  );

  const innerRef = useRef<HTMLDivElement>(null);
  const ref = useComposedRefs(innerRef, outerRef);
  useEffect(() => {
    const container = innerRef.current;
    if (!container || !presence) {
      return;
    }

    const listener = () => inputRef.current?.focus();
    container.addEventListener("focus", listener);
    return () => container.removeEventListener("focus", listener);
  }, [inputRef, presence]);

  return (
    <DropdownMenuSubContent
      onMouseMove={(event) => {
        onMouseMove?.(event);
        inputRef.current?.focus();
      }}
      ref={ref}
      role="dialog"
      {...props}
    >
      {children ?? (
        <>
          <DropdownMenuComboboxInput placeholder="Search..." />
          <DropdownMenuComboboxListbox />
        </>
      )}
    </DropdownMenuSubContent>
  );
});

DropdownMenuComboboxContent.displayName =
  "@optiaxiom/react/DropdownMenuComboboxContent";
