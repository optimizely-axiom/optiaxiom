import type { PropItem } from "react-docgen-typescript";

import { Box, Code, Flex, Text } from "@optiaxiom/react";
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

  if (
    !propItems.find((prop) => prop.name === "asChild") &&
    base === undefined
  ) {
    base = false;
  }

  const baseName =
    base && "displayName" in base && base?.displayName
      ? base.displayName.replace("@optiaxiom/react/", "")
      : isBox || base === false
        ? null
        : "Box";

  return (
    <>
      <PropsTableDescription
        name={component.displayName?.replace("@optiaxiom/react/", "")}
      >
        {baseName && (
          <Text fontSize="lg" mt="16">
            Supports all{" "}
            <Link href={`/components/${kebabCase(baseName)}#props`}>
              {baseName}
            </Link>{" "}
            props
            {propItems && propItems?.length > 0
              ? " in addition to its own"
              : ""}
            .
          </Text>
        )}
      </PropsTableDescription>
      <Table>
        <Thead>
          <tr>
            <Th>Prop</Th>
          </tr>
        </Thead>
        <tbody>
          {propItems
            ?.filter((prop) => !exclude.includes(prop.name))
            .map((prop) => (
              <Tr key={prop.name}>
                <Td>
                  <Flex alignItems="start" flexDirection={["column", "row"]}>
                    <Box
                      fontFamily="mono"
                      style={{ color: "var(--shiki-token-function)" }}
                      w="1/4"
                      whiteSpace="nowrap"
                    >
                      {prop.name}
                      {prop.required ? "*" : ""}
                    </Box>
                    <Flex flex="1">
                      {Children.toArray(descriptions[prop.name]).map(
                        (child, index) => (
                          <Box asChild key={index}>
                            {child}
                          </Box>
                        ),
                      )}
                      <PropType component={component} prop={prop} />
                    </Flex>
                  </Flex>
                </Td>
              </Tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

function kebabCase(str: string) {
  return str === "Box"
    ? ""
    : str.replaceAll(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function PropsTableDescription({
  children,
  name,
}: {
  children?: ReactNode;
  name?: string;
}) {
  return (
    <>
      {children}
      {(name === "Checkbox" || name === "Radio" || name === "Switch") && (
        <Text fontSize="lg" mt="16">
          <Code>{name}</Code> is extended from <Code>input</Code> and supports
          all props that <Code>input</Code> supports.
        </Text>
      )}
      {(name === "Input" || name === "Textarea") && (
        <Text fontSize="lg" mt="16">
          <Code>{name}</Code> is extended from the{" "}
          <Code>{name.toLowerCase()}</Code> HTML element and supports all props
          that <Code>{name.toLowerCase()}</Code> supports.
        </Text>
      )}
      {name === "Tooltip" && (
        <Text fontSize="lg" mt="16">
          <Code>{name}</Code> forwards all props to the <Code>content</Code>{" "}
          component.
        </Text>
      )}
    </>
  );
}
