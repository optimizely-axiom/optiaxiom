import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { setElementVars } from "@vanilla-extract/dynamic";
import { forwardRef, useEffect, useRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./DialogContent.css";
import { useDialogContext } from "./DialogContext";

export type DialogContentImplProps = BoxProps;

export const DialogContentImpl = forwardRef<
  HTMLDivElement,
  DialogContentImplProps
>(({ children, ...props }, outerRef) => {
  const { footerRef, headerRef } = useDialogContext(
    "@optiaxiom/react/DialogContentImpl",
  );

  const innerRef = useRef<HTMLDivElement>(null);
  const ref = useComposedRefs(innerRef, outerRef);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (!innerRef.current) {
        return;
      }

      // Hard code the padding for now
      const padding = 16;
      const vars: Record<string, string> = {};
      for (const entry of entries) {
        const side = entry.target === headerRef.current ? "Top" : "Bottom";
        vars[styles[`scrollPadding${side}Var`]] =
          `${entry.borderBoxSize[0].blockSize + padding}px`;
      }
      setElementVars(innerRef.current, vars);
    });

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => observer.disconnect();
  }, [footerRef, headerRef]);

  return (
    <Box ref={ref} {...props}>
      {children}
    </Box>
  );
});

DialogContentImpl.displayName = "@optiaxiom/react/DialogContentImpl";
