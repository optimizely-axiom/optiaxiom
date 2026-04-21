import { IconSidebar } from "@optiaxiom/icons";
import {
  Nav,
  NavFooter,
  NavList,
  Sidebar,
  SidebarToggle,
} from "@optiaxiom/react";

import { Canvas } from "../../Canvas";

export function App() {
  return (
    <Canvas>
      <Sidebar defaultExpanded>
        <Nav>
          <NavFooter>
            <NavList>
              <SidebarToggle icon={<IconSidebar />} />
            </NavList>
          </NavFooter>
        </Nav>
      </Sidebar>
    </Canvas>
  );
}
