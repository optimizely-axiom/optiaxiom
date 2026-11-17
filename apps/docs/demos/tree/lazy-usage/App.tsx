"use client";

import { IconFileLines, IconFolder } from "@optiaxiom/icons";
import { Tree, type TreeOption } from "@optiaxiom/react/unstable";

const fetchPages = async (): Promise<TreeOption[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { addon: <IconFileLines />, label: "Product launch", value: "launch" },
    { addon: <IconFileLines />, label: "Roadmap update", value: "roadmap" },
  ];
};

export function App() {
  return (
    <Tree
      aria-label="Pages"
      options={[
        {
          addon: <IconFolder />,
          children: fetchPages,
          label: "Blog",
          value: "blog",
        },
        { addon: <IconFileLines />, label: "Newsletter", value: "newsletter" },
      ]}
      w="224"
    />
  );
}
