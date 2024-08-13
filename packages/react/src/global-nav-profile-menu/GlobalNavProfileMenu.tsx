import type { ReactNode } from "react";

import { Box, type BoxProps } from "../box";
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
    <Flex {...styles.wrapper()}>
      <Box asChild {...styles.picture()}>
        {avatar}
      </Box>
      <Flex {...styles.userInfo()}>
        <Text fontWeight="500">{name}</Text>
        <Text fontSize="sm">{organization}</Text>
      </Flex>
      <Box alignItems="center" justifyContent="center">
        <IconEllipsis />
      </Box>
    </Flex>
  );
};

export default GlobalNavProfileMenu;
