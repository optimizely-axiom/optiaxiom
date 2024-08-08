import { Box, type BoxProps } from "../box";

export type GlobalNavListProps = BoxProps<"div">;

export const GlobalNavList = ({ children }: GlobalNavListProps) => {
  return <Box>{children}</Box>;
};

export default GlobalNavList;
