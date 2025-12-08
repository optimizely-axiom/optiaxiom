import { Box, Code, Group, Text } from "@optiaxiom/react";
import * as Components from "@optiaxiom/react";
import * as UnstableComponents from "@optiaxiom/react/unstable";
import { getDocs } from "@optiaxiom/shared";
import { Link } from "nextra-theme-docs";
import { compileMdx } from "nextra/compile";
import { MDXRemote } from "nextra/mdx-remote";
import { type ReactNode } from "react";

import { PropType } from "../prop-type";
import { Table, Td, Th, Thead, Tr } from "../table";

type AllComponents = keyof typeof Components | keyof typeof UnstableComponents;

export async function PropsTable({ component }: { component: AllComponents }) {
  const docs = getDocs();
  const doc = docs.find(
    (doc) => doc.displayName === `@optiaxiom/react/${component}`,
  );
  if (!doc) {
    throw new Error(`Could not find component doc: ${component}`);
  }
  const propItems = doc.props;

  const baseName = doc.tags.extends || "";
  const baseNameScope = doc.tags.group || baseName;
  const isBox = component === "Box";
  const virtual = !propItems.find((prop) => prop.name === "asChild");

  return (
    <>
      <PropsTableDescription
        baseName={baseName}
        name={component as AllComponents}
        virtual={virtual}
      >
        {baseName && !isBox && (
          <>
            Supports all{" "}
            <Link href={`/components/${kebabCase(baseNameScope)}`}>
              {baseName}
            </Link>{" "}
            props
            {propItems && propItems?.length > 0
              ? " in addition to its own"
              : ""}
            .{" "}
          </>
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
            .filter((prop) => isBox || !prop.sprinkle || prop.defaultValue)
            .map(async (prop) => (
              <Tr key={prop.name}>
                <Td>
                  <Group
                    alignItems="start"
                    flexDirection={["column", "row"]}
                    gap="12"
                  >
                    <Box
                      asChild
                      fontFamily="mono"
                      style={{ color: "var(--shiki-token-function)" }}
                      w="1/4"
                      whiteSpace="nowrap"
                    >
                      <code>
                        {prop.name}
                        {prop.required ? "*" : ""}
                      </code>
                    </Box>
                    <Group flex="1" flexDirection="column" gap="12">
                      {prop.description && (
                        <MDXRemote
                          compiledSource={await compileMdx(
                            prop.description
                              .replaceAll(
                                /{@link ([^\s}]+)(?:\s([^}]+))}/g,
                                "[$2]($1)",
                              )
                              .replaceAll(/{@link ([^}]+)}/g, "[$1]($1)")
                              .replaceAll(
                                "https://optimizely-axiom.github.io/optiaxiom",
                                "",
                              )
                              .replaceAll(
                                /@example ([^@]+)/g,
                                "\n\n```\n$1\n```\n",
                              )
                              .replaceAll("@see", "\n\n"),
                          )}
                          components={{
                            p: ({ ...props }) => (
                              <Box asChild>
                                <p {...props} />
                              </Box>
                            ),
                          }}
                        />
                      )}
                      <PropType prop={prop} />
                    </Group>
                  </Group>
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
  baseName,
  children,
  name,
  virtual,
}: {
  baseName: string;
  children?: ReactNode;
  name: AllComponents;
  virtual?: boolean;
}) {
  return (
    <Text fontSize="lg" mt="16">
      {children}
      {matches(["Tooltip"], name) ? (
        <>
          Doesn&apos;t render its own HTML element and forwards all props to the{" "}
          <Code>content</Code> component instead.
        </>
      ) : matches(["ModalLayer"], name) ? (
        <>
          Renders a <Code>&lt;div&gt;</Code> element.
        </>
      ) : matches(["Avatar", "Badge", "Skeleton"], name) ? (
        <>
          Renders a <Code>&lt;span&gt;</Code> element.
        </>
      ) : matches(["Button"], baseName, name) ? (
        <>
          Renders a <Code>&lt;button&gt;</Code> element.
        </>
      ) : matches(["CardImage"], name) ? (
        <>
          Renders an <Code>&lt;img&gt;</Code> element.
        </>
      ) : matches(["Code"], name) ? (
        <>
          Renders a <Code>&lt;code&gt;</Code> element.
        </>
      ) : matches(["Checkbox", "Radio", "Switch"], baseName, name) ? (
        <>
          Renders a <Code>&lt;div&gt;</Code> element but forwards all props to a
          hidden <Code>&lt;input&gt;</Code> element.
        </>
      ) : matches(["DialogForm"], name) ? (
        <>
          Renders a <Code>&lt;form&gt;</Code> element.
        </>
      ) : matches(["Heading"], name) ? (
        <>
          Renders an <Code>&lt;h1&gt;</Code> element.
        </>
      ) : matches(["Input", "Textarea"], baseName, name) ? (
        <>
          Renders a <Code>&lt;div&gt;</Code> element but forwards all props to
          an inner{" "}
          <Code>&lt;{name === "Textarea" ? "textarea" : "input"}&gt;</Code>{" "}
          element.
        </>
      ) : matches(["Kbd"], name) ? (
        <>
          Renders a <Code>&lt;kbd&gt;</Code> element.
        </>
      ) : matches(["HoverCardTrigger", "Link"], baseName, name) ? (
        <>
          Renders an <Code>&lt;a&gt;</Code> element.
        </>
      ) : matches(["NavAccountItem", "NavItem", "SidebarToggle"], name) ? (
        <>
          Renders an <Code>&lt;li&gt;</Code> element element but forwards all
          props to an inner <Code>&lt;button&gt;</Code> element.
        </>
      ) : matches(["NavGroup"], name) ? (
        <>
          Renders an <Code>&lt;li&gt;</Code> element element but forwards all
          props to an inner <Code>&lt;div&gt;</Code> element.
        </>
      ) : matches(["NavGroupContent", "NavList"], name) ? (
        <>
          Renders a <Code>&lt;ul&gt;</Code> element.
        </>
      ) : matches(["Table"], name) ? (
        <>
          Renders a <Code>&lt;table&gt;</Code> element.
        </>
      ) : matches(["TableBody"], name) ? (
        <>
          Renders a <Code>&lt;tbody&gt;</Code> element.
        </>
      ) : matches(["TableCell"], name) ? (
        <>
          Renders a <Code>&lt;td&gt;</Code> element.
        </>
      ) : matches(["TableHeader"], name) ? (
        <>
          Renders a <Code>&lt;thead&gt;</Code> element.
        </>
      ) : matches(["TableHeaderCell"], name) ? (
        <>
          Renders a <Code>&lt;th&gt;</Code> element.
        </>
      ) : matches(["TableRow"], name) ? (
        <>
          Renders a <Code>&lt;tr&gt;</Code> element.
        </>
      ) : matches(["Text"], baseName, name) ? (
        <>
          Renders a <Code>&lt;p&gt;</Code> element.
        </>
      ) : virtual ? (
        "Doesn't render its own HTML element."
      ) : (
        <>
          Renders a <Code>&lt;div&gt;</Code> element.
        </>
      )}
    </Text>
  );
}

const matches = (
  items: ("" | AllComponents)[],
  baseName: string,
  name?: AllComponents,
) =>
  items.includes(baseName as "" | AllComponents) ||
  (name && items.includes(name));
