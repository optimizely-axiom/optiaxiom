import { DismissableLayer } from "@radix-ui/react-dismissable-layer";
import { FocusGuards } from "@radix-ui/react-focus-guards";
import { Slot } from "@radix-ui/react-slot";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
  useState,
} from "react";
import { RemoveScroll as ReactRemoveScroll } from "react-remove-scroll";

import type { Box } from "../box";

type ModalLayerProps = Pick<ComponentPropsWithoutRef<typeof Box>, "asChild"> & {
  children?: ReactNode;
};

export const ModalLayer = forwardRef<HTMLDivElement, ModalLayerProps>(
  ({ asChild, children, ...props }, ref) => {
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
  },
);

ModalLayer.displayName = "@optiaxiom/react/ModalLayer";
