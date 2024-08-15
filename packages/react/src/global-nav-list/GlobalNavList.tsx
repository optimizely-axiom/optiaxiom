import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { useGlobalNav } from "../global-nav-context";
import { GlobalNavItem } from "../global-nav-item";
import { IconAngleLeft } from "../icons/IconAngleLeft";
import * as styles from "./GlobalNavList.css";
export type GlobalNavListProps = BoxProps<"div">;

export const GlobalNavList = ({
  children,
  className,
  ...props
}: GlobalNavListProps) => {
  const { toggleCollapsed } = useGlobalNav();
  return (
    <Flex {...styles.list({}, className)} {...props}>
      <Box flex="1">{children}</Box>
      <GlobalNavItem
        mt="auto"
        onClick={toggleCollapsed}
        startDecorator={<IconAngleLeft />}
      >
        Collapse
      </GlobalNavItem>
    </Flex>
  );
};

export default GlobalNavList;
