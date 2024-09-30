import * as RadixCollapsible from "@radix-ui/react-collapsible";
import {
  type ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { IconEllipsis } from "../icons/IconEllipsis";
import { Text } from "../text";

export type GlobalNavProfileMenuProps = BoxProps<
  "div",
  {
    avatar: ReactNode;
    name?: string;
    organization?: string;
  }
>;

export const GlobalNavAccount = forwardRef<
  HTMLButtonElement,
  GlobalNavProfileMenuProps
>(({ avatar, name, organization, ...props }, ref) => {
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

            <RadixCollapsible.Content asChild>
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
            </RadixCollapsible.Content>
          </button>
        </Flex>
      </li>
    </Flex>
  );
});

GlobalNavAccount.displayName = "@optiaxiom/react/GlobalNavAccount";
