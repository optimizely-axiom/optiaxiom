import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ReactElement,
  type RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";

import { TransitionGlobalConfig } from "./TransitionGlobalConfig";
import { TransitionGroupContext } from "./TransitionGroupContext";
import { waitForAnimation } from "./waitForAnimation";

export function TransitionGroup({
  children,
  onPresenceChange,
  open,
  presence: presenceProp,
}: {
  children?: false | ReactElement;
  onPresenceChange?: (presence: boolean) => void;
  open?: boolean;
  presence?: boolean;
}) {
  const [transitions, setTransitions] = useState<Array<RefObject<HTMLElement>>>(
    [],
  );
  const onMount = useCallback((ref: RefObject<HTMLElement>) => {
    setTransitions((transitions) => [...transitions, ref]);
  }, []);
  const onUnmount = useCallback((ref: RefObject<HTMLElement>) => {
    setTransitions((transitions) =>
      transitions.filter((transition) => transition !== ref),
    );
  }, []);

  const [presence, setPresence] = useControllableState({
    onChange: onPresenceChange,
    prop: presenceProp,
  });
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        if (transitions.length) {
          void waitForAnimation(transitions).then(() => setPresence(true));
        } else {
          setPresence(true);
        }
      }, 10);
      return () => clearTimeout(timer);
    } else {
      if (transitions.length) {
        void waitForAnimation(transitions).then(() => setPresence(false));
      } else {
        setPresence(false);
      }
      return;
    }
  }, [open, setPresence, transitions]);

  if (TransitionGlobalConfig.skipAnimations) {
    return <>{open && children}</>;
  }

  return (
    <TransitionGroupContext.Provider
      value={{ onMount, onUnmount, open, presence }}
    >
      {(open || presence) && children}
    </TransitionGroupContext.Provider>
  );
}

TransitionGroup.displayName = "@optiaxiom/react/TransitionGroup";
