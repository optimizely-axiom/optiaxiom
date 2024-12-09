import { DismissableLayer } from "@radix-ui/react-dismissable-layer";
import { FocusGuards } from "@radix-ui/react-focus-guards";
import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithoutRef, forwardRef, useState } from "react";
import { RemoveScroll as ReactRemoveScroll } from "react-remove-scroll";

export const ModalLayer = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof DismissableLayer>
>(({ asChild, children, ...props }, ref) => {
  let result = (
    <DismissableLayer asChild={asChild} ref={ref} {...props}>
      {children}
    </DismissableLayer>
  );

  const [locked] = useState(() => document.body.dataset.scrollLocked);
  if (locked) {
    result = (
      <ReactRemoveScroll allowPinchZoom as={Slot}>
        {result}
      </ReactRemoveScroll>
    );
  }

  const [guards] = useState(() =>
    document.querySelector("[data-radix-focus-guard]"),
  );
  if (guards) {
    result = <FocusGuards>{result}</FocusGuards>;
  }

  return result;
});

ModalLayer.displayName = "@optiaxiom/react/ModalLayer";
