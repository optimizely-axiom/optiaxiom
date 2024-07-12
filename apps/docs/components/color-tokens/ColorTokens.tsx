import type { Props } from "react-docgen-typescript";

import { Box, Code, Flex, Text } from "@optiaxiom/react";

import { Table, Td, Th, Tr } from "../table";
import { ColorTokenItem } from "./ColorTokenItem";

export function ColorTokens({
  namespace,
  props,
}: {
  namespace: string;
  props: Props;
}) {
  return (
    <Table>
      <thead>
        <Box asChild display={["flex", "table-row"]}>
          <tr>
            <Th flex="1">Token and description</Th>
            <Th display={["none", "table-cell"]}>Light value</Th>
            <Th display={["none", "table-cell"]}>Dark value</Th>
          </tr>
        </Box>
      </thead>
      <tbody>
        {Object.values(props)
          .filter((token) => token.name.startsWith(`${namespace}.`))
          .map((token) => (
            <Tr
              display={["flex", "table-row"]}
              flexWrap="wrap"
              key={token.name}
            >
              <Td py="16" w={["full", "auto"]}>
                <Flex alignItems="start">
                  <Code px="8" py="4" rounded="sm">
                    {token.name}
                  </Code>
                  {token.description && <Text>{token.description}</Text>}
                </Flex>
              </Td>
              <Td py="16" w="160">
                <ColorTokenItem mode="light" token={token} />
              </Td>
              <Td py="16" w="160">
                <ColorTokenItem mode="dark" token={token} />
              </Td>
            </Tr>
          ))}
      </tbody>
    </Table>
  );
}
