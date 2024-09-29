import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { extractSprinkles } from "../sprinkles";

type ToggleGroupItemProps = ButtonProps<typeof RadixToggleGroup.Item>;

export const ToggleGroupItem = forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({ children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  return (
    <Button appearance="secondary" asChild size="lg" {...sprinkleProps}>
      <RadixToggleGroup.Item ref={ref} {...restProps}>
        {children}
      </RadixToggleGroup.Item>
    </Button>
  );
});

ToggleGroupItem.displayName = "@optiaxiom/react/ToggleGroupItem";
