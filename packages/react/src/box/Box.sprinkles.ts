import clsx from "clsx";

import { mapValues } from "../utils";
import * as styles from "./Box.css";

export const sprinkles = ({
  className,
  ...props
}: { className?: string } & Sprinkles) => {
  const baseProps: styles.SprinklesBase = {};
  const selectorsProps: styles.SprinklesSelectors = mapValues(
    styles.sprinkles.selectors,
    () => ({}),
  );
  const restProps: Record<string, unknown> = {};

  for (const [name, value] of Object.entries(props)) {
    if (name in styles.sprinkles.selectors) {
      selectorsProps[name as keyof typeof styles.sprinkles.selectors] =
        value as never;
    } else if (styles.sprinkles.base.properties.has(name as never)) {
      // @ts-expect-error -- too complex
      baseProps[name] = value;
    } else {
      restProps[name] = value;
    }
  }

  return {
    className: clsx(
      className,
      styles.sprinkles.base(baseProps),
      ...Object.values(
        mapValues(selectorsProps, (props, name) =>
          styles.sprinkles.selectors[name](props),
        ),
      ),
    ),
    ...restProps,
  };
};

export type Sprinkles = Partial<styles.SprinklesSelectors> &
  styles.SprinklesBase;
