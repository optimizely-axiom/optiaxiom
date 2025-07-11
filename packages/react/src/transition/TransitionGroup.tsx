import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { TransitionGlobalConfig } from "./TransitionGlobalConfig";
import {
  TransitionGroupProvider,
  useTransitionGroupContext,
} from "./TransitionGroupContext";
import { waitForAnimation } from "./waitForAnimation";

export function TransitionGroup({
  children,
  forceMount,
  onPresenceChange,
  open: openProp,
  presence: presenceProp,
}: {
  children?: ReactNode;
  forceMount?: boolean;
  onPresenceChange?: (presence: boolean) => void;
  open?: boolean;
  presence?: boolean;
}) {
  const [transitions, setTransitions] = useState<Array<RefObject<HTMLElement>>>(
    [],
  );
  const register = useCallback((ref: RefObject<HTMLElement>) => {
    setTransitions((transitions) => [...transitions, ref]);

    return () =>
      setTransitions((transitions) =>
        transitions.filter((transition) => transition !== ref),
      );
  }, []);

  const [presence, setPresence] = useControllableState({
    caller: "@optiaxiom/react/TransitionGroup",
    defaultProp: false,
    onChange: onPresenceChange,
    prop: presenceProp,
  });
  const { open: openParent } =
    useTransitionGroupContext("@optiaxiom/react/TransitionGroup") ?? {};
  const open = openParent === false ? openParent : openProp;
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

  const childrenRef = useRef(children);
  if (open) {
    childrenRef.current = children;
  }

  if (TransitionGlobalConfig.skipAnimations) {
    return <>{open && children}</>;
  }

  return (
    <TransitionGroupProvider
      open={open}
      presence={presence}
      register={register}
    >
      {(open || presence || forceMount) && childrenRef.current}
    </TransitionGroupProvider>
  );
}

TransitionGroup.displayName = "@optiaxiom/react/TransitionGroup";
