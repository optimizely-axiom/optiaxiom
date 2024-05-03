import {
  type ComponentPropsWithRef,
  type RefObject,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { RippleChild } from "./RippleChild";

type RippleProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  { targetRef: RefObject<HTMLElement> }
>;

export function Ripple({ targetRef, ...props }: RippleProps) {
  const [, setFlag] = useState(true);
  const ripples = useRef<JSX.Element[]>([]);
  const setRipples = (fn: (ripples: JSX.Element[]) => JSX.Element[]) => {
    const prev = ripples.current;
    const next = fn(prev);

    if (next !== prev) {
      ripples.current = next;
      setFlag((flag) => !flag);
    }
  };

  useEffect(() => {
    const element = targetRef.current;
    if (!element) {
      return;
    }

    const entry = ({ button, layerX, layerY }: MouseEvent) => {
      if (button === 2) {
        return;
      }

      const center = { x: layerX, y: layerY };
      const corner = {
        x: layerX > element.offsetWidth / 2 ? 0 : element.offsetWidth,
        y: layerY > element.offsetHeight / 2 ? 0 : element.offsetHeight,
      };
      const size =
        2 * Math.sqrt((center.x - corner.x) ** 2 + (center.y - corner.y) ** 2);
      setRipples((ripples) => [
        ...ripples,
        <RippleChild
          data-testid="ripple-child"
          isPresent
          key={Date.now()}
          safeToRemove={() => setRipples(([_first, ...ripples]) => ripples)}
          style={{
            height: size,
            left: layerX - size / 2,
            top: layerY - size / 2,
            width: size,
          }}
        />,
      ]);
    };
    element.addEventListener("mousedown", entry);

    const exit = () => {
      setRipples((ripples) => {
        const last = ripples.pop();
        if (!last) {
          return ripples;
        }

        return [...ripples, cloneElement(last, { isPresent: false })];
      });
    };
    document.addEventListener("mouseup", exit);

    return () => {
      element.removeEventListener("mousedown", entry);
      document.removeEventListener("mouseup", exit);
    };
  }, [targetRef]);

  return (
    <Box
      asChild
      inset="0"
      overflow="hidden"
      pointerEvents="none"
      position="absolute"
      zIndex="0"
      {...props}
    >
      <span>{ripples.current}</span>
    </Box>
  );
}
