import { Box } from "@optiaxiom/react";

import { IconBox } from "./IconBox";

export const TableIcon = () => (
  <IconBox display="grid" gap="0" gridTemplateColumns="2" p="0" w="56">
    <Box borderB="1" borderR="1" p="6" />
    <Box borderB="1" p="6" />
    <Box borderB="1" borderR="1" p="6" />
    <Box borderB="1" p="6" />
    <Box borderR="1" p="6" />
    <Box p="6" />
  </IconBox>
);
