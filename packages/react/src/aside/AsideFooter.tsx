import { type ComponentPropsWithRef, forwardRef } from "react";

import { ButtonProvider } from "../button/internals";
import { Flex } from "../flex";
import * as styles from "./AsideFooter.css";

export type AsideFooterProps = ComponentPropsWithRef<typeof Flex>;

export const AsideFooter = forwardRef<HTMLDivElement, AsideFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex ref={ref} {...styles.footer({}, className)} {...props}>
        <ButtonProvider size="lg">{children}</ButtonProvider>
      </Flex>
    );
  },
);

AsideFooter.displayName = "@optiaxiom/react/AsideFooter";
