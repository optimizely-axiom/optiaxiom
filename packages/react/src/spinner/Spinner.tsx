import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import * as styles from "./Spinner.css";

export type SpinnerProps = BoxProps<
  "div",
  {
    /**
     * Control the appearance depending on whether the spinner is placed on a light/dark background.
     */
    appearance?: "default" | "inverse";
  }
>;

const mapAppearanceToFg = {
  default: "fg.spinner.default",
  inverse: "fg.spinner.inverse",
} as const;

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ appearance = "default", children, size = "md", ...props }, ref) => {
    return (
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
            <Box asChild {...styles.track({ appearance })}>
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
    );
  },
);

Spinner.displayName = "@optiaxiom/react/Spinner";
