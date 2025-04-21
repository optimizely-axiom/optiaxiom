import * as RadixCollapsible from "@radix-ui/react-collapsible";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useState,
} from "react";

import type { ExcludeProps } from "../utils";

import { Box, type BoxProps } from "../box";
import { Transition, TransitionGroup } from "../transition";
import * as styles from "./DisclosureContent.css";
import { useDisclosureContext } from "./DisclosureContext";

type DisclosureContentProps = ExcludeProps<
  BoxProps<
    typeof RadixCollapsible.Content,
    {
      transitionType?: ComponentPropsWithoutRef<typeof Transition>["type"];
    }
  >,
  "forceMount"
>;

export const DisclosureContent = forwardRef<
  HTMLDivElement,
  DisclosureContentProps
>(({ children, transitionType = "slide", ...props }, ref) => {
  const { open } = useDisclosureContext("@optiaxiom/react/DisclosureContent");

  const [skipAnimations, setSkipAnimations] = useState(Boolean(open));
  useEffect(() => {
    if (skipAnimations) {
      requestAnimationFrame(() => setSkipAnimations(false));
    }
  }, [skipAnimations]);

  return (
    <TransitionGroup open={open}>
      <Transition
        data-side="bottom"
        skipAnimations={skipAnimations}
        type={transitionType}
      >
        <Box {...styles.outer()}>
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
