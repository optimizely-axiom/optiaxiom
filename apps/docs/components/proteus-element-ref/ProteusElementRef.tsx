import { Box, Group, Text } from "@optiaxiom/react";
import { Fragment, type ReactNode } from "react";

import schema from "../../../../packages/proteus/src/schema/public-schema.json";
import { Table, Td, Th, Thead, Tr } from "../table";

type SchemaDefinition = {
  properties: Record<string, SchemaProperty>;
  required?: string[];
};

type SchemaProperty = {
  $ref?: string;
  anyOf?: SchemaProperty[];
  const?: string;
  description?: string;
  enum?: string[];
  type?: string;
};

function renderDescription(text: string): ReactNode[] {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code key={i}>{part.slice(1, -1)}</code>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

const definitions = (
  schema as unknown as { definitions: Record<string, SchemaDefinition> }
).definitions;

export function ProteusElementRef({ type }: { type: string }) {
  const def = definitions[`Proteus${type}`];
  if (!def) {
    throw new Error(`Could not find schema definition: Proteus${type}`);
  }
  const required = new Set(def.required ?? []);
  const entries = Object.entries(def.properties).filter(
    ([name, prop]) => name !== "$type" && !isSprinkleRef(prop),
  );

  if (entries.length === 0) {
    return (
      <Text fontSize="lg" mt="16">
        Accepts only <code>$type</code> plus the standard styling props.
      </Text>
    );
  }

  return (
    <Table>
      <Thead>
        <tr>
          <Th>Prop</Th>
        </tr>
      </Thead>
      <tbody>
        {entries.map(([name, prop]) => (
          <Tr key={name}>
            <Td>
              <Group
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
                  <code>{required.has(name) ? `${name}*` : name}</code>
                </Box>
                <Group flex="1" flexDirection="column" gap="8">
                  {prop.description && (
                    <Text>{renderDescription(prop.description)}</Text>
                  )}
                  <Text>
                    <Box asChild fontFamily="mono">
                      <code style={{ color: "var(--shiki-token-function)" }}>
                        {renderType(prop)}
                      </code>
                    </Box>
                  </Text>
                </Group>
              </Group>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}

function isSprinkleRef(prop: SchemaProperty): boolean {
  return Boolean(prop.$ref?.startsWith("#/definitions/SprinkleProp_"));
}

function refName(ref: string): string {
  const name = ref.replace("#/definitions/", "");
  return name.startsWith("Proteus") ? name.slice("Proteus".length) : name;
}

function renderType(prop: SchemaProperty): string {
  if (prop.const !== undefined) return JSON.stringify(prop.const);
  if (prop.enum) return prop.enum.map((v) => JSON.stringify(v)).join(" | ");
  if (prop.$ref) return refName(prop.$ref);
  if (prop.anyOf) {
    return prop.anyOf
      .map((sub) => renderType(sub))
      .filter((s, i, arr) => arr.indexOf(s) === i)
      .join(" | ");
  }
  if (prop.type === "array") return "Array";
  if (prop.type) return prop.type;
  return "any";
}
