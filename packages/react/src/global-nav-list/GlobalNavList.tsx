import * as RadixCollapsible from "@radix-ui/react-collapsible";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { GlobalNavItem } from "../global-nav-item";
import { IconAngleLeft } from "../icons/IconAngleLeft";
import * as styles from "./GlobalNavList.css";
export type GlobalNavListProps = BoxProps<"div">;

export const GlobalNavList = ({
  children,
  className,
  ...props
}: GlobalNavListProps) => {
  return (
    <Flex {...styles.list({}, className)} {...props}>
      <Flex flex="1" gap="4" justifyContent="start" w="full">
        {children}
      </Flex>

      <RadixCollapsible.Trigger asChild>
        <GlobalNavItem startDecorator={<IconAngleLeft />}>
          Collapse
        </GlobalNavItem>
      </RadixCollapsible.Trigger>
    </Flex>
  );
};

export default GlobalNavList;
