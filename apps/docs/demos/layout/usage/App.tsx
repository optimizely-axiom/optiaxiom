import { Layout, LayoutContent } from "@optiaxiom/react/unstable";

import { Canvas } from "../Canvas";
import { Panel } from "../Panel";

export function App() {
  return (
    <Canvas>
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
    </Canvas>
  );
}
