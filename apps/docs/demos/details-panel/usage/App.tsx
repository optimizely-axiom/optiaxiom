import { Box, Button } from "@optiaxiom/react";
import {
  DetailsPanel,
  DetailsPanelBody,
  DetailsPanelFooter,
  DetailsPanelHeader,
} from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Box bg="bg.page" p="24" style={{ height: "75vh", width: "300px" }}>
      <DetailsPanel>
        <DetailsPanelHeader>Panel Title</DetailsPanelHeader>
        <DetailsPanelBody>This is the details panel body</DetailsPanelBody>
        <DetailsPanelFooter>
          <Button>Share</Button>
        </DetailsPanelFooter>
      </DetailsPanel>
    </Box>
  );
}
