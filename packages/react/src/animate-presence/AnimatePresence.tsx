import {
  type ReactElement,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { TransitionGlobalConfig } from "../transition";
import { PresenceContext } from "../use-presence";

export function AnimatePresence({
  children,
}: {
  children?: false | ReactElement;
}) {
  const [exiting, setExiting] = useState<Map<RefObject<undefined>, boolean>>(
    new Map(),
  );
  const lastChildren = useRef(children);
  if (children) {
    lastChildren.current = children;
  }

  const isPresent = !!children;
  const onExitComplete = useCallback((id: RefObject<undefined>) => {
    setExiting((state) => {
      state.delete(id);
      return new Map(state.entries());
    });
  }, []);
  const register = useCallback((id: RefObject<undefined>) => {
    setExiting((state) => {
      state.set(id, true);
      return new Map(state.entries());
    });
  }, []);

  useEffect(() => {
    if (!isPresent && exiting.size === 0) {
      lastChildren.current = false;
    }
  }, [exiting, isPresent]);

  if (TransitionGlobalConfig.skipAnimations) {
    return children;
  }

  return (
    <PresenceContext.Provider value={{ isPresent, onExitComplete, register }}>
      {children ||
        ([...exiting.values()].some(Boolean) ? lastChildren.current : null)}
    </PresenceContext.Provider>
  );
}

AnimatePresence.displayName = "@optiaxiom/react/AnimatePresence";
