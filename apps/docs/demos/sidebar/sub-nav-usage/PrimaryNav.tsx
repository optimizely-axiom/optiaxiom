"use client";

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
import {
  IconBinaryTree,
  IconChartLine,
  IconExternalLink,
  IconFlag2,
  IconLayoutSidebar,
  IconSettings,
  IconVocabulary,
} from "@tabler/icons-react";
import { useState } from "react";

export function PrimaryNav() {
  const [selected, setSelected] = useState("flags");

  return (
    <Nav>
      <NavBody>
        <NavList>
          <NavItem
            active={selected === "projects"}
            icon={<IconBinaryTree />}
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
            icon={<IconChartLine />}
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
            addonAfter={<IconExternalLink size="16" />}
            asChild
            icon={<IconVocabulary />}
          >
            <a href="/">Tutorial</a>
          </NavItem>
        </NavList>
      </NavBody>

      <NavFooter>
        <NavList>
          <SidebarToggle icon={<IconLayoutSidebar />} />
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
