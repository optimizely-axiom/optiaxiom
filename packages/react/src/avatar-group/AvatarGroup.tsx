import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Avatar } from "../avatar";
import { AvatarGroupContext } from "../avatar-context/AvatarContext";
import { Box, type BoxProps } from "../box";
import * as styles from "./AvatarGroup.css";

type AvatarGroupProps = BoxProps<
  "div",
  Pick<ComponentPropsWithoutRef<typeof Avatar>, "size">
>;

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, className, size = "md", ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.avatarGroup({}, className)} {...props}>
        <AvatarGroupContext.Provider value={{ size }}>
          {children}
        </AvatarGroupContext.Provider>
      </Box>
    );
  },
);

AvatarGroup.displayName = "@optiaxiom/react/AvatarGroup";
