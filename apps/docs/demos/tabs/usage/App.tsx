import {
  Box,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState("first");

  return (
    <Box w="full">
      <Tabs onValueChange={setValue} value={value}>
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
