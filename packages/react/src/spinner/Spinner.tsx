import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";

type SpinnerProps = BoxProps<
  "div",
  {
    colorScheme?: "default" | "inverse";
    size?: "2xs" | "5xl" | "lg" | "md" | "sm" | "xl" | "xs";
  }
>;

const mapColorSchemeToBg = {
  default: "spinner.bg.default",
  inverse: "spinner.bg.inverse",
} as const;
const mapColorSchemeToFg = {
  default: "spinner.fg.default",
  inverse: "spinner.fg.inverse",
} as const;

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ colorScheme = "default", size = "md", ...props }, ref) => {
    return (
      <Flex alignItems="center" display="inline-flex" ref={ref} {...props}>
        <Box animation="spin" asChild size={size}>
          <svg
            fill="none"
            height={16}
            role="img"
            viewBox="0 0 16 16"
            width={16}
            xmlns="http://www.w3.org/2000/svg"
          >
            <Box asChild color={mapColorSchemeToBg[colorScheme]}>
              <circle
                cx="8"
                cy="8"
                r="7"
                stroke="currentColor"
                strokeOpacity="0.04"
                strokeWidth="1.5"
              />
            </Box>
            <Box asChild color={mapColorSchemeToFg[colorScheme]}>
              <path
                d="M4.5 1.93782C5.45668 1.38549 6.53049 1.06741 7.63365 1.00959C8.73681 0.951779 9.83799 1.15587 10.8472 1.60518C11.8563 2.05449 12.7448 2.73627 13.44 3.59476C14.1352 4.45325 14.6174 5.46408 14.847 6.54462"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </Box>
          </svg>
        </Box>
      </Flex>
    );
  },
);

Spinner.displayName = "@optiaxiom/react/Spinner";
