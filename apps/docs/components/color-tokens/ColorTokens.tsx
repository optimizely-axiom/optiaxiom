import type { Props } from "react-docgen-typescript";

import { Box, Code, Flex, type Sprinkles, Text } from "@optiaxiom/react";

import { Table, Td, Th, Thead, Tr } from "../table";
import { ColorTokenItem } from "./ColorTokenItem";

export function ColorTokens({
  namespace,
  props,
}: {
  namespace: string;
  props: Props;
}) {
  const palette = Object.fromEntries(
    Object.values(props)
      .filter(
        (token) =>
          !token.name.startsWith("bg.") && !token.name.startsWith("fg."),
      )
      .map((token) => [JSON.parse(token.type.name), token.name]),
  );

  const getNames = (value: string) => {
    return value.replaceAll(/#[0-9a-f]+/gi, (color) => palette[color]);
  };

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
              <Td pb="16" pt={["0", "16"]} w={["full", "160"]}>
                <ColorTokenItem
                  flexDirection={["row", "row-reverse"]}
                  item={{
                    bg: token.name as Sprinkles["bg"],
                    name: getNames(JSON.parse(token.type.name)),
                    value: JSON.parse(token.type.name),
                  }}
                />
              </Td>
            </Tr>
          ))}
      </tbody>
    </Table>
  );
}
