import clsx from "clsx";
import "inter-ui/inter-variable.css";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import * as styles from "./Paper.css";

type PaperProps = Omit<
  ComponentPropsWithRef<"p"> & ComponentPropsWithRef<typeof Box>,
  "size"
> & {
  shadow?: styles.Sprinkles["boxShadow"];
};

export const Paper = forwardRef<HTMLParagraphElement, PaperProps>(
  ({ className, shadow = "xs", ...props }, ref) => {
    return (
      <Box
        background="white"
        borderRadius="sm"
        className={clsx(className, styles.sprinkles({ boxShadow: shadow }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Paper.displayName = "@optiaxiom/react/Paper";
