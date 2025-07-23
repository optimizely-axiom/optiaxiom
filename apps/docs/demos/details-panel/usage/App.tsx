import { Button } from "@optiaxiom/react";
import {
  DetailsPanel,
  DetailsPanelBody,
  DetailsPanelFooter,
  DetailsPanelHeader,
} from "@optiaxiom/react/unstable";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <DetailsPanel>
        <DetailsPanelHeader>Panel Title</DetailsPanelHeader>
        <DetailsPanelBody>This is the details panel body</DetailsPanelBody>
        <DetailsPanelFooter>
          <Button>Share</Button>
        </DetailsPanelFooter>
      </DetailsPanel>
    </Canvas>
  );
}
