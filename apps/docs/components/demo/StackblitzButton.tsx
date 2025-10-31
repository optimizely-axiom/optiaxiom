import { Button, Tooltip } from "@optiaxiom/react";
import StackBlitzSDK from "@stackblitz/sdk";
import { IconBolt } from "@tabler/icons-react";

export function StackblitzButton({ files }: { files: Record<string, string> }) {
  return (
    <Tooltip content="Open in Stackblitz">
      <Button
        appearance="subtle"
        aria-label="Open in Stackblitz"
        icon={<IconBolt />}
        onClick={() => {
          StackBlitzSDK.openProject(
            {
              files,
              template: "node",
              title: "Axiom",
            },
            {
              openFile: "App.tsx",
              showSidebar: false,
            },
          );
        }}
      />
    </Tooltip>
  );
}
