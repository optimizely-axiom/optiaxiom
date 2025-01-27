import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { useCardContext } from "../card-context";
import { Heading, type HeadingProps } from "../heading";

type CardTitleProps = HeadingProps<"h2">;

export const CardTitle = forwardRef<HTMLDivElement, CardTitleProps>(
  ({ asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "h2";
    const { labelId } = useCardContext("CardTitle");

    return (
      <Heading
        asChild
        fontWeight="500"
        id={labelId}
        level="6"
        ref={ref}
        {...props}
      >
        <Comp>{children}</Comp>
      </Heading>
    );
  },
);

CardTitle.displayName = "@optiaxiom/react/CardTitle";
