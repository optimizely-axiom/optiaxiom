import { Box, Grid, Stack, Text, tokens } from "@optiaxiom/react";

export function ColorPalette() {
  return (
    <Grid alignItems="start" cols={["2", "1"]} gap="lg" marginTop="xl">
      {Object.entries(
        Object.entries(tokens.color).reduce<
          Record<string, Array<[string, keyof typeof tokens.color, string]>>
        >((result, [name, color]) => {
          if (["current", "transparent"].includes(name)) {
            return result;
          }

          const [hue, tone] = name.split(".");
          (result[hue] = result[hue] || []).push([
            tone,
            name as keyof typeof tokens.color,
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
          <Text
            fontWeight="700"
            marginTop="1"
            style={{ width: "5rem" }}
            textTransform="capitalize"
          >
            {hue}
          </Text>
          {tones.map(([tone, name, color]) => (
            <Stack
              alignItems="start"
              flexDirection={["horizontal", "vertical"]}
              gap={["sm", "1"]}
              key={`tone-${tone}`}
            >
              <Box
                background={name}
                borderRadius="sm"
                style={{
                  aspectRatio: 100 / 70,
                  border: `1px solid oklch(from ${color} calc(l - 0.1) c h)`,
                  width: "50px",
                }}
              />
              <Box flex="1">
                <Text fontSize="sm" fontWeight="600">
                  {tone}
                </Text>
                <Text color="dark.500" fontSize="sm" marginTop="0.25">
                  {color}
                </Text>
              </Box>
            </Stack>
          ))}
        </Stack>
      ))}
    </Grid>
  );
}
