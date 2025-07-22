import {
  Menu,
  MenuContent,
  MenuTrigger,
  Nav,
  NavAccountItem,
  NavFooter,
  NavList,
  Sidebar,
} from "@optiaxiom/react";

import { Canvas } from "../../Canvas";

export function App() {
  return (
    <Canvas size="auto">
      <Sidebar expanded>
        <Nav>
          <NavFooter>
            <NavList>
              <Menu
                options={[
                  { label: "View Profile" },
                  { label: "Settings" },
                  { label: "Logout" },
                ]}
              >
                <MenuTrigger asChild>
                  <NavAccountItem
                    name="Rhaenyra Targaryen"
                    organization="Optimizely"
                    src="https://i.pravatar.cc/150?img=10"
                  />
                </MenuTrigger>

                <MenuContent align="end" side="right" />
              </Menu>
            </NavList>
          </NavFooter>
        </Nav>
      </Sidebar>
    </Canvas>
  );
}
