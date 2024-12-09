import { DismissableLayer } from "@radix-ui/react-dismissable-layer";
import { useFocusGuards } from "@radix-ui/react-focus-guards";
import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithoutRef, forwardRef, useState } from "react";
import { RemoveScroll as ReactRemoveScroll } from "react-remove-scroll";

export const Modal = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof DismissableLayer>
>(({ asChild, children, ...props }, ref) => {
  const [locked] = useState(() => document.body.dataset.scrollLocked);
  useFocusGuards();

  return locked ? (
    <ReactRemoveScroll allowPinchZoom as={Slot} {...props}>
      <DismissableLayer asChild={asChild} ref={ref}>
        {children}
      </DismissableLayer>
    </ReactRemoveScroll>
  ) : (
    <Slot {...props}>
      <DismissableLayer asChild={asChild} ref={ref}>
        {children}
      </DismissableLayer>
    </Slot>
  );
});

Modal.displayName = "@optiaxiom/react/Modal";
