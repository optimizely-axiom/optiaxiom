import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import * as styles from "./MaterialIcon.css";

export type MaterialIconProps = BoxProps<
  "svg",
  {
    /**
     * Whether the icon should use filled or unfilled state.
     */
    filled?: boolean;
    /**
     * The path for the filled icon.
     */
    filledPath?: string;
    /**
     * The path for the unfilled icon.
     */
    unfilledPath: string;
  }
>;

export const MaterialIcon = forwardRef<SVGSVGElement, MaterialIconProps>(
  ({ className, filled = false, filledPath, unfilledPath, ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box asChild {...styles.icon({}, className)} {...boxProps}>
        <svg
          height={20}
          ref={ref}
          viewBox="0 -960 960 960"
          width={20}
          xmlns="http://www.w3.org/2000/svg"
          {...restProps}
        >
          {!filledPath || unfilledPath === filledPath ? (
            <path d={unfilledPath} />
          ) : (
            <>
              <Box asChild {...styles.path({ filled, type: "unfilled" })}>
                <path d={unfilledPath} />
              </Box>
              <Box asChild {...styles.path({ filled, type: "filled" })}>
                <path d={filledPath} />
              </Box>
            </>
          )}
        </svg>
      </Box>
    );
  },
);

MaterialIcon.displayName = "@optiaxiom/proteus/MaterialIcon";
