import { Slot } from "@radix-ui/react-slot";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  Fragment,
  useState,
} from "react";
import { RemoveScroll as ReactRemoveScroll } from "react-remove-scroll";

export const RemoveScroll = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<typeof ReactRemoveScroll>
>((props, ref) => {
  const [Comp] = useState(() =>
    document.body.dataset.scrollLocked ? ReactRemoveScroll : Fragment,
  );
  return <Comp allowPinchZoom as={Slot} ref={ref} {...props} />;
});

RemoveScroll.displayName = "@optiaxiom/react/RemoveScroll";
