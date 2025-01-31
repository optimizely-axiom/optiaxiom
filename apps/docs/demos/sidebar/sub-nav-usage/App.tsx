"use client";

import { NavBody, NavItem, NavList, Sidebar } from "@optiaxiom/react";
import {
  NavGroup,
  NavGroupLabel,
  NavSeparator,
  SubNav,
} from "@optiaxiom/react/unstable";
import {
  IconCopy,
  IconDashboard,
  IconDeviceDesktop,
  IconRectangle,
  IconReport,
  IconStar,
  IconTestPipe,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";

import { Canvas } from "../Canvas";
import { PrimaryNav } from "./PrimaryNav";

export function App() {
  const [selected, setSelected] = useState<string>("CMP");

  return (
    <Canvas>
      <Sidebar>
        <PrimaryNav />

        <SubNav>
          <NavBody>
            <NavList>
              <NavItem
                active={selected === "All"}
                aria-label="All"
                icon={<IconCopy />}
                onClick={() => setSelected("All")}
              >
                All
              </NavItem>
              <NavItem
                active={selected === "Recent"}
                aria-label="Recent"
                icon={<IconRectangle />}
                onClick={() => setSelected("Recent")}
              >
                Recent
              </NavItem>
              <NavItem
                active={selected === "Favorites"}
                aria-label="Favorites"
                icon={<IconStar />}
                onClick={() => setSelected("Favorites")}
              >
                Favorites
              </NavItem>
              <NavItem
                active={selected === "Trash"}
                aria-label="Trash"
                icon={<IconTrash />}
                onClick={() => setSelected("Trash")}
              >
                Trash
              </NavItem>

              <NavGroup defaultOpen>
                <NavSeparator />
                <NavGroupLabel>Location</NavGroupLabel>
                <NavList>
                  <NavItem
                    active={selected === "CMP"}
                    aria-label="CMP"
                    icon={<IconDashboard />}
                    onClick={() => setSelected("CMP")}
                  >
                    CMP
                  </NavItem>
                  <NavItem
                    active={selected === "CMS"}
                    aria-label="CMS"
                    icon={<IconDeviceDesktop />}
                    onClick={() => setSelected("CMS")}
                  >
                    CMS
                  </NavItem>
                  <NavItem
                    active={selected === "Experimentation"}
                    aria-label="Experimentation"
                    icon={<IconTestPipe />}
                    onClick={() => setSelected("Experimentation")}
                  >
                    Experimentation
                  </NavItem>
                </NavList>
              </NavGroup>

              <NavGroup defaultOpen>
                <NavSeparator />
                <NavGroupLabel>Analytics</NavGroupLabel>
                <NavList>
                  <NavItem
                    active={selected === "Dashboard"}
                    aria-label="Dashboard"
                    icon={<IconDashboard />}
                    onClick={() => setSelected("Dashboard")}
                  >
                    Dashboard
                  </NavItem>
                  <NavItem
                    active={selected === "Reports"}
                    aria-label="Reports"
                    icon={<IconReport />}
                    onClick={() => setSelected("Reports")}
                  >
                    Reports
                  </NavItem>
                </NavList>
              </NavGroup>
            </NavList>
          </NavBody>
        </SubNav>
      </Sidebar>
    </Canvas>
  );
}
