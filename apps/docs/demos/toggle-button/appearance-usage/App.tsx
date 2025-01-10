import { Flex, ToggleButton } from "@optiaxiom/react";
import { IconLayoutSidebar } from "@tabler/icons-react";

export function App() {
  return (
    <Flex flexDirection="row">
      <ToggleButton
        appearance="subtle"
        aria-label="Toggle sidebar"
        icon={<IconLayoutSidebar />}
      />

      <ToggleButton aria-label="Toggle sidebar" icon={<IconLayoutSidebar />} />
    </Flex>
  );
}
