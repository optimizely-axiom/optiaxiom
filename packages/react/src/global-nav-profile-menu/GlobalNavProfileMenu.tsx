import type { ReactNode } from "react";

import * as RadixCollapsible from "@radix-ui/react-collapsible";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { IconEllipsis } from "../icons/IconEllipsis";
import { Text } from "../text";
import * as styles from "./GlobalNavProfileMenu.css";

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
    <Flex {...styles.wrapper({})}>
      <Box asChild {...styles.picture()}>
        {avatar}
      </Box>

      <RadixCollapsible.Content asChild>
        <Flex flexDirection="row">
          <Flex {...styles.userInfo()}>
            <Text fontWeight="500">{name}</Text>
            <Text fontSize="sm">{organization}</Text>
          </Flex>
          <Button appearance="secondary" icon={<IconEllipsis />} />
        </Flex>
      </RadixCollapsible.Content>
    </Flex>
  );
};

export default GlobalNavProfileMenu;
