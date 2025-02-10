import { Nav, NavBody, NavItem, NavList, Sidebar } from "@optiaxiom/react";
import { IconExternalLink, IconVocabulary } from "@tabler/icons-react";

import { Canvas } from "../../Canvas";

export function App() {
  return (
    <Canvas size="auto">
      <Sidebar expanded>
        <Nav>
          <NavBody>
            <NavList>
              <NavItem
                addonAfter={<IconExternalLink size="16" />}
                asChild
                icon={<IconVocabulary />}
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
