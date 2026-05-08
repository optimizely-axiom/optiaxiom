import {
  Box,
  Card,
  CardHeader,
  CardImage,
  CardPreview,
} from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="xs" w="full">
      <Card>
        <CardPreview>
          <CardImage
            alt="brown glass bottle beside white book on blue and white textile"
            src="https://picsum.photos/seed/optiaxiom/640/427"
          />
        </CardPreview>
        <CardHeader>The majestic world of turtles</CardHeader>
      </Card>
    </Box>
  );
}
