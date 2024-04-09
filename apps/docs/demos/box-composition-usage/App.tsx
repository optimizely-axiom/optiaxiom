import { Box } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      asChild
      background={{ dark: "blue.600", light: "blue.50" }}
      borderRadius="md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      padding="xs"
    >
      <span>I am a span {isHovered && "hovered"}</span>
    </Box>
  );
}
