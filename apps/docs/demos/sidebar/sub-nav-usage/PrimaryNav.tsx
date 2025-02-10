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

export function PrimaryNav() {
  return (
    <Nav>
      <NavBody>
        <NavList>
          <NavItem icon={<IconBinaryTree />}>Projects</NavItem>
          <NavItem active icon={<IconFlag2 />}>
            Flags
          </NavItem>
          <NavItem icon={<IconChartLine />}>Events</NavItem>
          <NavItem icon={<IconSettings />}>Settings</NavItem>
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
  );
}
