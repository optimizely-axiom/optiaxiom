import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { Transition } from "../transition";

type SpinnerProps = BoxProps<
  "div",
  {
    appearance?: "default" | "inverse";
  }
>;

const mapAppearanceToBg = {
  default: "spinner.bg.default",
  inverse: "spinner.bg.inverse",
} as const;
const mapAppearanceToFg = {
  default: "spinner.fg.default",
  inverse: "spinner.fg.inverse",
} as const;

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ appearance = "default", children, size = "md", ...props }, ref) => {
    return (
      <Transition duration="sm">
        <Flex
          alignItems="center"
          aria-label="Loading"
          display="inline-flex"
          ref={ref}
          role="status"
          {...props}
        >
          <Box animation="spin" asChild size={size}>
            <svg
              fill="none"
              height={16}
              viewBox="0 0 16 16"
              width={16}
              xmlns="http://www.w3.org/2000/svg"
            >
              <Box asChild color={mapAppearanceToBg[appearance]}>
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  stroke="currentColor"
                  strokeOpacity="0.04"
                  strokeWidth="1.5"
                />
              </Box>
              <Box asChild color={mapAppearanceToFg[appearance]}>
                <path
                  d="M4.5 1.93782C5.45668 1.38549 6.53049 1.06741 7.63365 1.00959C8.73681 0.951779 9.83799 1.15587 10.8472 1.60518C11.8563 2.05449 12.7448 2.73627 13.44 3.59476C14.1352 4.45325 14.6174 5.46408 14.847 6.54462"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                />
              </Box>
            </svg>
          </Box>

          {children}
        </Flex>
      </Transition>
    );
  },
);

Spinner.displayName = "@optiaxiom/react/Spinner";
