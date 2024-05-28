import type { Props } from "react-docgen-typescript";

import { Box, Code, Flex, Text } from "@optiaxiom/react";

import { Table, Td, Th, Tr } from "../table";
import { ColorTokenItem } from "./ColorTokenItem";

export function ColorTokens({
  dark,
  light,
  namespace,
}: {
  dark: Props;
  light: Props;
  namespace: string;
}) {
  const palette = Object.fromEntries(
    Object.values(light)
      .filter(
        (token) =>
          !token.name.startsWith("bg.") && !token.name.startsWith("fg."),
      )
      .map((token) => [token.type.name, token]),
  );

  return (
    <Table>
      <thead>
        <Box asChild display={["flex", "table-row"]}>
          <tr>
            <Th grow="1">Token and description</Th>
            <Th display={["none", "table-cell"]}>Light value</Th>
            <Th display={["none", "table-cell"]}>Dark value</Th>
          </tr>
        </Box>
      </thead>
      <tbody>
        {Object.values(light)
          .filter((token) => token.name.startsWith(`${namespace}.`))
          .map((token) => (
            <Tr
              display={["flex", "table-row"]}
              flexWrap="wrap"
              key={token.name}
            >
              <Td py="16" w={["full", "auto"]}>
                <Flex alignItems="start">
                  <Code fontFamily="mono" px="8" py="4" rounded="sm">
                    {token.name}
                  </Code>
                  {token.description && <Text>{token.description}</Text>}
                </Flex>
              </Td>
              <Td py="16" w="160">
                <ColorTokenItem
                  mode="light"
                  token={token}
                  value={palette[token.type.name]}
                />
              </Td>
              <Td py="16" w="160">
                <ColorTokenItem
                  mode="dark"
                  token={dark[token.name]}
                  value={palette[dark[token.name].type.name]}
                />
              </Td>
            </Tr>
          ))}
      </tbody>
    </Table>
  );
}
