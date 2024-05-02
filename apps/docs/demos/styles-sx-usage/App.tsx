import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box
      sx={{
        ":hover": { bg: "bg.information" },
        bg: "bg.success",
        p: "md",
      }}
    >
      Using sx prop - hover over me!
    </Box>
  );
}
