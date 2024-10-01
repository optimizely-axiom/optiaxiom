import {
  type ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { useGlobalNavContext } from "../global-nav-context";
import { IconEllipsis } from "../icons/IconEllipsis";
import { Text } from "../text";
import { Transition } from "../transition";

export type GlobalNavProfileMenuProps = BoxProps<
  "div",
  {
    avatar: ReactNode;
    name?: string;
    organization?: string;
  }
>;

export const GlobalNavAccountItem = forwardRef<
  HTMLButtonElement,
  GlobalNavProfileMenuProps
>(({ avatar, name, organization, ...props }, ref) => {
  const { animations, expanded } = useGlobalNavContext("GlobalNavAccountItem");

  return (
    <Flex asChild my="xs">
      <li>
        <Flex
          asChild
          flexDirection="row"
          gap="xs"
          p="4"
          textAlign="start"
          {...props}
        >
          <button ref={ref}>
            <Box asChild flex="none" my="2">
              {isValidElement<BoxProps>(avatar) &&
                cloneElement(avatar, { rounded: "sm" })}
            </Box>

            {expanded && (
              <Transition skipAnimations={!animations}>
                <Flex flex="1" flexDirection="row" gap="xs" overflowX="hidden">
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

GlobalNavAccountItem.displayName = "@optiaxiom/react/GlobalNavAccountItem";
