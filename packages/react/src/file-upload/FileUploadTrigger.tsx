import { createSlot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { Box, extractBoxProps } from "../box";
import { Button, type ButtonProps } from "../button";
import { useFileUploadTrigger } from "./useFileUploadTrigger";

const Slot = createSlot("@optiaxiom/react/FileUploadTrigger");

export type FileUploadTriggerProps = ButtonProps;

export const FileUploadTrigger = forwardRef<
  HTMLButtonElement,
  FileUploadTriggerProps
>(({ asChild, children, onClick, ...props }, ref) => {
  const { boxProps, restProps } = extractBoxProps(props);
  const Comp = asChild ? Slot : Button;
  const open = useFileUploadTrigger();

  return (
    <Box asChild {...boxProps}>
      <Comp
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) {
            return;
          }

          open();
        }}
        ref={ref}
        {...restProps}
      >
        {children || "Select files"}
      </Comp>
    </Box>
  );
});

FileUploadTrigger.displayName = "@optiaxiom/react/FileUploadTrigger";
