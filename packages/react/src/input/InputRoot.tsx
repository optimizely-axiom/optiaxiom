import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { InputProvider } from "./InputContext";
import * as styles from "./InputRoot.css";

export type InputRootProps = BoxProps<
  "div",
  Pick<ComponentPropsWithoutRef<typeof InputProvider>, "addonPointerEvents">
>;

export const InputRoot = forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  InputRootProps
>(
  (
    {
      addonPointerEvents = "auto",
      children,
      className,
      onPointerDown,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

    return (
      <Flex
        onPointerDown={(event) => {
          onPointerDown?.(event);
          if (event.defaultPrevented) {
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();
          inputRef.current?.focus();
        }}
        ref={ref}
        {...styles.root({}, className)}
        {...props}
      >
        <InputProvider
          addonPointerEvents={addonPointerEvents}
          inputRef={inputRef}
        >
          {children}
        </InputProvider>
      </Flex>
    );
  },
);

InputRoot.displayName = "@optiaxiom/react/InputRoot";
