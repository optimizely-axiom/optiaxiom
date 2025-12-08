import { forwardRef } from "react";

import { Avatar } from "../avatar";
import { Box, type BoxProps } from "../box";
import { Group } from "../group";
import { IconEllipsis } from "../icons/IconEllipsis";
import { useSidebarContext } from "../sidebar/internals";
import { Text } from "../text";
import * as styles from "./NavAccountItem.css";

export type NavAccountItemProps = BoxProps<
  "div",
  {
    /**
     * The name of the user.
     */
    name?: string;
    /**
     * The name of the current organization user belongs to.
     */
    organization?: string;
    /**
     * Render the image inside the avatar.
     */
    src?: string;
  }
>;

/**
 * @group Sidebar
 */
export const NavAccountItem = forwardRef<
  HTMLButtonElement,
  NavAccountItemProps
>(({ name, organization, src, ...props }, ref) => {
  const { expanded } = useSidebarContext("@optiaxiom/react/NavAccountItem");

  return (
    <Group asChild flexDirection="column" gap="16" my="8">
      <li>
        <Group asChild gap="8" p="4" textAlign="start" {...props}>
          <button ref={ref}>
            <Avatar
              aria-hidden
              flex="none"
              my="2"
              name={name}
              rounded="sm"
              src={src}
            />

            <Group {...styles.item({ expanded: Boolean(expanded) })}>
              <Group flex="1" flexDirection="column" gap="0" overflowX="hidden">
                <Text color="fg.default" fontWeight="500" truncate>
                  {name}
                </Text>
                <Text color="fg.tertiary" fontSize="sm" truncate>
                  {organization}
                </Text>
              </Group>

              <Box asChild>
                <IconEllipsis />
              </Box>
            </Group>
          </button>
        </Group>
      </li>
    </Group>
  );
});

NavAccountItem.displayName = "@optiaxiom/react/NavAccountItem";
