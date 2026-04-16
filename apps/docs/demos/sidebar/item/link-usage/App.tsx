import { IconMenuBook, IconOpenInNew } from "@optiaxiom/icons";
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
                addonAfter={<IconOpenInNew />}
                asChild
                icon={<IconMenuBook />}
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
