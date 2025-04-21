import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { InputProvider } from "./InputContext";
import * as styles from "./InputRoot.css";

type InputRootProps = BoxProps<
  "div",
  Pick<ComponentPropsWithoutRef<typeof InputProvider>, "addonPointerEvents">
>;

export const InputRoot = forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  InputRootProps
>(({ addonPointerEvents = "auto", children, className, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  return (
    <Flex ref={ref} {...styles.root({}, className)} {...props}>
      <InputProvider
        addonPointerEvents={addonPointerEvents}
        inputRef={inputRef}
      >
        {children}
      </InputProvider>
    </Flex>
  );
});

InputRoot.displayName = "@optiaxiom/react/InputRoot";
