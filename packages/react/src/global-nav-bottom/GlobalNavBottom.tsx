import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";

export type GlobalNavBottomProps = BoxProps<
  "div",
  {
    collapse?: boolean;
  }
>;

export const GlobalNavBottom = ({ children }: GlobalNavBottomProps) => {
  return (
    <Flex>
      <Box>
        <Button>Collapse</Button>
      </Box>
      {children}
    </Flex>
  );
};

export default GlobalNavBottom;
