import { type ComponentPropsWithRef, forwardRef } from "react";

import { useCardContext } from "../card-context";
import { Text } from "../text";

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
