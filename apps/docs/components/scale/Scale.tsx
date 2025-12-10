import type { ComponentPropsWithoutRef } from "react";
import type { PropItem } from "react-docgen-typescript";

import { type BoxProps, sprinkles, Text } from "@optiaxiom/react";
import { getDocs } from "@optiaxiom/shared";

import { Table, Td, Th, Thead, Tr } from "../table";
import { ScaleValue } from "./ScaleValue";

const tshirts = [
  "base",
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
];

type ScaleProps = BoxProps & {
  mode?: "color";
  themeKey?: ComponentPropsWithoutRef<typeof ScaleValue>["themeKey"];
  valueLabel?: string;
  values: Record<string, string> | string;
};

export const Scale = ({
  maxH = "sm",
  mode,
  themeKey,
  valueLabel = "Styles",
  values: sprinklePropOrValues,
}: ScaleProps) => (
  <Table maxH={maxH}>
    <Thead>
      <tr>
        <Th className="x:sticky x:top-0">Name</Th>
        <Th
          className="x:sticky x:top-0"
          w={mode === "color" ? "3xl" : undefined}
        >
          {valueLabel}
        </Th>
        {mode === "color" && (
          <Th
            className="x:sticky x:top-0"
            display={["none", "table-cell"]}
            w="3xl"
          />
        )}
      </tr>
    </Thead>
    <tbody>
      {(typeof sprinklePropOrValues === "string"
        ? getPropValues(getBoxProp(sprinklePropOrValues)).map((value) => [
            value,
            sprinkles({ [sprinklePropOrValues]: value }),
          ])
        : Object.entries(sprinklePropOrValues)
      )
        .sort(([a], [b]) => {
          const aMatch = a.match(/^([0-9.]+)$/);
          const aNum = aMatch === null ? NaN : parseFloat(aMatch[1]);
          const bMatch = b.match(/^([0-9.]+)$/);
          const bNum = bMatch === null ? NaN : parseFloat(bMatch[1]);
          if (isNaN(aNum) && isNaN(bNum)) {
            if (isTShirtSizing(a) && isTShirtSizing(b))
              return tshirts.indexOf(a) - tshirts.indexOf(b);
            if (isTShirtSizing(a)) return -1;
            if (isTShirtSizing(b)) return 1;
            return a.localeCompare(b);
          }
          if (isNaN(aNum)) return isTShirtSizing(a) ? -1 : 1;
          if (isNaN(bNum)) return isTShirtSizing(b) ? 1 : -1;
          return aNum - bNum;
        })
        .map(([name, value]) => (
          <Tr key={name}>
            <Td
              valign={mode === "color" ? "middle" : undefined}
              whiteSpace="nowrap"
            >
              <Text
                asChild
                fontFamily="mono"
                style={{ color: "var(--shiki-token-string-expression)" }}
              >
                <code>{name}</code>
              </Text>
            </Td>
            <ScaleValue
              mode={mode}
              name={name}
              themeKey={themeKey}
              type={
                typeof sprinklePropOrValues === "string" || mode === "color"
                  ? "selector"
                  : "value"
              }
              value={value}
            />
          </Tr>
        ))}
    </tbody>
  </Table>
);

const getBoxProp = (name: string) => {
  const docs = getDocs();
  const doc = docs.find((doc) => doc.displayName === "@optiaxiom/react/Box");
  if (!doc) {
    throw new Error("Could not find component doc: Box");
  }

  const prop = doc.props.find((prop) => prop.name === name);
  if (!prop) {
    throw new Error(`Could not find prop type: ${name}`);
  }

  return prop;
};

const getPropValues = (prop: PropItem) =>
  (
    (prop.type.raw?.startsWith("ConditionalStyleWithResponsiveArray<")
      ? prop.type.value.slice(0, -2)
      : prop.type.value) as Array<{ value: string }>
  ).map((v) => JSON.parse(v.value) as string);

const isTShirtSizing = (str: string) => tshirts.includes(str);
