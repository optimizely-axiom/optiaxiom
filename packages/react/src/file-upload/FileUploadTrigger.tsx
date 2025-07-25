import { createSlot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { Box, extractBoxProps } from "../box";
import { Button, type ButtonProps } from "../button";
import { useFileUploadContext } from "./FileUploadContext";

const Slot = createSlot("@optiaxiom/react/FileUploadTrigger");

export type FileUploadTriggerProps = ButtonProps;

export const FileUploadTrigger = forwardRef<
  HTMLButtonElement,
  FileUploadTriggerProps
>(({ asChild, children, onClick, ...props }, ref) => {
  const { boxProps, restProps } = extractBoxProps(props);
  const Comp = asChild ? Slot : Button;
  const { dropzone } = useFileUploadContext(
    "@optiaxiom/react/FileUploadTrigger",
  );

  return (
    <Box asChild {...boxProps}>
      <Comp
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) {
            return;
          }

          dropzone.open();
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
