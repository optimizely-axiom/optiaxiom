import {
  Avatar,
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

export function App() {
  return (
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
              avatar={
                <Avatar src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80" />
              }
              name="Rhaenyra Targaryen"
              organization="Optimizely"
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
  );
}
