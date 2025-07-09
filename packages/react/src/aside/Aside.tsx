import { useId } from "@radix-ui/react-id";
import { createSlot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Aside.css";
import { AsideProvider } from "./AsideContext";

const Slot = createSlot("@optiaxiom/react/Aside");

export type AsideProps = BoxProps<"aside">;

export const Aside = forwardRef<HTMLElement, AsideProps>(
  ({ asChild, children, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "aside";

    const labelId = useId();
    const descriptionId = useId();

    return (
      <AsideProvider descriptionId={descriptionId} labelId={labelId}>
        <Box
          aria-describedby={descriptionId}
          aria-labelledby={labelId}
          asChild
          tabIndex={0}
          {...styles.root({}, className)}
          {...props}
        >
          <Comp ref={ref}>{children}</Comp>
        </Box>
      </AsideProvider>
    );
  },
);

Aside.displayName = "@optiaxiom/react/Aside";
