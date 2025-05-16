import {
  Card,
  CardFooter,
  CardHeader,
  CardOverlay,
  CardPreview,
} from "@optiaxiom/react/unstable";

import { Section } from "../Section";

export function App() {
  return (
    <Card style={{ height: "320px" }}>
      <CardPreview>
        <Section label="Preview" style={{ height: "70px" }}>
          <CardOverlay>
            <Section flex="1">Overlay</Section>
          </CardOverlay>
        </Section>
      </CardPreview>
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
        <Section>Footer</Section>
      </CardFooter>
    </Card>
  );
}
