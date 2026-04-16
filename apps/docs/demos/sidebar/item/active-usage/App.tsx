"use client";

import {
  IconDesktopWindows,
  IconExperiment,
  IconTeamDashboard,
} from "@optiaxiom/icons";
import { Nav, NavBody, NavItem, NavList, Sidebar } from "@optiaxiom/react";
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
                icon={<IconTeamDashboard />}
                onClick={() => setSelected("CMP")}
              >
                CMP
              </NavItem>
              <NavItem
                active={selected === "CMS"}
                icon={<IconDesktopWindows />}
                onClick={() => setSelected("CMS")}
              >
                CMS
              </NavItem>
              <NavItem
                active={selected === "Experimentation"}
                icon={<IconExperiment />}
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
