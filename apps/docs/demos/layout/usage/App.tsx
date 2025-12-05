import { Box } from "@optiaxiom/react";
import { Layout, LayoutContent } from "@optiaxiom/react/unstable";

import { Panel } from "../Panel";

export function App() {
  return (
    <Box bg="bg.page" p="24" style={{ height: "400px", width: "600px" }}>
      <Layout
        detailsPanel={<Panel h="full">DetailsPanel</Panel>}
        header={<Panel>Header</Panel>}
        sidebar={<Panel>Sidebar</Panel>}
        size="full"
      >
        <LayoutContent>
          <Panel h="full">Content</Panel>
        </LayoutContent>
      </Layout>
    </Box>
  );
}
