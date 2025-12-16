import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, useRef } from "react";

import { Box, type BoxProps } from "../box";
import { resolveItemProperty, useCommandContext } from "../command/internals";
import { Cover } from "../cover";
import { IconPlus } from "../icons/IconPlus";
import { MenuTrigger } from "../menu";
import { useMenuContext } from "../menu/internals";
import { PillGroup } from "../pill";
import { PopoverAnchor } from "../popover";
import { RovingFocusGroup, RovingFocusItem } from "../roving-focus";
import { usePillMenuContext } from "./PillMenuContext";
import { PillMenuPill } from "./PillMenuPill";
import * as styles from "./PillMenuTrigger.css";

export type PillMenuTriggerProps = BoxProps<
  "div",
  styles.RootVariants & {
    /**
     * Whether the button is disabled.
     */
    readOnly?: boolean;
  }
>;

const remapSize = {
  md: "xs",
  lg: "sm",
} as const;

export const PillMenuTrigger = forwardRef<HTMLDivElement, PillMenuTriggerProps>(
  ({ children, className, readOnly, size = "md", ...props }, outerRef) => {
    const { value } = usePillMenuContext("@optiaxiom/react/PillMenuTrigger");
    const { size: menuSize } = useMenuContext(
      "@optiaxiom/react/PillMenuTrigger",
    );
    const { inputValue } = useCommandContext(
      "@optiaxiom/react/PillMenuTrigger",
    );

    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    return (
      <Box {...styles.wrapper()}>
        <PillGroup
          asChild
          data-readonly={readOnly}
          ref={ref}
          role="toolbar"
          {...styles.root({ size }, className)}
          {...props}
        >
          <RovingFocusGroup disabled={readOnly} loop orientation="horizontal">
            {value.slice(0, -1).map((item) => (
              <RovingFocusItem
                asChild
                key={
                  item.key ?? resolveItemProperty(item.label, { inputValue })
                }
              >
                <PillMenuPill
                  item={item}
                  readOnly={readOnly}
                  size={remapSize[size]}
                />
              </RovingFocusItem>
            ))}
            <PillGroup>
              {value.length > 0 && (
                <RovingFocusItem asChild key="pill">
                  <PillMenuPill
                    item={value[value.length - 1]}
                    readOnly={readOnly}
                    size={remapSize[size]}
                  />
                </RovingFocusItem>
              )}
              {!readOnly && (
                <RovingFocusItem asChild key="trigger">
                  <MenuTrigger
                    aria-label={
                      props["aria-label"] ??
                      (typeof children === "string" ? children : undefined)
                    }
                    asChild
                    onKeyDown={(event) => {
                      if (event.defaultPrevented) {
                        return;
                      }

                      if (event.key === "Backspace") {
                        if (value.length) {
                          const last = value.length - 1;

                          if (
                            !resolveItemProperty(value[last].disabledReason)
                          ) {
                            value[last].execute?.({
                              dismiss: false,
                              inputValue,
                            });
                          }
                        }
                      }
                    }}
                  >
                    <Cover asChild>
                      <Box asChild size={remapSize[size]} {...styles.trigger()}>
                        <button>
                          <IconPlus />
                        </button>
                      </Box>
                    </Cover>
                  </MenuTrigger>
                </RovingFocusItem>
              )}
            </PillGroup>
          </RovingFocusGroup>
        </PillGroup>
        {menuSize === "sm" && <PopoverAnchor staticRef={innerRef} />}
      </Box>
    );
  },
);

PillMenuTrigger.displayName = "@optiaxiom/react/PillMenuTrigger";
