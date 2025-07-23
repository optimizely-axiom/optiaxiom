import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixRovingFocus from "@radix-ui/react-roving-focus";
import { forwardRef, useRef } from "react";

import type { BoxProps } from "../box";

import { resolveItemProperty, useCommandContext } from "../command/internals";
import { useMenuContext } from "../menu/internals";
import { PillGroup } from "../pill";
import { PopoverAnchor } from "../popover";
import { usePillMenuContext } from "./PillMenuContext";
import { PillMenuPill } from "./PillMenuPill";

export type PillMenuImplProps = BoxProps<"div">;

export const PillMenuImpl = forwardRef<HTMLDivElement, PillMenuImplProps>(
  ({ children, ...props }, outerRef) => {
    const { options } = usePillMenuContext("@optiaxiom/react/PillMenuImpl");
    const { size } = useMenuContext("@optiaxiom/react/PillMenuImpl");
    const { inputValue } = useCommandContext("@optiaxiom/react/PillMenuImpl");

    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    return (
      <>
        <PillGroup asChild ref={ref} role="toolbar" {...props}>
          <RadixRovingFocus.Root orientation="horizontal">
            {options.slice(0, -1).map((item) => (
              <RadixRovingFocus.Item
                asChild
                key={
                  item.key ?? resolveItemProperty(item.label, { inputValue })
                }
              >
                <PillMenuPill item={item} />
              </RadixRovingFocus.Item>
            ))}
            <PillGroup>
              {options.length > 0 && (
                <RadixRovingFocus.Item asChild key="pill">
                  <PillMenuPill item={options[options.length - 1]} />
                </RadixRovingFocus.Item>
              )}
              {children}
            </PillGroup>
          </RadixRovingFocus.Root>
        </PillGroup>
        {size === "sm" && <PopoverAnchor staticRef={innerRef} />}
      </>
    );
  },
);

PillMenuImpl.displayName = "@optiaxiom/react/PillMenuImpl";
