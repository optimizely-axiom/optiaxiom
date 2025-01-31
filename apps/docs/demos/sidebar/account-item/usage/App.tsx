import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Nav,
  NavAccountItem,
  NavFooter,
  NavList,
  Sidebar,
} from "@optiaxiom/react";

import { Canvas } from "../../Canvas";

export function App() {
  return (
    <Canvas size="auto">
      <Sidebar expanded>
        <Nav>
          <NavFooter>
            <NavList>
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
