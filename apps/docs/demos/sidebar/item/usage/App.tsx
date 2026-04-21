import { IconDisplay, IconFlask, IconGrid } from "@optiaxiom/icons";
import { Nav, NavBody, NavItem, NavList, Sidebar } from "@optiaxiom/react";

import { Canvas } from "../../Canvas";

export function App() {
  return (
    <Canvas size="auto">
      <Sidebar expanded>
        <Nav>
          <NavBody>
            <NavList>
              <NavItem icon={<IconGrid />}>CMP</NavItem>
              <NavItem icon={<IconDisplay />}>CMS</NavItem>
              <NavItem icon={<IconFlask />}>Experimentation</NavItem>
            </NavList>
          </NavBody>
        </Nav>
      </Sidebar>
    </Canvas>
  );
}
