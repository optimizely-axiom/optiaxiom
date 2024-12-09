import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithoutRef, Fragment, useState } from "react";
import { RemoveScroll as ReactRemoveScroll } from "react-remove-scroll";

export function RemoveScroll(
  props: ComponentPropsWithoutRef<typeof ReactRemoveScroll>,
) {
  const [locked] = useState(() => document.body.dataset.scrollLocked);
  return locked ? (
    <ReactRemoveScroll allowPinchZoom as={Slot} {...props} />
  ) : (
    <Fragment {...props} />
  );
}

RemoveScroll.displayName = "@optiaxiom/react/RemoveScroll";
