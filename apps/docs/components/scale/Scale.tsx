import { Box, Flex, Text } from "@optiaxiom/react";

import { Table, Td, Th, Thead, Tr } from "../table";

const px = (rem: string) =>
  rem.endsWith("rem")
    ? `${parseFloat((parseFloat(rem.slice(0, -3)) * 16).toFixed(0))}px`
    : rem;

export const Scale = ({
  hidePixels,
  hidePreview,
  keyLabel = "Name",
  valueLabel = "Value",
  values,
}: {
  hidePixels?: boolean;
  hidePreview?: boolean;
  keyLabel?: string;
  valueLabel?: string;
  values: Record<string, string> | string[];
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
      {(Array.isArray(values)
        ? values.map((value) => [value, value])
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
            <Td whiteSpace="nowrap">
              <Flex gap="xs">
                {(typeof size === "object"
                  ? Object.entries(size).map(
                      ([key, value]) => `${key}: ${value}`,
                    )
                  : [size]
                ).map((value) => (
                  <Text
                    fontFamily="mono"
                    fontSize="sm"
                    fontWeight="500"
                    key={value}
                    style={{ color: "var(--shiki-token-function)" }}
                  >
                    {value}
                  </Text>
                ))}
              </Flex>
            </Td>
            {!hidePixels && (
              <Td whiteSpace="nowrap">
                <Flex gap="xs">
                  {(typeof size === "object"
                    ? Object.entries<string>(size).map(
                        ([key, value]) => `${key}: ${px(value)}`,
                      )
                    : [px(size)]
                  ).map((value) => (
                    <Text
                      fontFamily="mono"
                      fontSize="sm"
                      fontWeight="500"
                      key={value}
                      style={{ color: "var(--shiki-token-function)" }}
                    >
                      {value}
                    </Text>
                  ))}
                </Flex>
              </Td>
            )}
            {!hidePreview && (
              <Td display={["none", "table-cell"]}>
                <Box bg="link.fg.visited" h="16" style={{ width: size }} />
              </Td>
            )}
          </Tr>
        ))}
    </tbody>
  </Table>
);

const isTShirtSizing = (str: string) =>
  ["2xs", "lg", "md", "sm", "xl", "xs"].includes(str);
