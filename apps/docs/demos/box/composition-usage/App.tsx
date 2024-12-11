import { Box } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      asChild
      bg="bg.information.subtle"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      p="8"
      rounded="md"
    >
      <span>I am a span {isHovered && "hovered"}</span>
    </Box>
  );
}
