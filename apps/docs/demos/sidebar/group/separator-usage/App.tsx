import {
  IconClone,
  IconDisplay,
  IconFlask,
  IconGrid,
  IconSquare,
} from "@optiaxiom/icons";
import {
  Nav,
  NavBody,
  NavGroup,
  NavGroupContent,
  NavGroupTrigger,
  NavItem,
  NavList,
  NavSeparator,
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
              <NavItem icon={<IconClone />}>All</NavItem>
              <NavItem icon={<IconSquare />}>Recent</NavItem>
              <NavGroup>
                <NavSeparator />
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
