import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { forwardRef, useContext } from "react";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { HoverCardContext } from "../hover-card-context";
import { theme } from "../styles";
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
      align = "start",
      children,
      className,
      sideOffset = 2,
      withArrow,
      ...props
    },
    ref,
  ) => {
    const { open } = useContext(HoverCardContext);

    return (
      <AnimatePresence>
        {open && (
          <RadixHoverCard.Portal>
            <Transition duration="sm" type="pop">
              <Box asChild {...styles.content({}, className)} {...props}>
                <RadixHoverCard.Content
                  align={align}
                  ref={ref}
                  sideOffset={sideOffset}
                >
                  {children}

                  {withArrow && (
                    <RadixHoverCard.Arrow asChild>
                      <svg
                        fill={theme.colors["surface"]}
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
              </Box>
            </Transition>
          </RadixHoverCard.Portal>
        )}
      </AnimatePresence>
    );
  },
);

HoverCardContent.displayName = "@optiaxiom/react/HoverCardContent";
