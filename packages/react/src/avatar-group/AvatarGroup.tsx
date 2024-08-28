import {
  Children,
  type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
  forwardRef,
  isValidElement,
} from "react";

import { Avatar } from "../avatar";
import { AvatarGroupContext } from "../avatar-context/AvatarContext";
import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { HoverCard } from "../hover-card";
import { HoverCardContent } from "../hover-card-content";
import { HoverCardTrigger } from "../hover-card-trigger";
import { Text } from "../text";
import { Tooltip } from "../tooltip";
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
      <Box ref={ref} {...styles.avatarGroup({}, className)} {...props}>
        <AvatarGroupContext.Provider value={{ size }}>
          {visibleChildren}
        </AvatarGroupContext.Provider>
        {overflowChildren.length > 0 && (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar size={size}>+{overflowChildren.length}</Avatar>
            </HoverCardTrigger>
            <HoverCardContent flexDirection="column" gap="xs">
              {overflowChildren.map((child, index) =>
                isValidElement<
                  ComponentPropsWithRef<typeof Avatar> &
                    ComponentPropsWithRef<typeof Tooltip>
                >(child) ? (
                  <Flex flexDirection="row" gap="4" key={index}>
                    <AvatarGroupContext.Provider value={{ size }}>
                      {child}
                    </AvatarGroupContext.Provider>

                    {child.type === Avatar ? (
                      <Text>{child.props.name}</Text>
                    ) : child.type === Tooltip ? (
                      <Text>{child.props.content}</Text>
                    ) : null}
                  </Flex>
                ) : (
                  child
                ),
              )}
            </HoverCardContent>
          </HoverCard>
        )}
      </Box>
    );
  },
);

AvatarGroup.displayName = "@optiaxiom/react/AvatarGroup";
