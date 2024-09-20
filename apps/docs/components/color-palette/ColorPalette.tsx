import { Flex, Grid, Text, tokens } from "@optiaxiom/react";

import { ColorTokenItem } from "../color-tokens";

export function ColorPalette() {
  return (
    <Grid alignItems="start" gap="lg" gridTemplateColumns={["2", "1"]} mt="xl">
      {Object.entries(
        Object.entries(tokens.colors).reduce<
          Record<string, Array<[string, keyof typeof tokens.colors, string]>>
        >((result, [name, color]) => {
          if (["current", "transparent"].includes(name)) {
            return result;
          }

          const [hue, tone] = name.split(".");
          if (!tone?.match(/^\d+$/)) {
            return result;
          }

          (result[hue] = result[hue] || []).push([
            tone,
            name as keyof typeof tokens.colors,
            color,
          ]);
          return result;
        }, {}),
      ).map(([hue, tones]) => (
        <Flex
          alignItems={["stretch", "start"]}
          flexDirection={["column", "row"]}
          key={hue}
        >
          <Text fontWeight="700" mt="8" textTransform="capitalize" w="80">
            {hue}
          </Text>
          <Flex flex="1" flexDirection={["column", "row"]} flexWrap="wrap">
            {tones.map(([tone, name, color]) => (
              <ColorTokenItem
                flexDirection={["row", "column"]}
                gap={["sm", "8"]}
                item={{ bg: name, name: tone, value: color }}
                key={`tone-${tone}`}
              />
            ))}
          </Flex>
        </Flex>
      ))}
    </Grid>
  );
}
