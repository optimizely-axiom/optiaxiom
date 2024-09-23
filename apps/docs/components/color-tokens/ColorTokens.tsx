import type { Props } from "react-docgen-typescript";

import { Box, Code, Flex, type Sprinkles, Text } from "@optiaxiom/react";

import { Table, Td, Th, Thead, Tr } from "../table";
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
      <Thead>
        <Box asChild display={["flex", "table-row"]}>
          <tr>
            <Th flex="1">Token and description</Th>
            <Th display={["none", "table-cell"]}>Value</Th>
          </tr>
        </Box>
      </Thead>
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
                  <Code px="8" py="4" rounded="sm">
                    {token.name}
                  </Code>
                  {token.description && <Text>{token.description}</Text>}
                </Flex>
              </Td>
              <Td pb="16" pt={["0", "16"]} w={["full", "160"]}>
                <ColorTokenItem
                  flexDirection={["row", "row-reverse"]}
                  item={{
                    bg: token.name as Sprinkles["bg"],
                    name: `ld(${palette[token.type.name].name}, ${palette[dark[token.name].type.name].name})`,
                    value: `ld(${JSON.parse(
                      palette[token.type.name].type.name,
                    )}, ${JSON.parse(
                      palette[dark[token.name].type.name].type.name,
                    )})`,
                  }}
                />
              </Td>
            </Tr>
          ))}
      </tbody>
    </Table>
  );
}
