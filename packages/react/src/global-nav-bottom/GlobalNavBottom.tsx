import { type BoxProps } from "../box";
import { Flex } from "../flex";

export type GlobalNavBottomProps = BoxProps<"div">;

export const GlobalNavBottom = ({
  children,
  ...props
}: GlobalNavBottomProps) => {
  return (
    <Flex mt="auto" {...props}>
      {children}
    </Flex>
  );
};

export default GlobalNavBottom;
