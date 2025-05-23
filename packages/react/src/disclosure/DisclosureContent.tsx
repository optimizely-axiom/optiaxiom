import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { forwardRef, useEffect, useState } from "react";

import type { ExcludeProps } from "../utils";

import { Box, type BoxProps } from "../box";
import { Transition, TransitionGroup } from "../transition";
import * as styles from "./DisclosureContent.css";
import { useDisclosureContext } from "./DisclosureContext";

export type DisclosureContentProps = ExcludeProps<
  BoxProps<typeof RadixCollapsible.Content>,
  "forceMount"
>;

export const DisclosureContent = forwardRef<
  HTMLDivElement,
  DisclosureContentProps
>(({ children, ...props }, ref) => {
  const { open } = useDisclosureContext("@optiaxiom/react/DisclosureContent");

  const [skipAnimations, setSkipAnimations] = useState(Boolean(open));
  useEffect(() => {
    if (skipAnimations) {
      requestAnimationFrame(() => setSkipAnimations(false));
    }
  }, [skipAnimations]);

  return (
    <TransitionGroup open={open}>
      <Transition data-side="bottom" skipAnimations={skipAnimations} type="pop">
        <Box
          {...styles.outer({
            scale: Boolean(
              "data-transition-scale" in props &&
                props["data-transition-scale"],
            ),
          })}
        >
          <Box asChild {...styles.inner()}>
            <RadixCollapsible.Content forceMount>
              <Box pb="8" pt="4" ref={ref} {...props}>
                {children}
              </Box>
            </RadixCollapsible.Content>
          </Box>
        </Box>
      </Transition>
    </TransitionGroup>
  );
});

DisclosureContent.displayName = "@optiaxiom/react/DisclosureContent";
