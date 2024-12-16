import { IconBox } from "./IconBox";
import { IconText } from "./IconText";

export const SkeletonIcon = () => (
  <IconBox display="flex" flexDirection="column" gap="4" w="56">
    <IconText animation="pulse" w="2/3" />
    <IconText animation="pulse" intent="secondary" p="4" />
    <IconText animation="pulse" intent="secondary" />
  </IconBox>
);
