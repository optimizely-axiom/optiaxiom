import type { Props } from "react-docgen-typescript";

import { Code, Flex, Text } from "@optiaxiom/react";

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
        <tr>
          <Th>Token and description</Th>
          <Th>Light value</Th>
          <Th>Dark value</Th>
        </tr>
      </thead>
      <tbody>
        {Object.values(light)
          .filter((token) => token.name.startsWith(`${namespace}.`))
          .map((token) => (
            <Tr key={token.name}>
              <Td py="16">
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
