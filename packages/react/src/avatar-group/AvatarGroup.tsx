import { Children, type ComponentPropsWithoutRef, forwardRef } from "react";

import { Avatar } from "../avatar";
import { AvatarContext } from "../avatar-context/AvatarContext";
import { Box, type BoxProps } from "../box";
import { HoverCard } from "../hover-card";
import { HoverCardContent } from "../hover-card-content";
import { HoverCardTrigger } from "../hover-card-trigger";
import * as styles from "./AvatarGroup.css";

type AvatarGroupProps = BoxProps<
  "div",
  {
    maxItems?: number;
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
            <HoverCard>
              <HoverCardTrigger asChild>
                <Avatar colorScheme="gray" size={size}>
                  +{overflowChildren.length}
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent flexDirection="row">
                {overflowChildren.map((child, index) => (
                  <Box asChild key={index}>
                    {child}
                  </Box>
                ))}
              </HoverCardContent>
            </HoverCard>
          )}
        </Box>
      </AvatarContext.Provider>
    );
  },
);

AvatarGroup.displayName = "@optiaxiom/react/AvatarGroup";
