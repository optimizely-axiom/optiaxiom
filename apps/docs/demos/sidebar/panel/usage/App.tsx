import { Nav, Sidebar } from "@optiaxiom/react";

import { Canvas } from "../../Canvas";
import { Note } from "../../Note";

export function App() {
  return (
    <Canvas size="sm">
      <Sidebar expanded>
        <Nav>
          <Note description="The primary navigation panel." title="Nav" />
        </Nav>
      </Sidebar>
    </Canvas>
  );
}
