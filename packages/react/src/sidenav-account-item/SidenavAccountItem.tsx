import { forwardRef } from "react";

import { Avatar } from "../avatar";
import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { IconEllipsis } from "../icons/IconEllipsis";
import { useSidenavContext } from "../sidenav-context";
import { Text } from "../text";
import { Transition } from "../transition";

export type SidenavAccountItemProps = BoxProps<
  "div",
  {
    name?: string;
    organization?: string;
    src?: string;
  }
>;

export const SidenavAccountItem = forwardRef<
  HTMLButtonElement,
  SidenavAccountItemProps
>(({ name, organization, src, ...props }, ref) => {
  const { animations, expanded } = useSidenavContext("SidenavAccountItem");

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

          {expanded && (
            <Transition skipAnimations={!animations}>
              <Flex flex="1" flexDirection="row" gap="8" overflowX="hidden">
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
            </Transition>
          )}
        </button>
      </Flex>
    </Flex>
  );
});

SidenavAccountItem.displayName = "@optiaxiom/react/SidenavAccountItem";
