import type { ComponentPropsWithoutRef } from "react";

import { Box, theme } from "@optiaxiom/react";

export function App() {
  return <DemoBox mx={["16", "64"]}>mx=[16, 64]</DemoBox>;
}

function DemoBox({ children, ...props }: ComponentPropsWithoutRef<typeof Box>) {
  return (
    <Box rounded="sm" style={stripes}>
      <Box
        bg="bg.warning.light"
        fontFamily="mono"
        fontSize="md"
        fontWeight="600"
        p="16"
        rounded="sm"
        textAlign="center"
        {...props}
      >
        {children}
      </Box>
    </Box>
  );
}

const stripes = {
  backgroundColor: theme.colors["bg.secondary"],
  backgroundImage: `
    linear-gradient(
      135deg,
      ${theme.colors["bg.avatar.neutral"]} 10%,
      transparent 0,
      transparent 50%,
      ${theme.colors["bg.avatar.neutral"]} 0,
      ${theme.colors["bg.avatar.neutral"]} 60%,
      transparent 0,
      transparent
    )
  `,
  backgroundSize: "7px 7px",
};
