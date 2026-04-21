import { IconDisplay, IconFlask, IconGrid } from "@optiaxiom/icons";
import {
  Nav,
  NavBody,
  NavGroup,
  NavGroupContent,
  NavGroupTrigger,
  NavItem,
  NavList,
  Sidebar,
} from "@optiaxiom/react";

import { Canvas } from "../../Canvas";

export function App() {
  return (
    <Canvas size="auto">
      <Sidebar expanded>
        <Nav>
          <NavBody>
            <NavList>
              <NavGroup collapsible>
                <NavGroupTrigger>Location</NavGroupTrigger>
                <NavGroupContent>
                  <NavItem icon={<IconGrid />}>CMP</NavItem>
                  <NavItem icon={<IconDisplay />}>CMS</NavItem>
                  <NavItem icon={<IconFlask />}>Experimentation</NavItem>
                </NavGroupContent>
              </NavGroup>
            </NavList>
          </NavBody>
        </Nav>
      </Sidebar>
    </Canvas>
  );
}
