import { type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Text } from "../text";
import * as styles from "./GlobalNavItem.css";

export type GlobalNavItemProps = BoxProps<
  "div",
  {
    icon?: ReactNode;
    label?: ReactNode;
  }
>;

export const GlobalNavItem = ({ icon, label }: GlobalNavItemProps) => {
  return (
    <Box {...styles.item()}>
      {icon && <Box>{icon}</Box>}
      {label && <Text>{label}</Text>}
    </Box>
  );
};

export default GlobalNavItem;
