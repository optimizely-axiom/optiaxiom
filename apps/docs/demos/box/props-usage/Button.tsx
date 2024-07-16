import { Box, type BoxProps, extractSprinkles } from "@optiaxiom/react";
import { forwardRef } from "react";

type ButtonProps = BoxProps<"button", { icon?: string }>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, icon, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild {...sprinkleProps}>
        <button ref={ref} {...restProps}>
          {icon}
          {children}
        </button>
      </Box>
    );
  },
);

Button.displayName = "@optiaxiom/docs/Button";
