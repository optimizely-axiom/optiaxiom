import type { RefObject } from "react";

export const waitForAnimation = async (
  transitions: RefObject<HTMLElement>[],
) => {
  await Promise.allSettled(
    transitions.flatMap<Promise<unknown>>((ref) =>
      typeof ref.current?.getAnimations === "function"
        ? ref.current?.getAnimations().map((animation) => animation.finished)
        : [Promise.resolve()],
    ),
  );
};
