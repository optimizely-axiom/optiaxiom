import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

type SpinnerProps = BoxProps<
  "svg",
  {
    colorScheme?: "default" | "inverse";
  }
>;

const mapColorSchemeToBg = {
  default: "bg.secondary",
  inverse: "neutral.50/6",
} as const;
const mapColorSchemeToFg = {
  default: "fg.default",
  inverse: "border.secondary",
} as const;

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  ({ colorScheme = "default", ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box animation="spin" asChild {...sprinkleProps}>
        <svg
          fill="none"
          height={16}
          ref={ref}
          role="img"
          viewBox="0 0 16 16"
          width={16}
          xmlns="http://www.w3.org/2000/svg"
          {...restProps}
        >
          <Box asChild color={mapColorSchemeToBg[colorScheme]}>
            <circle
              cx="8"
              cy="8"
              r="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </Box>
          <Box asChild color={mapColorSchemeToFg[colorScheme]}>
            <path
              d="M4.5 1.93782C5.78021 1.19869 7.26154 0.883827 8.7317 1.03835C10.2019 1.19287 11.5854 1.80884 12.6839 2.79798C13.7825 3.78713 14.5397 5.09866 14.847 6.54461C15.1544 7.99057 14.9961 9.4967 14.3948 10.8472"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
          </Box>
        </svg>
      </Box>
    );
  },
);

Spinner.displayName = "@optiaxiom/react/Spinner";
