import {
  Nav,
  NavFooter,
  NavList,
  Sidebar,
  SidebarToggle,
} from "@optiaxiom/react";
import { IconLayoutSidebar } from "@tabler/icons-react";

import { Canvas } from "../../Canvas";

export function App() {
  return (
    <Canvas>
      <Sidebar defaultExpanded>
        <Nav>
          <NavFooter>
            <NavList>
              <SidebarToggle icon={<IconLayoutSidebar />} />
            </NavList>
          </NavFooter>
        </Nav>
      </Sidebar>
    </Canvas>
  );
}
