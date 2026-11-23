import { IconFileLines, IconFolder } from "@optiaxiom/icons";
import { Tree } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Tree
      aria-label="Pages"
      defaultExpanded={["blog"]}
      defaultValue={["launch", "roadmap"]}
      multiple
      options={[
        {
          children: [
            {
              icon: <IconFileLines />,
              label: "Product launch",
              value: "launch",
            },
            {
              icon: <IconFileLines />,
              label: "Roadmap update",
              value: "roadmap",
            },
            {
              icon: <IconFileLines />,
              label: "Customer story",
              value: "story",
            },
          ],
          icon: <IconFolder />,
          label: "Blog",
          value: "blog",
        },
        {
          icon: <IconFileLines />,
          label: "Newsletter",
          value: "newsletter",
        },
      ]}
      w="224"
    />
  );
}
