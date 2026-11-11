import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useMemo,
  useRef,
} from "react";

import { VisuallyHidden } from "../visually-hidden";
import { useSelectContext } from "./SelectContext";

export const SelectHiddenSelect = forwardRef<
  HTMLSelectElement,
  ComponentPropsWithoutRef<"select">
>(({ defaultValue, disabled, name, onChange, required, value }, ref) => {
  const { items, triggerRef } = useSelectContext(
    "@optiaxiom/react/SelectHiddenSelect",
  );
  const hiddenRef = useRef<HTMLSpanElement>(null);

  const options = useMemo(
    () =>
      items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.value}
        </option>
      )),
    [items],
  );

  return (
    <VisuallyHidden aria-hidden ref={hiddenRef}>
      <select
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        onChange={onChange}
        /**
         * Form validation and `ref.focus()` focus this hidden select. Hand
         * focus to the trigger, which scrolls it into view, then move the
         * hidden select onto the trigger's bottom edge: the browser draws its
         * validation message here right after focusing it.
         *
         * Not CSS anchor positioning: it counts the box at the trigger's
         * unscrolled position, which stretches a dialog whose scrolling list
         * holds the Select. Mutated directly because the message is drawn
         * before React would commit a state update.
         */
        onFocus={() => {
          const hidden = hiddenRef.current;
          const trigger = triggerRef.current;
          if (!hidden || !trigger) {
            return;
          }

          trigger.focus();
          hidden.style.left = "0";
          hidden.style.top = "0";
          const corner = hidden.getBoundingClientRect();
          const target = trigger.getBoundingClientRect();
          /**
           * Rects are in viewport pixels; `left`/`top` are in the containing
           * block's, which differ under a scaled ancestor.
           */
          const scale = corner.width / hidden.offsetWidth || 1;
          hidden.style.left = `${(target.left - corner.left) / scale}px`;
          hidden.style.top = `${(target.bottom - corner.bottom) / scale}px`;
          trigger.addEventListener(
            "blur",
            () => {
              hidden.style.left = "0";
              hidden.style.top = "0";
            },
            { once: true },
          );
        }}
        ref={ref}
        required={required}
        tabIndex={-1}
        value={value}
      >
        <option value=""></option>
        {options}
      </select>
    </VisuallyHidden>
  );
});

SelectHiddenSelect.displayName = "@optiaxiom/react/SelectHiddenSelect";
