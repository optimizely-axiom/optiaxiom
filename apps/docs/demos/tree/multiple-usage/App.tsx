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
          addon: <IconFolder />,
          children: [
            {
              addon: <IconFileLines />,
              label: "Product launch",
              value: "launch",
            },
            {
              addon: <IconFileLines />,
              label: "Roadmap update",
              value: "roadmap",
            },
            {
              addon: <IconFileLines />,
              label: "Customer story",
              value: "story",
            },
          ],
          label: "Blog",
          value: "blog",
        },
        { addon: <IconFileLines />, label: "Newsletter", value: "newsletter" },
      ]}
      w="224"
    />
  );
}
