import { Slot as RadixSlot } from "radix-ui";
import {
  DismissableLayer,
  FocusGuards,
  useComposedRefs,
} from "radix-ui/internal";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
  useRef,
  useState,
} from "react";
import { RemoveScroll as ReactRemoveScroll } from "react-remove-scroll";

import type { Box } from "../box";

import { ModalProvider, useModalContext } from "../modal/ModalContext";

const Slot = RadixSlot.createSlot("@optiaxiom/react/ModalLayer");

type ModalLayerProps = Pick<ComponentPropsWithoutRef<typeof Box>, "asChild"> &
  Pick<
    ComponentPropsWithoutRef<typeof DismissableLayer.Root>,
    "onEscapeKeyDown"
  > & {
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
      <DismissableLayer.Root asChild={asChild} ref={ref} {...props}>
        {children}
      </DismissableLayer.Root>
    );

    if (locked) {
      result = (
        <ReactRemoveScroll allowPinchZoom as={Slot} shards={[shardRef]}>
          {result}
        </ReactRemoveScroll>
      );
    }

    if (guards) {
      result = <FocusGuards.Root>{result}</FocusGuards.Root>;
    }

    return <ModalProvider shardRef={innerRef}>{result}</ModalProvider>;
  },
);

ModalLayer.displayName = "@optiaxiom/react/ModalLayer";
