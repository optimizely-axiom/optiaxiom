import { Nav, NavBody, NavItem, NavList, Sidebar } from "@optiaxiom/react";
import { NavGroup, NavGroupTrigger } from "@optiaxiom/react/unstable";
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
                <NavList>
                  <NavItem aria-label="CMP" icon={<IconDashboard />}>
                    CMP
                  </NavItem>
                  <NavItem aria-label="CMS" icon={<IconDeviceDesktop />}>
                    CMS
                  </NavItem>
                  <NavItem aria-label="Experimentation" icon={<IconTestPipe />}>
                    Experimentation
                  </NavItem>
                </NavList>
              </NavGroup>
            </NavList>
          </NavBody>
        </Nav>
      </Sidebar>
    </Canvas>
  );
}
