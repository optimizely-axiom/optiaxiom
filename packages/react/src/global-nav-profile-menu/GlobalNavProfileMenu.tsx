import type { ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { Text } from "../text";
import * as styles from "./GlobalNavProfileMenu.css";

export type GlobalNavProfileMenuProps = BoxProps<
  "div",
  {
    avatar: ReactNode;
    organization: string;
    username: string;
  }
>;

export const GlobalNavProfileMenu = ({
  avatar,
  organization,
  username,
}: GlobalNavProfileMenuProps) => {
  return (
    <Box {...styles.profileMenu()}>
      {avatar}
      <Flex {...styles.userInfo()}>
        <Text>{username}</Text>
        <Text>{organization}</Text>
      </Flex>
    </Box>
  );
};

export default GlobalNavProfileMenu;
