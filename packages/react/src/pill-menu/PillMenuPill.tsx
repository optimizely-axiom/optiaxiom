import { forwardRef, useRef } from "react";

import {
  type CommandOption,
  resolveItemProperty,
  useCommandContext,
} from "../command/internals";
import { useMenuContext } from "../menu/internals";
import { Pill, type PillProps } from "../pill";
import { Tooltip } from "../tooltip";
import { usePillMenuContext } from "./PillMenuContext";

export type PillMenuPillProps = PillProps & {
  /**
   * The exact item object from the collection.
   */
  item: CommandOption;
  /**
   * Whether the pill is interactive or not.
   */
  readOnly?: boolean;
};

export const PillMenuPill = forwardRef<HTMLButtonElement, PillMenuPillProps>(
  ({ item, onKeyDown, readOnly, ...props }, ref) => {
    const { value: options } = usePillMenuContext(
      "@optiaxiom/react/PillMenuPill",
    );
    const { open, setOpen } = useMenuContext("@optiaxiom/react/PillMenuPill");
    const { inputValue } = useCommandContext("@optiaxiom/react/PillMenuPill");

    const index = options.indexOf(item);
    const hasInteractedInsideRef = useRef(false);

    return (
      <Tooltip content={resolveItemProperty(item.disabledReason)}>
        <Pill
          onClick={() => {
            if (hasInteractedInsideRef.current) {
              hasInteractedInsideRef.current = false;
              return;
            }

            setOpen(!open);
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace") {
              /**
               * The last item is always tied to the trigger to look nicer
               * visually. So we skip shifting focus when deleting the last item
               * unless it's the only item as radix will automatically move focus
               * back to last available item.
               */
              if (resolveItemProperty(item.disabledReason)) {
                return;
              }

              if (index === 0 || index !== options.length - 1) {
                event.key = index > 0 ? "ArrowLeft" : "ArrowRight";
              }

              item.execute?.({ dismiss: false, inputValue });
            } else if (event.key === "ArrowDown") {
              setOpen(!open);
            }
            onKeyDown?.(event);
          }}
          onPointerDown={() => {
            hasInteractedInsideRef.current = Boolean(open);
          }}
          readOnly={readOnly}
          ref={ref}
          {...props}
        >
          {resolveItemProperty(item.label, { inputValue })}
        </Pill>
      </Tooltip>
    );
  },
);

PillMenuPill.displayName = "@optiaxiom/react/PillMenuPill";
