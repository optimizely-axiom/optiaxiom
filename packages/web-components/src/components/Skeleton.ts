import { Skeleton as SkeletonComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Skeleton = "ax-skeleton";
export default register(Skeleton, SkeletonComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Skeleton]: ComponentAttributes<typeof SkeletonComponent>;
    }
  }
}
