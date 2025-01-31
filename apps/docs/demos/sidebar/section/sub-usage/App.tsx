import { Nav, NavBody, NavFooter, NavHeader, Sidebar } from "@optiaxiom/react";
import { SubNav } from "@optiaxiom/react/unstable";

import { Canvas } from "../../Canvas";
import { Panel } from "../../Panel";

export function App() {
  return (
    <Canvas>
      <Sidebar>
        <Nav />
        <SubNav>
          <NavHeader>
            <Panel
              description="A sticky header that is always visible at the top of the panel."
              title="NavHeader"
            />
          </NavHeader>
          <NavBody>
            <Panel
              description="The main navigation body that is scrollable and should contain all your navigation items."
              title="NavBody"
            />
          </NavBody>
          <NavFooter>
            <Panel
              description="A sticky footer that is always visible at the bottom of the panel."
              title="NavFooter"
            />
          </NavFooter>
        </SubNav>
      </Sidebar>
    </Canvas>
  );
}
