import {
  Children,
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
} from "react";

import { Avatar } from "../avatar";
import { AvatarContext } from "../avatar-context/AvatarContext";
import { Box, type BoxProps } from "../box";
import * as styles from "./AvatarGroup.css";

type AvatarGroupProps = BoxProps<
  "div",
  {
    children: ReactNode;
    maxItems?: number;
    onAvatarClick?: (name: string) => void;
    orientation?: "horizontal" | "vertical";
    withTooltip?: boolean;
  } & Pick<ComponentPropsWithoutRef<typeof Avatar>, "size">
>;

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, className, maxItems = 3, size = "md", ...props }, ref) => {
    const allChildren = Children.toArray(children);
    const visibleChildren = allChildren.slice(0, maxItems);
    const overflowChildren = allChildren.slice(maxItems);

    return (
      <AvatarContext.Provider value={{ size }}>
        <Box ref={ref} {...styles.avatarGroup({}, className)} {...props}>
          {visibleChildren}
          {overflowChildren.length > 0 && (
            <Avatar colorScheme="gray" size={size}>
              +{overflowChildren.length}
            </Avatar>
          )}
        </Box>
      </AvatarContext.Provider>
    );
  },
);

AvatarGroup.displayName = "@optiaxiom/react/AvatarGroup";
