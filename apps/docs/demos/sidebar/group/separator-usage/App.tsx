import { Nav, NavBody, NavItem, NavList, Sidebar } from "@optiaxiom/react";
import {
  NavGroup,
  NavGroupLabel,
  NavSeparator,
} from "@optiaxiom/react/unstable";
import {
  IconCopy,
  IconDashboard,
  IconDeviceDesktop,
  IconRectangle,
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
              <NavItem aria-label="All" icon={<IconCopy />}>
                All
              </NavItem>
              <NavItem aria-label="Recent" icon={<IconRectangle />}>
                Recent
              </NavItem>
              <NavGroup defaultOpen>
                <NavSeparator />
                <NavGroupLabel>Location</NavGroupLabel>
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
