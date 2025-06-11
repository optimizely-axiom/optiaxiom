import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, useRef } from "react";

import { Box, type BoxProps } from "../box";
import { FocusBookmarkProvider } from "../focus-bookmark";
import { ModalProvider } from "../modal";
import { PopoverContentProvider } from "./PopoverContentContext";

export type PopoverContentImplProps = BoxProps;

export const PopoverContentImpl = forwardRef<
  HTMLDivElement,
  PopoverContentImplProps
>(({ children, ...props }, outerRef) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const ref = useComposedRefs(innerRef, outerRef);

  return (
    <PopoverContentProvider
      side={
        "data-side" in props &&
        (props["data-side"] === "bottom" ||
          props["data-side"] === "left" ||
          props["data-side"] === "right" ||
          props["data-side"] === "top")
          ? props["data-side"]
          : undefined
      }
    >
      <ModalProvider shardRef={innerRef}>
        <FocusBookmarkProvider containerRef={innerRef}>
          <Box ref={ref} {...props}>
            {children}
          </Box>
        </FocusBookmarkProvider>
      </ModalProvider>
    </PopoverContentProvider>
  );
});

PopoverContentImpl.displayName = "@optiaxiom/react/PopoverContentImpl";
