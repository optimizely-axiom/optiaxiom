import * as RadixHoverCard from "@radix-ui/react-hover-card";

// Annotated so the emitted .d.ts names the type through react-hover-card
// rather than the copy of @radix-ui/react-context it depends on (TS2883).
export const useHoverCardScope: ReturnType<
  typeof RadixHoverCard.createHoverCardScope
> = RadixHoverCard.createHoverCardScope();
