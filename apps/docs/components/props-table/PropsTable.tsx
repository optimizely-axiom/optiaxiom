import type { PropItem } from "react-docgen-typescript";

import { Box, Text } from "@optiaxiom/react";
import { Link } from "nextra-theme-docs";
import {
  Children,
  type ComponentType,
  isValidElement,
  type ReactNode,
} from "react";

import { PropType } from "../prop-type";
import { Table, Td, Th, Thead, Tr } from "../table";

export function PropsTable({
  base,
  children,
  component,
  exclude = [],
  propItems,
}: {
  base?: ComponentType | false;
  children: ReactNode;
  component: ComponentType;
  exclude?: string[];
  propItems: PropItem[];
}) {
  const descriptions = Object.fromEntries(
    Children.toArray(children)
      .filter((child) => isValidElement(child))
      .map((child) => [child.props.name, child.props.children]),
  );
  const isBox = component.displayName?.endsWith("/Box");

  const baseName =
    base && "displayName" in base && base?.displayName
      ? base.displayName.replace("@optiaxiom/react/", "")
      : isBox || base === false
        ? null
        : "Box";

  return (
    <>
      {baseName && (
        <Text fontSize="lg" mt="md">
          Supports all{" "}
          {["InputBase"].includes(baseName) ? (
            baseName
          ) : (
            <Link href={`/components/${kebabCase(baseName)}#props`}>
              {baseName}
            </Link>
          )}{" "}
          props
          {propItems && propItems?.length > 0 ? " in addition to its own" : ""}.
        </Text>
      )}
      <Table>
        <Thead>
          <tr>
            <Th display={["none", "table-cell"]} style={{ width: "25%" }}>
              Name
            </Th>
            <Th style={{ width: "75%" }}>Type</Th>
          </tr>
        </Thead>
        <tbody>
          {propItems
            ?.filter((prop) => !exclude.includes(prop.name))
            .map((prop) => (
              <Tr
                display={["flex", "table-row"]}
                flexWrap="wrap"
                key={prop.name}
              >
                <Td w={["full", "auto"]} whiteSpace="nowrap">
                  <Box
                    fontFamily="mono"
                    style={{ color: "var(--shiki-token-function)" }}
                  >
                    {prop.name}
                    {prop.required ? "*" : ""}
                  </Box>
                </Td>
                <Td>
                  <PropType component={component} prop={prop} />
                  {descriptions[prop.name]}
                </Td>
              </Tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

function kebabCase(str: string) {
  return str.replaceAll(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
