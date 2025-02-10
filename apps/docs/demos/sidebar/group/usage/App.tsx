import { Nav, NavBody, NavItem, NavList, Sidebar } from "@optiaxiom/react";
import {
  NavGroup,
  NavGroupContent,
  NavGroupTrigger,
} from "@optiaxiom/react/unstable";
import {
  IconDashboard,
  IconDeviceDesktop,
  IconTestPipe,
} from "@tabler/icons-react";

import { Canvas } from "../../Canvas";

export function App() {
  return (
    <Canvas size="auto">
      <Sidebar expanded>
        <Nav>
          <NavBody>
            <NavList>
              <NavGroup defaultOpen>
                <NavGroupTrigger>Location</NavGroupTrigger>
                <NavGroupContent>
                  <NavItem icon={<IconDashboard />}>CMP</NavItem>
                  <NavItem icon={<IconDeviceDesktop />}>CMS</NavItem>
                  <NavItem icon={<IconTestPipe />}>Experimentation</NavItem>
                </NavGroupContent>
              </NavGroup>
            </NavList>
          </NavBody>
        </Nav>
      </Sidebar>
    </Canvas>
  );
}
