"use client";

import { IconFileLines, IconFolder } from "@optiaxiom/icons";
import { Tree, type TreeOption } from "@optiaxiom/react/unstable";

const posts = Array.from({ length: 8 }, (_, index) => `Post ${index + 1}`);
const pageSize = 3;

const fetchPosts = async ({
  pageParam,
}: {
  pageParam: number | string | undefined;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const page = typeof pageParam === "number" ? pageParam : 0;
  const items = posts.slice(page * pageSize, (page + 1) * pageSize);
  return {
    nextPageLabel: "Load more posts",
    nextPageParam: (page + 1) * pageSize < posts.length ? page + 1 : undefined,
    options: items.map((label): TreeOption => ({
      addon: <IconFileLines />,
      label,
      value: label,
    })),
  };
};

export function App() {
  return (
    <Tree
      aria-label="Pages"
      options={[
        {
          addon: <IconFolder />,
          children: fetchPosts,
          label: "Blog",
          value: "blog",
        },
      ]}
      w="224"
    />
  );
}
