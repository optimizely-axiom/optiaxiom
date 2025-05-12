"use client";

import {
  NavBody,
  NavGroup,
  NavGroupContent,
  NavGroupTrigger,
  NavItem,
  NavList,
  NavSeparator,
  Sidebar,
  SubNav,
} from "@optiaxiom/react";
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
                icon={<IconCopy />}
                onClick={() => setSelected("All")}
              >
                All
              </NavItem>
              <NavItem
                active={selected === "Recent"}
                icon={<IconRectangle />}
                onClick={() => setSelected("Recent")}
              >
                Recent
              </NavItem>
              <NavItem
                active={selected === "Favorites"}
                icon={<IconStar />}
                onClick={() => setSelected("Favorites")}
              >
                Favorites
              </NavItem>
              <NavItem
                active={selected === "Trash"}
                icon={<IconTrash />}
                onClick={() => setSelected("Trash")}
              >
                Trash
              </NavItem>

              <NavGroup>
                <NavSeparator />
                <NavGroupTrigger>Location</NavGroupTrigger>
                <NavGroupContent>
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
                </NavGroupContent>
              </NavGroup>

              <NavGroup>
                <NavSeparator />
                <NavGroupTrigger>Analytics</NavGroupTrigger>
                <NavGroupContent>
                  <NavItem
                    active={selected === "Dashboard"}
                    icon={<IconDashboard />}
                    onClick={() => setSelected("Dashboard")}
                  >
                    Dashboard
                  </NavItem>
                  <NavItem
                    active={selected === "Reports"}
                    icon={<IconReport />}
                    onClick={() => setSelected("Reports")}
                  >
                    Reports
                  </NavItem>
                </NavGroupContent>
              </NavGroup>
            </NavList>
          </NavBody>
        </SubNav>
      </Sidebar>
    </Canvas>
  );
}
