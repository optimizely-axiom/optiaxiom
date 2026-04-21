"use client";

import { IconDisplay, IconFlask, IconGrid } from "@optiaxiom/icons";
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
                icon={<IconGrid />}
                onClick={() => setSelected("CMP")}
              >
                CMP
              </NavItem>
              <NavItem
                active={selected === "CMS"}
                icon={<IconDisplay />}
                onClick={() => setSelected("CMS")}
              >
                CMS
              </NavItem>
              <NavItem
                active={selected === "Experimentation"}
                icon={<IconFlask />}
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
