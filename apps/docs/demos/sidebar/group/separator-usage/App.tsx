import {
  IconContentCopy,
  IconCropSquare,
  IconDesktopWindows,
  IconExperiment,
  IconTeamDashboard,
} from "@optiaxiom/icons";
import {
  Nav,
  NavBody,
  NavGroup,
  NavGroupContent,
  NavGroupTrigger,
  NavItem,
  NavList,
  NavSeparator,
  Sidebar,
} from "@optiaxiom/react";

import { Canvas } from "../../Canvas";

export function App() {
  return (
    <Canvas size="auto">
      <Sidebar expanded>
        <Nav>
          <NavBody>
            <NavList>
              <NavItem icon={<IconContentCopy />}>All</NavItem>
              <NavItem icon={<IconCropSquare />}>Recent</NavItem>
              <NavGroup>
                <NavSeparator />
                <NavGroupTrigger>Location</NavGroupTrigger>
                <NavGroupContent>
                  <NavItem icon={<IconTeamDashboard />}>CMP</NavItem>
                  <NavItem icon={<IconDesktopWindows />}>CMS</NavItem>
                  <NavItem icon={<IconExperiment />}>Experimentation</NavItem>
                </NavGroupContent>
              </NavGroup>
            </NavList>
          </NavBody>
        </Nav>
      </Sidebar>
    </Canvas>
  );
}
