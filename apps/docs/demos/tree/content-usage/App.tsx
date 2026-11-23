import { IconFileLines, IconFolder } from "@optiaxiom/icons";
import { Badge } from "@optiaxiom/react";
import { Tree } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Tree
      aria-label="Pages"
      defaultExpanded={["blog"]}
      options={[
        {
          children: [
            {
              description: "Draft",
              icon: <IconFileLines />,
              label: "Launch",
              value: "launch",
            },
            {
              description: "Scheduled",
              icon: <IconFileLines />,
              label: "Roadmap",
              value: "roadmap",
            },
          ],
          detail: <Badge>2</Badge>,
          icon: <IconFolder />,
          label: "Blog",
          value: "blog",
        },
        {
          children: [
            {
              icon: <IconFileLines />,
              label: "Holiday sale",
              value: "sale",
            },
            {
              icon: <IconFileLines />,
              label: "Year in review",
              value: "review",
            },
          ],
          detail: <Badge>2</Badge>,
          icon: <IconFolder />,
          label: "Archive",
          value: "archive",
        },
      ]}
      w="224"
    />
  );
}
