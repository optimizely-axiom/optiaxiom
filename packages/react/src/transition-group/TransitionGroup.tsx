import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ReactElement,
  type RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";

import { TransitionGlobalConfig } from "../transition";
import { TransitionGroupContext } from "../transition-group-context";

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
      setPresence(true);
    } else {
      if (transitions.length) {
        void Promise.allSettled(
          transitions.flatMap<Promise<unknown>>((ref) =>
            typeof ref.current?.getAnimations === "function"
              ? ref.current
                  ?.getAnimations()
                  .map((animation) => animation.finished)
              : [Promise.resolve()],
          ),
        ).then(() => setPresence(false));
      } else {
        setPresence(false);
      }
    }
  }, [open, setPresence, transitions]);

  if (TransitionGlobalConfig.skipAnimations) {
    return <>{open && children}</>;
  }

  return (
    <TransitionGroupContext.Provider value={{ onMount, onUnmount, open }}>
      {(open || presence) && children}
    </TransitionGroupContext.Provider>
  );
}

TransitionGroup.displayName = "@optiaxiom/react/TransitionGroup";
