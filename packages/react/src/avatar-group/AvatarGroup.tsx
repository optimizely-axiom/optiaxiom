import {
  Children,
  type ComponentPropsWithoutRef,
  type ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import { Avatar } from "../avatar";
import { Box, type BoxProps } from "../box";
import { Tooltip } from "../tooltip";
import * as styles from "./AvatarGroup.css";

type AvatarGroupProps = BoxProps<
  "div",
  {
    children: ReactNode;
    maxItems?: number;
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
      orientation = "horizontal",
      size = "md",
      withTooltip,
      ...props
    },
    ref,
  ) => {
    const validChildren = Children.toArray(children)
      .filter(isValidElement<ComponentPropsWithoutRef<typeof Avatar>>)
      .slice(0, maxItems);

    const overflowCount = Math.max(0, Children.count(children) - maxItems);
    return (
      <Box
        data-orientation={orientation}
        flexDirection={orientation === "vertical" ? "column" : "row"}
        ref={ref}
        {...styles.avatarGroup({}, className)}
        {...props}
      >
        {validChildren.map((child, index) => {
          const avatarElement = cloneElement(child, {
            key: child.key || index,
            size: size,
          });

          return withTooltip ? (
            <Tooltip content={child.props.name} key={child.key || index}>
              {avatarElement}
            </Tooltip>
          ) : (
            avatarElement
          );
        })}
        {overflowCount > 0 && (
          <Avatar colorScheme="gray" size={size}>
            +{overflowCount}
          </Avatar>
        )}
      </Box>
    );
  },
);

AvatarGroup.displayName = "@optiaxiom/react/AvatarGroup";
