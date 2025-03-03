import { Nav, Sidebar, SubNav } from "@optiaxiom/react";

import { Canvas } from "../../Canvas";
import { Note } from "../../Note";

export function App() {
  return (
    <Canvas size="sm">
      <Sidebar>
        <Nav />
        <SubNav>
          <Note description="A secondary navigation panel." title="SubNav" />
        </SubNav>
      </Sidebar>
    </Canvas>
  );
}
