import {
  Children,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import { Avatar } from "../avatar";
import { Box, type BoxProps } from "../box";
import { Menu } from "../menu";
import { MenuContent } from "../menu-content";
import { MenuItem } from "../menu-item";
import { MenuTrigger } from "../menu-trigger";
import { Tooltip } from "../tooltip";
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
  (
    {
      children,
      className,
      maxItems = 3,
      onAvatarClick,
      orientation = "horizontal",
      size = "md",
      withTooltip,
      ...props
    },
    ref,
  ) => {
    const allChildren = Children.toArray(children).filter(
      isValidElement<ComponentPropsWithoutRef<typeof Avatar>>,
    );
    const visibleChildren = allChildren.slice(0, maxItems);
    const overflowChildren = allChildren.slice(maxItems);

    const renderAvatar = (
      child: ReactElement<ComponentPropsWithoutRef<typeof Avatar>>,
    ) => {
      return cloneElement(child, {
        ...child.props,
        size,
        ...(onAvatarClick && {
          onClick: () => onAvatarClick(child.props.name ?? ""),
        }),
      });
    };

    return (
      <Box
        data-orientation={orientation}
        flexDirection={orientation === "vertical" ? "column" : "row"}
        ref={ref}
        {...styles.avatarGroup({}, className)}
        {...props}
      >
        {visibleChildren.map((child, index) => {
          const element = renderAvatar(child);
          return withTooltip ? (
            <Tooltip content={child.props.name} key={index}>
              {element}
            </Tooltip>
          ) : (
            <Box asChild {...(onAvatarClick && styles.pointer())}>
              {element}
            </Box>
          );
        })}
        {overflowChildren && (
          <Menu>
            <MenuTrigger asChild>
              <Avatar colorScheme="gray" size={size} {...styles.pointer()}>
                +{overflowChildren.length}
              </Avatar>
            </MenuTrigger>
            <MenuContent>
              {overflowChildren.map((child, index) => (
                <MenuItem
                  key={index}
                  onClick={
                    onAvatarClick
                      ? () => onAvatarClick(child.props.name ?? "")
                      : undefined
                  }
                >
                  <Box alignItems="center" display="flex" gap="4">
                    {cloneElement(child, { size: "sm" })}
                    <Box>{child.props.name}</Box>
                  </Box>
                </MenuItem>
              ))}
            </MenuContent>
          </Menu>
        )}
      </Box>
    );
  },
);

AvatarGroup.displayName = "@optiaxiom/react/AvatarGroup";
