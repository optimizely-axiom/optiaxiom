import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Avatar } from "./Avatar";
import { AvatarProvider } from "./AvatarContext";
import * as styles from "./AvatarGroup.css";

export type AvatarGroupProps = BoxProps<
  "div",
  {
    /**
     * Control the size of the avatars.
     */
    size?: ComponentPropsWithoutRef<typeof Avatar>["size"];
  }
>;

/**
 * Displays a group of avatars representing multiple users with automatic layout
 * and overflow handling.
 *
 * Use this component whenever you have 2 or more Avatar components together,
 * even if they're not overlapping in the design. AvatarGroup handles consistent
 * sizing, spacing, overflow indicators (+N), and semantic grouping
 * automatically.
 *
 * Don't manually layout multiple Avatars in a Flex - use AvatarGroup instead.
 *
 * When to use:
 * - Multiple assignees on a task
 * - Team members or collaborators
 * - Participants in a conversation
 * - Any group of users
 *
 * @group Avatar
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, className, size = "md", ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.avatarGroup({}, className)} {...props}>
        <AvatarProvider size={size}>{children}</AvatarProvider>
      </Box>
    );
  },
);

AvatarGroup.displayName = "@optiaxiom/react/AvatarGroup";
