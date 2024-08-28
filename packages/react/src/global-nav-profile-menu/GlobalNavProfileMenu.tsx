import type { ReactNode } from "react";

import * as RadixCollapsible from "@radix-ui/react-collapsible";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
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

export const GlobalNavProfileMenu = ({
  avatar,
  name,
  organization,
}: GlobalNavProfileMenuProps) => {
  return (
    <Flex alignItems="center" flexDirection="row" gap="xs" px="md" py="xs">
      <Box asChild rounded="sm" size="md">
        {avatar}
      </Box>

      <Flex asChild flexDirection="row">
        <RadixCollapsible.Content>
          <Flex flex="1" gap="0">
            <Text fontWeight="500">{name}</Text>
            <Text fontSize="sm">{organization}</Text>
          </Flex>
          <Button appearance="secondary" icon={<IconEllipsis />} />
        </RadixCollapsible.Content>
      </Flex>
    </Flex>
  );
};

export default GlobalNavProfileMenu;
