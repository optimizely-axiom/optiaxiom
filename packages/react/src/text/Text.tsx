import clsx from "clsx";
import "inter-ui/inter-variable.css";
import { type ComponentPropsWithRef, type ElementType } from "react";

import { Box } from "../box";
import { forwardRef } from "../forwardRef";
import { type Sprinkles } from "../styles";
import * as styles from "./Text.css";

type TextProps<T extends ElementType = "p"> = Omit<
  ComponentPropsWithRef<typeof Box<T>>,
  "size"
> & {
  size?: Sprinkles["fontSize"];
};

export const Text = forwardRef(
  <T extends ElementType = "p">(
    { as, className, size: sizeProp, ...props }: TextProps<T>,
    ref: ComponentPropsWithRef<T>["ref"],
  ) => {
    const size = sizeProp ?? "md";

    return (
      <Box
        as={as ?? "p"}
        className={clsx(className, styles.base)}
        fontSize={size}
        lineHeight={size}
        ref={ref}
        {...props}
      />
    );
  },
);
