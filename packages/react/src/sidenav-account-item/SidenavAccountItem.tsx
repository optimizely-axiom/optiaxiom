import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { IconEllipsis } from "../icons/IconEllipsis";
import { useSidenavContext } from "../sidenav-context";
import { Text } from "../text";
import { Transition } from "../transition";

export type SidenavAccountItemProps = BoxProps<
  "div",
  {
    avatar: ReactNode;
    name?: string;
    organization?: string;
  }
>;

export const SidenavAccountItem = forwardRef<
  HTMLButtonElement,
  SidenavAccountItemProps
>(({ avatar, name, organization, ...props }, ref) => {
  const { animations, expanded } = useSidenavContext("SidenavAccountItem");

  return (
    <Flex asChild my="8">
      <li>
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
            <Box asChild flex="none" my="2" rounded="sm">
              {avatar}
            </Box>

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
      </li>
    </Flex>
  );
});

SidenavAccountItem.displayName = "@optiaxiom/react/SidenavAccountItem";
