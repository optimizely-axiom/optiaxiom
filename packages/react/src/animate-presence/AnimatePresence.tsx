import { AnimatePresence as MotionAnimatePresence } from "framer-motion";
import { type ReactElement } from "react";

import { TransitionGlobalConfig } from "../transition";

export function AnimatePresence({
  children,
}: {
  children?: false | ReactElement;
}) {
  if (TransitionGlobalConfig.skipAnimations) {
    return children;
  }

  return <MotionAnimatePresence>{children}</MotionAnimatePresence>;
}

AnimatePresence.displayName = "@optiaxiom/react/AnimatePresence";
