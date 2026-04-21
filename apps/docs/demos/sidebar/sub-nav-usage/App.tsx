"use client";

import {
  IconChartMixed,
  IconClone,
  IconDisplay,
  IconFlask,
  IconGrid,
  IconSquare,
  IconStar,
  IconTrashCan,
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
                icon={<IconClone />}
                onClick={() => setSelected("All")}
              >
                All
              </NavItem>
              <NavItem
                active={selected === "Recent"}
                icon={<IconSquare />}
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
                icon={<IconTrashCan />}
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
                </NavGroupContent>
              </NavGroup>

              <NavGroup>
                <NavSeparator />
                <NavGroupTrigger>Analytics</NavGroupTrigger>
                <NavGroupContent>
                  <NavItem
                    active={selected === "Dashboard"}
                    icon={<IconGrid />}
                    onClick={() => setSelected("Dashboard")}
                  >
                    Dashboard
                  </NavItem>
                  <NavItem
                    active={selected === "Reports"}
                    icon={<IconChartMixed />}
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
