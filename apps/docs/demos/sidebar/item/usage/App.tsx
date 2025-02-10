import { Nav, NavBody, NavItem, NavList, Sidebar } from "@optiaxiom/react";
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
              <NavItem icon={<IconDashboard />}>CMP</NavItem>
              <NavItem icon={<IconDeviceDesktop />}>CMS</NavItem>
              <NavItem icon={<IconTestPipe />}>Experimentation</NavItem>
            </NavList>
          </NavBody>
        </Nav>
      </Sidebar>
    </Canvas>
  );
}
