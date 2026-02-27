"use client";

import {
  Box,
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
  Heading,
  Separator,
  Text,
} from "@optiaxiom/react";

import { getPropsForType } from "../schemaUtils";
import { PropEditor } from "./PropEditor";

interface PropertyInspectorProps {
  dataKeys?: string[];
  node: unknown;
  onSetValue: (path: string, value: unknown) => void;
  onUpdate: (path: string, props: Record<string, unknown>) => void;
  path: null | string;
}

export function PropertyInspector({
  dataKeys,
  node,
  onSetValue,
  onUpdate,
  path,
}: PropertyInspectorProps) {
  if (node == null || path === null) {
    return (
      <Box display="flex" flexDirection="column" gap="8" p="16">
        <Text color="fg.tertiary" fontSize="sm">
          Select an element to edit its properties
        </Text>
      </Box>
    );
  }

  if (typeof node === "string") {
    return (
      <Box display="flex" flexDirection="column" gap="8" overflow="auto" p="12">
        <Heading fontSize="sm" level="3">
          Text Fragment
        </Heading>

        <Separator />

        <PropEditor
          name="value"
          onUpdate={(value) => onSetValue(path, value)}
          prop={{
            optional: false,
            type: "string",
          }}
          value={node}
        />
      </Box>
    );
  }

  if (typeof node !== "object") return null;

  const obj = node as Record<string, unknown>;
  const type = String(obj.$type ?? "");

  const allProps = getPropsForType(type);
  const coreProps = allProps.filter(
    (p) => p.isCore && !["actions", "body", "children"].includes(p.name),
  );
  const styleProps = allProps.filter((p) => !p.isCore);

  // Handle string children inline
  const childrenProp = allProps.find((p) => p.name === "children");
  const hasStringChildren = typeof obj.children === "string";

  return (
    <Box display="flex" flexDirection="column" gap="8" overflow="auto" p="12">
      <Heading fontSize="sm" level="3">
        {type}
      </Heading>

      <Separator />

      <Box display="flex" flexDirection="column" gap="8">
        {/* String children */}
        {childrenProp && hasStringChildren && (
          <PropEditor
            name="children"
            onUpdate={(value) => onUpdate(path, { children: value })}
            prop={{ ...childrenProp, type: "string" }}
            value={obj.children}
          />
        )}

        {/* Core props */}
        {coreProps.map((prop) => (
          <PropEditor
            dataKeys={dataKeys}
            key={prop.name}
            name={prop.name}
            onUpdate={(value) => onUpdate(path, { [prop.name]: value })}
            prop={prop}
            value={obj[prop.name]}
          />
        ))}

        {/* Style props toggle */}
        {styleProps.length > 0 && (
          <>
            <Separator mt="8" />

            <Disclosure maxW="sm" w="full">
              <DisclosureTrigger>Style Props</DisclosureTrigger>
              <DisclosureContent display="flex" flexDirection="column" gap="8">
                {styleProps.map((prop) => (
                  <PropEditor
                    key={prop.name}
                    name={prop.name}
                    onUpdate={(value) => onUpdate(path, { [prop.name]: value })}
                    prop={prop}
                    value={obj[prop.name]}
                  />
                ))}
              </DisclosureContent>
            </Disclosure>
          </>
        )}
      </Box>
    </Box>
  );
}
