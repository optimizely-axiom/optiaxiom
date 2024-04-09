import { Box } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      asChild
      background="bg.information"
      borderRadius="md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      padding="xs"
    >
      <span>I am a span {isHovered && "hovered"}</span>
    </Box>
  );
}
