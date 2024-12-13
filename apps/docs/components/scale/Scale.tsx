import type { PropItem } from "react-docgen-typescript";

import { sprinkles, Text } from "@optiaxiom/react";

import { Table, Td, Th, Thead, Tr } from "../table";
import { ScaleValue } from "./ScaleValue";

export const Scale = ({
  hidePixels,
  hidePreview,
  keyLabel = "Name",
  prop,
  valueLabel = "Value",
  values,
}: {
  hidePixels?: boolean;
  hidePreview?: boolean;
  keyLabel?: string;
  prop?: PropItem;
  valueLabel?: string;
  values: Record<string, string> | string;
}) => (
  <Table maxH="sm">
    <Thead>
      <tr>
        <Th className="_sticky _top-0">{keyLabel}</Th>
        <Th className="_sticky _top-0">{valueLabel}</Th>
        {!hidePixels && <Th className="_sticky _top-0">Pixels</Th>}
        {!hidePreview && (
          <Th
            className="_sticky _top-0"
            display={["none", "table-cell"]}
            w="full"
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
          if (isNaN(aNum) && isNaN(bNum)) return 0;
          if (isNaN(aNum)) return isTShirtSizing(a) ? -1 : 1;
          if (isNaN(bNum)) return isTShirtSizing(b) ? 1 : -1;
          return aNum - bNum;
        })
        .map(([name, size]) => (
          <Tr key={name}>
            <Td whiteSpace="nowrap">
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
              type={typeof values === "string" ? "selector" : "value"}
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

const isTShirtSizing = (str: string) =>
  ["2xl", "2xs", "3xl", "4xl", "5xl", "lg", "md", "sm", "xl", "xs"].includes(
    str,
  );
