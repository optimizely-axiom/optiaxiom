import { Nav, Sidebar } from "@optiaxiom/react";

import { Canvas } from "../../Canvas";
import { Panel } from "../../Panel";

export function App() {
  return (
    <Canvas size="sm">
      <Sidebar expanded>
        <Nav>
          <Panel description="The primary navigation panel." title="Nav" />
        </Nav>
      </Sidebar>
    </Canvas>
  );
}
