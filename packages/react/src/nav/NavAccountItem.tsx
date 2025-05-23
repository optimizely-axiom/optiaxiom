import { forwardRef } from "react";

import { Avatar } from "../avatar";
import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
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

export const NavAccountItem = forwardRef<
  HTMLButtonElement,
  NavAccountItemProps
>(({ name, organization, src, ...props }, ref) => {
  const { expanded } = useSidebarContext("@optiaxiom/react/NavAccountItem");

  return (
    <Flex asChild my="8">
      <li>
        <Flex
          asChild
          flexDirection="row"
          gap="8"
          p="4"
          textAlign="start"
          {...props}
        >
          <button ref={ref}>
            <Avatar
              aria-hidden
              flex="none"
              my="2"
              name={name}
              rounded="sm"
              src={src}
            />

            <Flex {...styles.item({ expanded: Boolean(expanded) })}>
              <Flex flex="1" gap="0" overflowX="hidden">
                <Text color="fg.default" fontWeight="500" truncate>
                  {name}
                </Text>
                <Text color="fg.tertiary" fontSize="sm" truncate>
                  {organization}
                </Text>
              </Flex>

              <Box asChild>
                <IconEllipsis />
              </Box>
            </Flex>
          </button>
        </Flex>
      </li>
    </Flex>
  );
});

NavAccountItem.displayName = "@optiaxiom/react/NavAccountItem";
