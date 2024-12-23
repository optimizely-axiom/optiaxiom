import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Avatar } from "../avatar";
import { AvatarContext } from "../avatar-context/AvatarContext";
import { Box, type BoxProps } from "../box";
import * as styles from "./AvatarGroup.css";

type AvatarGroupProps = BoxProps<
  "div",
  {
    /**
     * Control the size of the avatars.
     */
    size?: ComponentPropsWithoutRef<typeof Avatar>["size"];
  }
>;

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, className, size = "md", ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.avatarGroup({}, className)} {...props}>
        <AvatarContext.Provider value={{ size }}>
          {children}
        </AvatarContext.Provider>
      </Box>
    );
  },
);

AvatarGroup.displayName = "@optiaxiom/react/AvatarGroup";
