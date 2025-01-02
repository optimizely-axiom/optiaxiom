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
  open,
}: {
  children?: false | ReactElement;
  open?: boolean;
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

  const [connected, setConnected] = useState(false);
  useEffect(() => {
    if (open) {
      setConnected(true);
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
        ).then(() => setConnected(false));
      } else {
        setConnected(false);
      }
    }
  }, [open, transitions]);

  if (TransitionGlobalConfig.skipAnimations) {
    return open && children;
  }

  return (
    <TransitionGroupContext.Provider value={{ onMount, onUnmount, open }}>
      {(open || connected) && children}
    </TransitionGroupContext.Provider>
  );
}

TransitionGroup.displayName = "@optiaxiom/react/TransitionGroup";
