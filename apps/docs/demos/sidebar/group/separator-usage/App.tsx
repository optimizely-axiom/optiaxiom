import { Nav, NavBody, NavItem, NavList, Sidebar } from "@optiaxiom/react";
import {
  NavGroup,
  NavGroupContent,
  NavGroupTrigger,
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
              <NavItem icon={<IconCopy />}>All</NavItem>
              <NavItem icon={<IconRectangle />}>Recent</NavItem>
              <NavGroup defaultOpen>
                <NavSeparator />
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
