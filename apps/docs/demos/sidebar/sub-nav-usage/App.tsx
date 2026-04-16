"use client";

import {
  IconContentCopy,
  IconCropSquare,
  IconDelete,
  IconDesktopWindows,
  IconExperiment,
  IconMonitoring,
  IconStar,
  IconTeamDashboard,
} from "@optiaxiom/icons";
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
                icon={<IconContentCopy />}
                onClick={() => setSelected("All")}
              >
                All
              </NavItem>
              <NavItem
                active={selected === "Recent"}
                icon={<IconCropSquare />}
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
                icon={<IconDelete />}
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
                </NavGroupContent>
              </NavGroup>

              <NavGroup>
                <NavSeparator />
                <NavGroupTrigger>Analytics</NavGroupTrigger>
                <NavGroupContent>
                  <NavItem
                    active={selected === "Dashboard"}
                    icon={<IconTeamDashboard />}
                    onClick={() => setSelected("Dashboard")}
                  >
                    Dashboard
                  </NavItem>
                  <NavItem
                    active={selected === "Reports"}
                    icon={<IconMonitoring />}
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
