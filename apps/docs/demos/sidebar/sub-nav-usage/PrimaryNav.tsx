"use client";

import {
  IconArrowUpRightFromSquare,
  IconBookOpen,
  IconChartLine,
  IconDiagramSubtask,
  IconFlag,
  IconGear,
  IconSidebar,
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
  SidebarToggle,
} from "@optiaxiom/react";
import { useState } from "react";

export function PrimaryNav() {
  const [selected, setSelected] = useState("flags");

  return (
    <Nav>
      <NavBody>
        <NavList>
          <NavItem
            active={selected === "projects"}
            icon={<IconDiagramSubtask />}
            onClick={() => setSelected("projects")}
          >
            Projects
          </NavItem>
          <NavItem
            active={selected === "flags"}
            icon={<IconFlag />}
            onClick={() => setSelected("flags")}
          >
            Flags
          </NavItem>
          <NavItem
            active={selected === "events"}
            icon={<IconChartLine />}
            onClick={() => setSelected("events")}
          >
            Events
          </NavItem>
          <NavItem
            active={selected === "settings"}
            icon={<IconGear />}
            onClick={() => setSelected("settings")}
          >
            Settings
          </NavItem>
          <NavItem
            addonAfter={<IconArrowUpRightFromSquare />}
            asChild
            icon={<IconBookOpen />}
          >
            <a href="/">Tutorial</a>
          </NavItem>
        </NavList>
      </NavBody>

      <NavFooter>
        <NavList>
          <SidebarToggle icon={<IconSidebar />} />
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
  );
}
