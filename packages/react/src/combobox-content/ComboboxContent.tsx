import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { DialogContent } from "../dialog-content";
import type { PopoverContent } from "../popover-content";
import type { ExcludeProps } from "../utils";

import { useComboboxContext } from "../combobox-context";
import { ComboboxDialogContent } from "../combobox-dialog-content";
import { ComboboxInput } from "../combobox-input";
import { ComboboxListbox } from "../combobox-listbox";
import { ComboboxPopoverContent } from "../combobox-popover-content";
import { useCommandContext } from "../command-context";
import { useFieldContext } from "../field-context";
import { VisuallyHidden } from "../visually-hidden";

type ComboboxContentProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof DialogContent> &
    ComponentPropsWithoutRef<typeof PopoverContent>,
  "minW" | "size" | "transitionType" | "withArrow"
>;

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  ({ children, ...props }, ref) => {
    const { labelId } = useFieldContext();
    const { defaultInputVisible, open, placeholder, size } = useComboboxContext(
      "@optiaxiom/react/ComboboxContent",
    );
    const { empty, inputValue, items, loading } = useCommandContext(
      "@optiaxiom/react/ComboboxContent",
    );
    const Comp = size === "sm" ? ComboboxPopoverContent : ComboboxDialogContent;

    const hasSelectableItem = useMemo(
      () => items.some((item) => "selected" in item),
      [items],
    );
    const inputDefaultVisibleRef = useRef(hasSelectableItem);
    inputDefaultVisibleRef.current = hasSelectableItem || defaultInputVisible;

    const [inputVisible, setInputVisible] = useState(
      inputDefaultVisibleRef.current,
    );
    useEffect(() => {
      if (inputValue) {
        setInputVisible(true);
      }
    }, [inputValue]);
    useEffect(() => {
      if (open) {
        setInputVisible(inputDefaultVisibleRef.current);
      }
    }, [open]);

    return (
      <Comp
        aria-labelledby={labelId}
        overflow="hidden"
        p={size === "sm" ? "4" : "0"}
        ref={ref}
        {...props}
      >
        <VisuallyHidden disabled={inputVisible}>
          <ComboboxInput placeholder={placeholder} />
        </VisuallyHidden>
        <ComboboxListbox
          empty={empty}
          loading={loading}
          p={size === "lg" ? "6" : "0"}
        >
          {children}
        </ComboboxListbox>
      </Comp>
    );
  },
);

ComboboxContent.displayName = "@optiaxiom/react/ComboboxContent";
