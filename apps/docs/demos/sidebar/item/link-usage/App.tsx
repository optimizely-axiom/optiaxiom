import { IconArrowUpRightFromSquare, IconBookOpen } from "@optiaxiom/icons";
import { Nav, NavBody, NavItem, NavList, Sidebar } from "@optiaxiom/react";

import { Canvas } from "../../Canvas";

export function App() {
  return (
    <Canvas size="auto">
      <Sidebar expanded>
        <Nav>
          <NavBody>
            <NavList>
              <NavItem
                addonAfter={<IconArrowUpRightFromSquare />}
                asChild
                icon={<IconBookOpen />}
              >
                <a href="/">Tutorial</a>
              </NavItem>
            </NavList>
          </NavBody>
        </Nav>
      </Sidebar>
    </Canvas>
  );
}
