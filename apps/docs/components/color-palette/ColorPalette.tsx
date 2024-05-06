import { Box, Grid, Stack, Text, tokens } from "@optiaxiom/react";

export function ColorPalette() {
  return (
    <Grid alignItems="start" cols={["2", "1"]} gap="lg" mt="xl">
      {Object.entries(
        Object.entries(tokens.colors).reduce<
          Record<string, Array<[string, keyof typeof tokens.colors, string]>>
        >((result, [name, color]) => {
          if (["current", "transparent"].includes(name)) {
            return result;
          }

          const [hue, tone] = name.split(".");
          (result[hue] = result[hue] || []).push([
            tone,
            name as keyof typeof tokens.colors,
            color,
          ]);
          return result;
        }, {}),
      ).map(([hue, tones]) => (
        <Stack
          alignItems={["stretch", "start"]}
          flexDirection={["vertical", "horizontal"]}
          key={hue}
        >
          <Text fontWeight="700" mt="8" textTransform="capitalize" w="80">
            {hue}
          </Text>
          <Stack
            flex="1"
            flexDirection={["vertical", "horizontal"]}
            flexWrap="wrap"
          >
            {tones.map(([tone, name, color]) => (
              <Stack
                alignItems="start"
                flexDirection={["horizontal", "vertical"]}
                gap={["sm", "8"]}
                key={`tone-${tone}`}
              >
                <Box
                  bg={name}
                  rounded="sm"
                  style={{
                    aspectRatio: 100 / 70,
                    border: `1px solid oklch(from ${color} calc(l - 0.1) c h)`,
                  }}
                  w="48"
                />
                <Box flex="1">
                  <Text fontSize="sm" fontWeight="600">
                    {tone}
                  </Text>
                  <Text color="dark.500" fontSize="sm" mt="2">
                    {color}
                  </Text>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Stack>
      ))}
    </Grid>
  );
}
