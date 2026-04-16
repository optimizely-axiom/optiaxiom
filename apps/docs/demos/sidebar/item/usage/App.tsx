import {
  IconDesktopWindows,
  IconExperiment,
  IconTeamDashboard,
} from "@optiaxiom/icons";
import { Nav, NavBody, NavItem, NavList, Sidebar } from "@optiaxiom/react";

import { Canvas } from "../../Canvas";

export function App() {
  return (
    <Canvas size="auto">
      <Sidebar expanded>
        <Nav>
          <NavBody>
            <NavList>
              <NavItem icon={<IconTeamDashboard />}>CMP</NavItem>
              <NavItem icon={<IconDesktopWindows />}>CMS</NavItem>
              <NavItem icon={<IconExperiment />}>Experimentation</NavItem>
            </NavList>
          </NavBody>
        </Nav>
      </Sidebar>
    </Canvas>
  );
}
