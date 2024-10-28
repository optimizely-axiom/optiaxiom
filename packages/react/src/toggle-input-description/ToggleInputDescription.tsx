import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useToggleInputContext } from "../toggle-input-context";

type ToggleInputDescriptionProps = BoxProps<"div">;

export const ToggleInputDescription = forwardRef<
  HTMLDivElement,
  ToggleInputDescriptionProps
>(({ children, ...props }, ref) => {
  const { descriptionId } = useToggleInputContext("ToggleInputDescription");

  return (
    <Box
      color="fg.secondary"
      fontSize="sm"
      id={descriptionId}
      ref={ref}
      {...props}
    >
      {children}
    </Box>
  );
});

ToggleInputDescription.displayName = "@optiaxiom/react/ToggleInputDescription";
