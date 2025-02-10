"use client";

import { Nav, NavBody, NavItem, NavList, Sidebar } from "@optiaxiom/react";
import {
  IconDashboard,
  IconDeviceDesktop,
  IconTestPipe,
} from "@tabler/icons-react";
import { useState } from "react";

import { Canvas } from "../../Canvas";

export function App() {
  const [selected, setSelected] = useState<string>("CMP");

  return (
    <Canvas size="auto">
      <Sidebar expanded>
        <Nav>
          <NavBody>
            <NavList>
              <NavItem
                active={selected === "CMP"}
                icon={<IconDashboard />}
                onClick={() => setSelected("CMP")}
              >
                CMP
              </NavItem>
              <NavItem
                active={selected === "CMS"}
                icon={<IconDeviceDesktop />}
                onClick={() => setSelected("CMS")}
              >
                CMS
              </NavItem>
              <NavItem
                active={selected === "Experimentation"}
                icon={<IconTestPipe />}
                onClick={() => setSelected("Experimentation")}
              >
                Experimentation
              </NavItem>
            </NavList>
          </NavBody>
        </Nav>
      </Sidebar>
    </Canvas>
  );
}
