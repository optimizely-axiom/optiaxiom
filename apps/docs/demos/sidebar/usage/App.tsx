"use client";

import {
  IconAccountTree,
  IconDockToRight,
  IconFlag2,
  IconMenuBook,
  IconOpenInNew,
  IconSettings,
  IconShowChart,
} from "@optiaxiom/icons";
import {
  Menu,
  MenuContent,
  MenuTrigger,
  Nav,
  NavAccountItem,
  NavBody,
  NavFooter,
  NavItem,
  NavList,
  Sidebar,
  SidebarToggle,
} from "@optiaxiom/react";
import { useState } from "react";

import { Canvas } from "../Canvas";

export function App() {
  const [selected, setSelected] = useState("flags");

  return (
    <Canvas>
      <Sidebar defaultExpanded>
        <Nav>
          <NavBody>
            <NavList>
              <NavItem
                active={selected === "projects"}
                icon={<IconAccountTree />}
                onClick={() => setSelected("projects")}
              >
                Projects
              </NavItem>
              <NavItem
                active={selected === "flags"}
                icon={<IconFlag2 />}
                onClick={() => setSelected("flags")}
              >
                Flags
              </NavItem>
              <NavItem
                active={selected === "events"}
                icon={<IconShowChart />}
                onClick={() => setSelected("events")}
              >
                Events
              </NavItem>
              <NavItem
                active={selected === "settings"}
                icon={<IconSettings />}
                onClick={() => setSelected("settings")}
              >
                Settings
              </NavItem>
              <NavItem
                addonAfter={<IconOpenInNew />}
                asChild
                icon={<IconMenuBook />}
              >
                <a href="/">Tutorial</a>
              </NavItem>
            </NavList>
          </NavBody>

          <NavFooter>
            <NavList>
              <SidebarToggle icon={<IconDockToRight />} />
              <Menu
                options={[
                  { label: "View Profile" },
                  { label: "Settings" },
                  { label: "Logout" },
                ]}
              >
                <MenuTrigger asChild>
                  <NavAccountItem
                    name="Rhaenyra Targaryen"
                    organization="Optimizely"
                    src="https://i.pravatar.cc/150?img=10"
                  />
                </MenuTrigger>

                <MenuContent align="end" side="right" />
              </Menu>
            </NavList>
          </NavFooter>
        </Nav>
      </Sidebar>
    </Canvas>
  );
}
