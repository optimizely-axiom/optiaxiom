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
  Sidebar,
  SidebarToggle,
} from "@optiaxiom/react";
import {
  NavGroup,
  NavGroupContent,
  NavGroupLabel,
  NavSeparator,
  SubNav,
} from "@optiaxiom/react/unstable";
import {
  IconBinaryTree,
  IconChartLine,
  IconCopy,
  IconDashboard,
  IconDeviceDesktop,
  IconExternalLink,
  IconFlag2,
  IconLayoutSidebar,
  IconRectangle,
  IconReport,
  IconSettings,
  IconStar,
  IconTestPipe,
  IconTrash,
  IconVocabulary,
} from "@tabler/icons-react";
import { useState } from "react";

import { Canvas } from "../Canvas";

export function App() {
  const [selected, setSelected] = useState<string>("CMP");

  return (
    <Canvas>
      <Sidebar>
        <Nav>
          <NavBody>
            <NavItem aria-label="Projects" icon={<IconBinaryTree />}>
              Projects
            </NavItem>
            <NavItem active aria-label="Flags" icon={<IconFlag2 />}>
              Flags
            </NavItem>
            <NavItem aria-label="Events" icon={<IconChartLine />}>
              Events
            </NavItem>
            <NavItem aria-label="Settings" icon={<IconSettings />}>
              Settings
            </NavItem>
            <NavItem
              addonAfter={<IconExternalLink size="16" />}
              aria-label="Tutorial"
              asChild
              icon={<IconVocabulary />}
            >
              <a href="/">Tutorial</a>
            </NavItem>
          </NavBody>

          <NavFooter>
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
          </NavFooter>
        </Nav>

        <SubNav>
          <NavBody>
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
            <NavSeparator />

            <NavGroup defaultOpen>
              <NavGroupLabel>Location</NavGroupLabel>
              <NavGroupContent>
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
              </NavGroupContent>
            </NavGroup>
            <NavSeparator />
            <NavGroup defaultOpen>
              <NavGroupLabel>Analytics</NavGroupLabel>
              <NavGroupContent>
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
              </NavGroupContent>
            </NavGroup>
          </NavBody>
        </SubNav>
      </Sidebar>
    </Canvas>
  );
}
