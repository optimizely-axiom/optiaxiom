import type { PropItem } from "react-docgen-typescript";

import { Box, Flex, Text } from "@optiaxiom/react";

export function ColorTokenItem({
  mode,
  token,
  value,
}: {
  mode: "dark" | "light";
  token: PropItem;
  value: PropItem;
}) {
  const luminance = getColorLuminance(JSON.parse(token.type.name));

  return (
    <Flex
      bg={mode === "light" ? "white" : "neutral.900"}
      border="1"
      gap="8"
      p="6"
      rounded="sm"
    >
      <Box
        p="12"
        rounded="sm"
        style={{
          backgroundColor: JSON.parse(token.type.name),
          outlineColor: `oklch(from ${JSON.parse(token.type.name)} calc(l ${mode === "light" ? "-" : "+"} 0.1) c h)`,
          outlineStyle: "solid",
          outlineWidth:
            (mode === "light" ? luminance : 255 - luminance) > 200
              ? "1px"
              : "0",
        }}
      />
      <Text
        color={mode === "light" ? "neutral.800" : "neutral.100"}
        fontFamily="mono"
        fontSize="sm"
        px="2"
      >
        {value.name}
      </Text>
    </Flex>
  );
}

function getColorLuminance(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error("Could not parse hex color: " + hex);
  }
  const rgb = {
    b: parseInt(result[3], 16),
    g: parseInt(result[2], 16),
    r: parseInt(result[1], 16),
  };
  return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
}
