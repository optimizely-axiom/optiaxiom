import { theme } from "@optiaxiom/globals";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { forwardRef, useRef } from "react";

import { AnimatePresence } from "../animate-presence";
import { type BoxProps } from "../box";
import { useHoverCardContext } from "../hover-card-context";
import { Paper } from "../paper";
import { Transition } from "../transition";
import * as styles from "./HoverCardContent.css";

type HoverCardContentProps = BoxProps<
  typeof RadixHoverCard.Content,
  {
    withArrow?: boolean;
  }
>;

export const HoverCardContent = forwardRef<
  HTMLDivElement,
  HoverCardContentProps
>(
  (
    {
      align = "center",
      children,
      className,
      sideOffset = 2,
      withArrow,
      ...props
    },
    outerRef,
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const { keepOpenOnActivation, open } =
      useHoverCardContext("HoverCardContent");

    return (
      <AnimatePresence>
        {open && (
          <RadixHoverCard.Portal>
            <Transition duration="sm" type="pop">
              <Paper asChild {...styles.content({}, className)} {...props}>
                <RadixHoverCard.Content
                  align={align}
                  onPointerDownOutside={
                    keepOpenOnActivation
                      ? (event: CustomEvent) => {
                          if (
                            innerRef.current?.contains(
                              event.target as Node | null,
                            )
                          )
                            event.preventDefault();
                        }
                      : undefined
                  }
                  ref={ref}
                  sideOffset={sideOffset}
                >
                  {children}

                  {withArrow && (
                    <RadixHoverCard.Arrow asChild>
                      <svg
                        fill={theme.colors["bg.default"]}
                        height={4}
                        preserveAspectRatio="none"
                        stroke={theme.colors["border.secondary"]}
                        viewBox="0 0 30 10"
                        width={8}
                      >
                        <polygon points="0,0 30,0 15,10" />
                        <polyline
                          points="0,0 15,10 30,0"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                        />
                      </svg>
                    </RadixHoverCard.Arrow>
                  )}
                </RadixHoverCard.Content>
              </Paper>
            </Transition>
          </RadixHoverCard.Portal>
        )}
      </AnimatePresence>
    );
  },
);

HoverCardContent.displayName = "@optiaxiom/react/HoverCardContent";
