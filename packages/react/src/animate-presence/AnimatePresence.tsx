import {
  type ReactElement,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { PresenceContext } from "./PresenceContext";

export function AnimatePresence({
  children,
}: {
  children?: ReactElement | false;
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
    if (!isPresent && [...exiting.values()].some(Boolean)) {
      lastChildren.current = false;
    }
  }, [exiting, isPresent]);

  return (
    <PresenceContext.Provider value={{ isPresent, onExitComplete, register }}>
      {children ||
        ([...exiting.values()].some(Boolean) ? lastChildren.current : null)}
    </PresenceContext.Provider>
  );
}

AnimatePresence.displayName = "@optiaxiom/react/AnimatePresence";
