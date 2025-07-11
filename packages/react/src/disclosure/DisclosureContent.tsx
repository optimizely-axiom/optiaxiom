import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, useEffect, useRef, useState } from "react";

import type { ExcludeProps } from "../utils";

import { Box, type BoxProps } from "../box";
import { Transition, TransitionGroup } from "../transition";
import * as styles from "./DisclosureContent.css";
import { useDisclosureContext } from "./DisclosureContext";

export type DisclosureContentProps = ExcludeProps<
  BoxProps<
    typeof RadixCollapsible.Content,
    {
      /**
       * Enable this to always keep content present in DOM and visually hidden
       * when collapsed.
       */
      hiddenUntilFound?: boolean;
    }
  >,
  "forceMount"
>;

export const DisclosureContent = forwardRef<
  HTMLDivElement,
  DisclosureContentProps
>(({ children, hiddenUntilFound, ...props }, outerRef) => {
  const { open, setOpen } = useDisclosureContext(
    "@optiaxiom/react/DisclosureContent",
  );

  const [skipAnimations, setSkipAnimations] = useState(Boolean(open));
  useEffect(() => {
    if (skipAnimations) {
      requestAnimationFrame(() => setSkipAnimations(false));
    }
  }, [skipAnimations]);

  const innerRef = useRef<HTMLDivElement>(null);
  const ref = useComposedRefs(innerRef, outerRef);
  useEffect(() => {
    if (
      !innerRef.current ||
      !("onbeforematch" in innerRef.current) ||
      !hiddenUntilFound
    ) {
      return;
    }

    const element = innerRef.current;
    const listener = () => setOpen(true);
    element.addEventListener("beforematch", listener);
    return () => element.removeEventListener("beforematch", listener);
  }, [hiddenUntilFound, setOpen]);
  const [presence, setPresence] = useState(false);
  useEffect(() => {
    if (
      !innerRef.current ||
      !("onbeforematch" in innerRef.current) ||
      !hiddenUntilFound
    ) {
      return;
    }

    if (open || presence) {
      innerRef.current.removeAttribute("hidden");
    } else {
      innerRef.current.setAttribute("hidden", "until-found");
    }
  }, [open, hiddenUntilFound, presence]);

  return (
    <TransitionGroup
      forceMount={hiddenUntilFound}
      onPresenceChange={setPresence}
      open={open}
    >
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
