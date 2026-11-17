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
          addon: <IconFolder />,
          children: [
            {
              addon: <IconFileLines />,
              description: "Draft",
              label: "Launch",
              value: "launch",
            },
            {
              addon: <IconFileLines />,
              description: "Scheduled",
              label: "Roadmap",
              value: "roadmap",
            },
          ],
          detail: <Badge>2</Badge>,
          label: "Blog",
          value: "blog",
        },
        {
          addon: <IconFolder />,
          children: [
            { addon: <IconFileLines />, label: "Holiday sale", value: "sale" },
            {
              addon: <IconFileLines />,
              label: "Year in review",
              value: "review",
            },
          ],
          detail: <Badge>2</Badge>,
          label: "Archive",
          value: "archive",
        },
      ]}
      w="224"
    />
  );
}
