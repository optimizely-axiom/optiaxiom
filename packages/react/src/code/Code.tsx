import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Flex } from "../flex";
import * as styles from "./Code.css";

type CodeProps = ComponentPropsWithRef<typeof Flex>;

export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ asChild, children, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "code";
    return (
      <Flex
        asChild
        bg="bg.neutral"
        className={clsx(className, styles.base)}
        display="inline-block"
        px="4"
        rounded="sm"
        {...props}
      >
        <Comp ref={ref}>{children}</Comp>
      </Flex>
    );
  },
);

Code.displayName = "@optiaxiom/react/Code";
