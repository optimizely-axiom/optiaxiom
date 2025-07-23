import {
  Box,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
} from "@optiaxiom/react";

import { Section } from "../Section";

export function App() {
  return (
    <Box
      bg="bg.default"
      border="1"
      borderColor="border.tertiary"
      display="flex"
      justifyContent="center"
      mt="32"
      p="32"
      rounded="lg"
    >
      <Card style={{ height: "384px" }}>
        <Section asChild inset label="Preview" style={{ height: "148px" }}>
          <CardPreview
            addonBottomLeft={<Section>addonBottomLeft</Section>}
            addonBottomRight={<Section>addonBottomRight</Section>}
            addonTopLeft={<Section>addonTopLeft</Section>}
            addonTopRight={<Section>addonTopRight</Section>}
          >
            <Section>children</Section>
          </CardPreview>
        </Section>
        <Section label="Header">
          <CardHeader
            addonAfter={<Section>addonAfter</Section>}
            addonBefore={<Section>addonBefore</Section>}
            description={<Section>description</Section>}
          >
            <Section>children</Section>
          </CardHeader>
        </Section>
        <CardFooter>
          <Section w="full">Footer</Section>
        </CardFooter>
      </Card>
    </Box>
  );
}
