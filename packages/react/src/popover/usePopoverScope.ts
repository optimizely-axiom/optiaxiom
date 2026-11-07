import * as RadixPopover from "@radix-ui/react-popover";

// Annotated so the emitted .d.ts names the type through react-popover rather
// than the copy of @radix-ui/react-context it depends on (TS2883).
export const usePopoverScope: ReturnType<
  typeof RadixPopover.createPopoverScope
> = RadixPopover.createPopoverScope();
