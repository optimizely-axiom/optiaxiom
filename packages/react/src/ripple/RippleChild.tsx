import clsx from "clsx";
import { type CSSProperties, type ComponentPropsWithRef } from "react";

import type { ExtendProps } from "../utils";

import * as styles from "./RippleChild.css";

type RippleChildProps = ExtendProps<
  ComponentPropsWithRef<"span">,
  {
    isPresent: boolean;
    safeToRemove: () => void;
    style: CSSProperties;
  }
>;

export const RippleChild = ({
  isPresent,
  safeToRemove,
  style,
  ...props
}: RippleChildProps) => {
  return (
    <span
      className={clsx(styles.base, !isPresent && styles.exit)}
      onAnimationEnd={() => {
        return !isPresent && safeToRemove();
      }}
      style={style}
      {...props}
    />
  );
};

RippleChild.displayName = "@optiaxiom/react/RippleChild";
