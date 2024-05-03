import clsx from "clsx";

import { mapValues } from "../utils";
import * as styles from "./sprinkles.css";

export const sprinkles = Object.assign(
  (props: Sprinkles) => {
    const baseProps: styles.SprinklesBase = {};
    const selectorsProps: styles.SprinklesSelectors = mapValues(
      styles.sx.selectors,
      () => ({}),
    );

    for (const [name, value] of Object.entries(props)) {
      if (name in styles.sx.selectors) {
        selectorsProps[name as keyof typeof styles.sx.selectors] =
          value as never;
      } else {
        // @ts-expect-error -- too complex
        baseProps[name] = value;
      }
    }

    return clsx(
      styles.sx.base(baseProps),
      ...Object.values(
        mapValues(selectorsProps, (props, name) =>
          styles.sx.selectors[name](props),
        ),
      ),
    );
  },
  { properties: styles.sx.base.properties },
);

export { mapResponsiveValue } from "./sprinkles.css";
export type Sprinkles = Partial<styles.SprinklesSelectors> &
  styles.SprinklesBase;
