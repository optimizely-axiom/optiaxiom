import type { ComponentPropsWithoutRef } from "react";
import type { PropItem } from "react-docgen-typescript";

import { sprinkles, Text } from "@optiaxiom/react";

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

export const Scale = ({
  hidePixels,
  hidePreview,
  keyLabel = "Name",
  maxH = "sm",
  mode,
  pixelLabel = "Pixels",
  pixelTransform,
  prop,
  valueLabel = "Value",
  values,
}: ComponentPropsWithoutRef<typeof Table> & {
  hidePixels?: boolean;
  hidePreview?: boolean;
  keyLabel?: string;
  mode?: "color";
  pixelLabel?: string;
  pixelTransform?: ComponentPropsWithoutRef<
    typeof ScaleValue
  >["pixelTransform"];
  prop?: PropItem;
  valueLabel?: string;
  values: Record<string, string> | string;
}) => (
  <Table maxH={maxH}>
    <Thead>
      <tr>
        <Th className="_sticky _top-0">{keyLabel}</Th>
        <Th className="_sticky _top-0" w={mode === "color" ? "3xl" : undefined}>
          {valueLabel}
        </Th>
        {!hidePixels && <Th className="_sticky _top-0">{pixelLabel}</Th>}
        {!hidePreview && (
          <Th
            className="_sticky _top-0"
            display={["none", "table-cell"]}
            w={mode === "color" ? "3xl" : "full"}
          />
        )}
      </tr>
    </Thead>
    <tbody>
      {(typeof values === "string" && prop
        ? getPropValues(prop).map((value) => [
            value,
            sprinkles({ [values]: value }),
          ])
        : Object.entries(values)
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
        .map(([name, size]) => (
          <Tr key={name}>
            <Td
              valign={mode === "color" ? "middle" : undefined}
              whiteSpace="nowrap"
            >
              <Text
                fontFamily="mono"
                fontSize="sm"
                fontWeight="500"
                style={{ color: "var(--shiki-token-constant)" }}
              >
                {name}
              </Text>
            </Td>
            <ScaleValue
              hidePixels={hidePixels}
              hidePreview={hidePreview}
              name={name}
              pixelTransform={pixelTransform}
              type={
                typeof values === "string" || mode === "color"
                  ? "selector"
                  : "value"
              }
              value={size}
            />
          </Tr>
        ))}
    </tbody>
  </Table>
);

const getPropValues = (prop: PropItem) =>
  (
    (prop.type.raw?.startsWith("ConditionalStyleWithResponsiveArray<")
      ? prop.type.value.slice(0, -2)
      : prop.type.value) as Array<{ value: string }>
  ).map((v) => JSON.parse(v.value) as string);

const isTShirtSizing = (str: string) => tshirts.includes(str);
