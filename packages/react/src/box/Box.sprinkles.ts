import clsx from "clsx";

import { mapValues } from "../utils";
import * as styles from "./Box.css";

export const sprinkles = ({
  className,
  sx = {},
  ...props
}: { className?: string } & Sprinkles) => {
  const baseProps: styles.SprinklesBase = {};
  const selectorsProps: styles.SprinklesSelectors = mapValues(
    styles.sprinkles.selectors,
    () => ({}),
  );
  const restProps: Record<string, unknown> = {};

  for (const [name, value] of Object.entries(props)) {
    if (styles.sprinkles.base.properties.has(name as never)) {
      // @ts-expect-error -- too complex
      baseProps[name] = value;
    } else {
      restProps[name] = value;
    }
  }

  for (const [name, value] of Object.entries(sx)) {
    if (name in styles.sprinkles.selectors) {
      selectorsProps[name as keyof typeof styles.sprinkles.selectors] =
        value as never;
    } else {
      // @ts-expect-error -- too complex
      baseProps[name] = value;
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

export type Sprinkles = {
  sx?: Partial<styles.SprinklesSelectors> & styles.SprinklesBase;
} & styles.SprinklesBase;
export type { SprinklesBase } from "./Box.css";
