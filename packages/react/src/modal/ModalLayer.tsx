import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { DismissableLayer } from "@radix-ui/react-dismissable-layer";
import { FocusGuards } from "@radix-ui/react-focus-guards";
import { createSlot } from "@radix-ui/react-slot";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
  useRef,
  useState,
} from "react";
import { RemoveScroll as ReactRemoveScroll } from "react-remove-scroll";

import type { Box } from "../box";

import { ModalProvider, useModalContext } from "./ModalContext";

const Slot = createSlot("@optiaxiom/react/ModalLayer");

export type ModalLayerProps = Pick<
  ComponentPropsWithoutRef<typeof Box>,
  "asChild"
> &
  Pick<ComponentPropsWithoutRef<typeof DismissableLayer>, "onEscapeKeyDown"> & {
    children?: ReactNode;
  };

export const ModalLayer = forwardRef<HTMLDivElement, ModalLayerProps>(
  ({ asChild, children, ...props }, outerRef) => {
    const { shardRef } = useModalContext("@optiaxiom/react/ModalLayer");
    const [locked] = useState(() => document.body.dataset.scrollLocked);
    const [guards] = useState(() =>
      document.querySelector("[data-radix-focus-guard]"),
    );

    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    if (!shardRef.current) {
      return asChild ? (
        <Slot ref={ref} {...props}>
          {children}
        </Slot>
      ) : (
        <>{children}</>
      );
    }

    let result = (
      <DismissableLayer asChild={asChild} ref={ref} {...props}>
        {children}
      </DismissableLayer>
    );

    if (locked) {
      result = (
        <ReactRemoveScroll allowPinchZoom as={Slot} shards={[shardRef]}>
          {result}
        </ReactRemoveScroll>
      );
    }

    if (guards) {
      result = <FocusGuards>{result}</FocusGuards>;
    }

    return <ModalProvider shardRef={innerRef}>{result}</ModalProvider>;
  },
);

ModalLayer.displayName = "@optiaxiom/react/ModalLayer";
