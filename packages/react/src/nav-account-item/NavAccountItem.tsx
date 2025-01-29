import { forwardRef } from "react";

import { Avatar } from "../avatar";
import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { IconEllipsis } from "../icons/IconEllipsis";
import { useSidebarContext } from "../sidebar-context";
import { Text } from "../text";
import * as styles from "./NavAccountItem.css";

export type NavAccountItemProps = BoxProps<
  "div",
  {
    name?: string;
    organization?: string;
    src?: string;
  }
>;

export const NavAccountItem = forwardRef<
  HTMLButtonElement,
  NavAccountItemProps
>(({ name, organization, src, ...props }, ref) => {
  const { expanded } = useSidebarContext("NavAccountItem");

  return (
    <Flex my="8" role="listitem">
      <Flex
        asChild
        flexDirection="row"
        gap="8"
        mx="8"
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
    </Flex>
  );
});

NavAccountItem.displayName = "@optiaxiom/react/NavAccountItem";
