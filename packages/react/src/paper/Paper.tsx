import clsx from "clsx";
import "inter-ui/inter-variable.css";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./Paper.css";

type PaperProps = ExtendProps<
  ComponentPropsWithRef<"p">,
  ComponentPropsWithRef<typeof Box>,
  {
    shadow?: styles.Sprinkles["boxShadow"];
  }
>;

export const Paper = forwardRef<HTMLParagraphElement, PaperProps>(
  ({ className, shadow = "sm", ...props }, ref) => {
    return (
      <Box
        background={{ base: "white", dark: "slate.800" }}
        borderRadius="sm"
        className={clsx(className, styles.sprinkles({ boxShadow: shadow }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Paper.displayName = "@optiaxiom/react/Paper";
