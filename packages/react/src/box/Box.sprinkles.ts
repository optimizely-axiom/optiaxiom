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
    styles.sx.selectors,
    () => ({}),
  );
  const restProps: Record<string, unknown> = {};

  for (const [name, value] of Object.entries(props)) {
    if (styles.sx.base.properties.has(name as never)) {
      // @ts-expect-error -- too complex
      baseProps[name] = value;
    } else {
      restProps[name] = value;
    }
  }

  for (const [name, value] of Object.entries(sx)) {
    if (name in styles.sx.selectors) {
      selectorsProps[name as keyof typeof styles.sx.selectors] = value as never;
    } else {
      // @ts-expect-error -- too complex
      baseProps[name] = value;
    }
  }

  return {
    className: clsx(
      className,
      styles.sx.base(baseProps),
      ...Object.values(
        mapValues(selectorsProps, (props, name) =>
          styles.sx.selectors[name](props),
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
