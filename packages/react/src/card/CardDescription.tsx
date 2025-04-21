import { type ComponentPropsWithRef, forwardRef } from "react";

import { Text } from "../text";
import { useCardContext } from "./CardContext";

type CardDescriptionProps = ComponentPropsWithRef<typeof Text>;

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ children, ...props }, ref) => {
  const { descriptionId } = useCardContext("@optiaxiom/react/CardDescription");

  return (
    <Text
      color="fg.tertiary"
      fontSize="sm"
      id={descriptionId}
      ref={ref}
      {...props}
    >
      {children}
    </Text>
  );
});

CardDescription.displayName = "@optiaxiom/react/CardDescription";
