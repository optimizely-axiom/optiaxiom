import type { ComponentPropsWithRef } from "react";

import {
  Box,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@optiaxiom/react";

export function App({
  appearance = "secondary",
}: Pick<ComponentPropsWithRef<typeof Tabs>, "appearance">) {
  return (
    <Box w="full">
      <Tabs appearance={appearance} defaultValue="first">
        <TabsList>
          <TabsTrigger value="first">First</TabsTrigger>
          <TabsTrigger value="second">Second</TabsTrigger>
          <TabsTrigger value="third">Third</TabsTrigger>
        </TabsList>

        <TabsContent py="16" value="first">
          This is first content
        </TabsContent>

        <TabsContent py="16" value="second">
          This is second content
        </TabsContent>

        <TabsContent py="16" value="third">
          This is third content
        </TabsContent>
      </Tabs>
    </Box>
  );
}
