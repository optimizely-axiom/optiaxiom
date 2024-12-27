import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Sidenav,
  SidenavAccountItem,
  SidenavBody,
  SidenavFooter,
  SidenavItem,
  SidenavToggle,
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

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Sidenav defaultExpanded>
        <SidenavBody>
          <SidenavItem aria-label="Projects" icon={<IconBinaryTree />}>
            Projects
          </SidenavItem>
          <SidenavItem active aria-label="Flags" icon={<IconFlag2 />}>
            Flags
          </SidenavItem>
          <SidenavItem aria-label="Events" icon={<IconChartLine />}>
            Events
          </SidenavItem>
          <SidenavItem aria-label="Settings" icon={<IconSettings />}>
            Settings
          </SidenavItem>
          <SidenavItem
            addonAfter={<IconExternalLink size="16" />}
            aria-label="Tutorial"
            asChild
            icon={<IconVocabulary />}
          >
            <a href="/">Tutorial</a>
          </SidenavItem>
        </SidenavBody>

        <SidenavFooter>
          <SidenavToggle icon={<IconLayoutSidebar />} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidenavAccountItem
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
        </SidenavFooter>
      </Sidenav>
    </Canvas>
  );
}
