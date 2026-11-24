import { IconCalendarClock, IconFileLines, IconFolder } from "@optiaxiom/icons";
import { Badge, Group } from "@optiaxiom/react";
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
              addonAfter: (
                <Group aria-label="Scheduled" color="fg.secondary" role="img">
                  <IconCalendarClock />
                </Group>
              ),
              icon: <IconFileLines />,
              label: "Launch",
              value: "launch",
            },
            {
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
      w="384"
    />
  );
}
