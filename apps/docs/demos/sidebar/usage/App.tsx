"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Nav,
  NavAccountItem,
  NavBody,
  NavFooter,
  NavItem,
  NavList,
  Sidebar,
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <NavAccountItem
                    name="Rhaenyra Targaryen"
                    organization="Optimizely"
                    src="https://i.pravatar.cc/150?img=10"
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" side="right">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavList>
          </NavFooter>
        </Nav>
      </Sidebar>
    </Canvas>
  );
}
