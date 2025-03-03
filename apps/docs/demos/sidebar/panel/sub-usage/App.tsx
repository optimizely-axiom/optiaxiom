import { Nav, Sidebar } from "@optiaxiom/react";
import { SubNav } from "@optiaxiom/react/unstable";

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
