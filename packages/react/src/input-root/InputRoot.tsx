import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { InputContextProvider } from "../input-context";
import * as styles from "./InputRoot.css";

type InputRootProps = BoxProps<
  "div",
  Pick<
    ComponentPropsWithoutRef<typeof InputContextProvider>,
    "addonPointerEvents"
  >
>;

export const InputRoot = forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  InputRootProps
>(({ addonPointerEvents = "auto", children, className, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  return (
    <Flex ref={ref} {...styles.root({}, className)} {...props}>
      <InputContextProvider
        addonPointerEvents={addonPointerEvents}
        inputRef={inputRef}
      >
        {children}
      </InputContextProvider>
    </Flex>
  );
});

InputRoot.displayName = "@optiaxiom/react/InputRoot";
