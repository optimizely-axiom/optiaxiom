"use client";

import { IconFileLines, IconFolder } from "@optiaxiom/icons";
import { Tree, type TreeOption } from "@optiaxiom/react/unstable";

const fetchPages = async (): Promise<TreeOption[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
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
  ];
};

export function App() {
  return (
    <Tree
      aria-label="Pages"
      options={[
        {
          children: fetchPages,
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
