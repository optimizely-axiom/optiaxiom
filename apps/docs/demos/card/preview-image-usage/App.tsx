import beach from "@/demos/beach.jpg";
import { Box } from "@optiaxiom/react";
import {
  Card,
  CardHeader,
  CardImage,
  CardPreview,
} from "@optiaxiom/react/unstable";
import Image from "next/image";

export function App() {
  return (
    <Box maxW="xs" w="full">
      <Card>
        <CardPreview>
          <CardImage asChild>
            <Image
              alt="brown glass bottle beside white book on blue and white textile"
              priority
              src={beach}
            />
          </CardImage>
        </CardPreview>
        <CardHeader>The majestic world of turtles</CardHeader>
      </Card>
    </Box>
  );
}
