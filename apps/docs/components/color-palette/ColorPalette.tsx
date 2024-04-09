import { Box, Stack, Text, tokens } from "@optiaxiom/react";

export function ColorPalette() {
  return (
    <Stack gap="lg" marginTop="xl">
      {Object.entries(
        Object.entries(tokens.color).reduce<
          Record<string, Array<[string, keyof typeof tokens.color, string]>>
        >((result, [name, color]) => {
          const [hue, tone] = name.split(".");
          (result[hue] = result[hue] || []).push([
            tone,
            name as keyof typeof tokens.color,
            color,
          ]);
          return result;
        }, {}),
      ).map(([hue, tones]) => (
        <Stack align="start" direction="horizontal" key={hue}>
          <Text
            fontWeight={700}
            marginTop={1}
            style={{ width: "5rem" }}
            textTransform="capitalize"
          >
            {hue}
          </Text>
          {tones.map(([tone, name, color]) => (
            <Box key={`tone-${tone}`} style={{ width: "5rem" }}>
              <Box
                background={name}
                borderRadius="sm"
                style={{
                  border: `1px solid oklch(from ${color} calc(l - 0.1) c h)`,
                  height: "0",
                  paddingBottom: "70%",
                }}
              />
              <Text fontWeight={600} marginTop={1} size="sm">
                {tone}
              </Text>
              <Text color="dark.500" marginTop={0.25} size="sm">
                {color}
              </Text>
            </Box>
          ))}
        </Stack>
      ))}
    </Stack>
  );
}
