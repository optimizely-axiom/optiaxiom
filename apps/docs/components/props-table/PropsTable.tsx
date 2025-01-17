import { Box, Code, Flex, Text } from "@optiaxiom/react";
import { Link } from "nextra-theme-docs";
import { compileMdx } from "nextra/compile";
import { MDXRemote } from "nextra/mdx-remote";
import { type ReactNode } from "react";

import type { components } from "./components";

import { PropType } from "../prop-type";
import { Table, Td, Th, Thead, Tr } from "../table";

const mapComponentToBase: Record<string, string> = {
  AlertDialogAction: "Button",
  AlertDialogCancel: "Button",
  AlertDialogTrigger: "Button",
  AutocompleteTrigger: "Input",
  ComboboxInput: "Input",
  ComboboxSeparator: "Separator",
  ComboboxTrigger: "Button",
  DialogClose: "Button",
  DialogTrigger: "Button",
  DisclosureTrigger: "Button",
  DropdownMenuSeparator: "Separator",
  DropdownMenuTrigger: "Button",
  Heading: "Text",
  KBd: "Code",
  ModalLayer: "",
  PopoverTrigger: "Button",
  SearchInput: "Input",
  SegmentedControlItem: "Button",
  SelectSeparator: "Separator",
  SelectTrigger: "Button",
  SidenavItem: "Button",
  SidenavToggle: "Button",
  TabsTrigger: "Button",
  ToastAction: "Button",
  ToastTitle: "Text",
  ToggleButton: "Button",
};

export async function PropsTable({
  component,
}: {
  component: (typeof components)[keyof typeof components];
}) {
  const componentName = component["name"];
  const propItems = await component["props"];

  const baseName =
    mapComponentToBase[componentName] ??
    (propItems.find((prop) => prop.name === "asChild") ? "Box" : "");
  const isBox = componentName === "Box";

  return (
    <>
      <PropsTableDescription baseName={baseName} name={componentName}>
        {baseName && !isBox && (
          <>
            Supports all{" "}
            <Link href={`/components/${kebabCase(baseName)}#props`}>
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
          {propItems.map(async (prop) => (
            <Tr key={prop.name}>
              <Td>
                <Flex
                  alignItems="start"
                  flexDirection={["column", "row"]}
                  gap="12"
                >
                  <Box
                    fontFamily="mono"
                    style={{ color: "var(--shiki-token-function)" }}
                    w="1/4"
                    whiteSpace="nowrap"
                  >
                    {prop.name}
                    {prop.required ? "*" : ""}
                  </Box>
                  <Flex flex="1" gap="12">
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
                            .replaceAll(/@example .+/g, "\n\n")
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
  baseName,
  children,
  name,
}: {
  baseName: string;
  children?: ReactNode;
  name: string;
}) {
  return (
    <Text fontSize="lg" mt="16">
      {children}
      {name === "Tooltip" ? (
        <>
          Doesn&apos;t render its own HTML element and forwards all props to the{" "}
          <Code>content</Code> component instead.
        </>
      ) : ["ModalLayer", "ToastTitle"].includes(name) ? (
        <>
          Renders a <Code>&lt;div&gt;</Code> element.
        </>
      ) : name !== "Box" && !children ? (
        "Doesn't render its own HTML element."
      ) : ["SidenavAccountItem"].includes(name) ? (
        <>
          Renders a <Code>&lt;button&gt;</Code> element.
        </>
      ) : ["Avatar", "Badge", "Skeleton"].includes(name) ? (
        <>
          Renders a <Code>&lt;span&gt;</Code> element.
        </>
      ) : matches(["Button"], baseName, name) ? (
        <>
          Renders a <Code>&lt;button&gt;</Code> element.
        </>
      ) : ["Code"].includes(name) ? (
        <>
          Renders a <Code>&lt;code&gt;</Code> element.
        </>
      ) : ["Checkbox", "Radio", "Switch"].includes(name) ? (
        <>
          Renders a <Code>&lt;div&gt;</Code> element but forwards all props to a
          hidden <Code>&lt;input&gt;</Code> element.
        </>
      ) : ["DialogForm"].includes(name) ? (
        <>
          Renders a <Code>&lt;form&gt;</Code> element.
        </>
      ) : ["Heading"].includes(name) ? (
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
      ) : ["Kbd"].includes(name) ? (
        <>
          Renders a <Code>&lt;kbd&gt;</Code> element.
        </>
      ) : ["Link"].includes(name) ? (
        <>
          Renders an <Code>&lt;a&gt;</Code> element.
        </>
      ) : ["Table"].includes(name) ? (
        <>
          Renders a <Code>&lt;table&gt;</Code> element.
        </>
      ) : ["TableBody"].includes(name) ? (
        <>
          Renders a <Code>&lt;tbody&gt;</Code> element.
        </>
      ) : ["TableCell"].includes(name) ? (
        <>
          Renders a <Code>&lt;td&gt;</Code> element.
        </>
      ) : ["TableHeader"].includes(name) ? (
        <>
          Renders a <Code>&lt;thead&gt;</Code> element.
        </>
      ) : ["TableHeaderCell"].includes(name) ? (
        <>
          Renders a <Code>&lt;th&gt;</Code> element.
        </>
      ) : ["TableRow"].includes(name) ? (
        <>
          Renders a <Code>&lt;tr&gt;</Code> element.
        </>
      ) : matches(["Text"], baseName, name) ? (
        <>
          Renders a <Code>&lt;p&gt;</Code> element.
        </>
      ) : (
        <>
          Renders a <Code>&lt;div&gt;</Code> element.
        </>
      )}
    </Text>
  );
}

const matches = (items: string[], baseName: string, name: string) =>
  items.includes(baseName) || items.includes(name);
