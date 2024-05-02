import clsx from "clsx";
import { type CSSProperties } from "react";

import * as styles from "./RippleChild.css";
export const RippleChild = ({
  isPresent,
  safeToRemove,
  style,
}: {
  isPresent: boolean;
  safeToRemove: () => void;
  style: CSSProperties;
}) => {
  return (
    <span
      className={clsx(styles.base, !isPresent && styles.exit)}
      onTransitionEnd={() => {
        return !isPresent && safeToRemove();
      }}
      style={style}
    />
  );
};

RippleChild.displayName = "@optiaxiom/react/RippleChild";
