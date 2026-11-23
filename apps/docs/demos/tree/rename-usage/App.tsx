"use client";

import { IconFileLines, IconFolder, IconPen } from "@optiaxiom/icons";
import { Tree, type TreeOption } from "@optiaxiom/react/unstable";
import { useState } from "react";

type Page = { children?: Page[]; label: string; value: string };

const renamePage = (pages: Page[], value: string, label: string): Page[] =>
  pages.map((page) =>
    page.value === value
      ? { ...page, label }
      : {
          ...page,
          children: page.children && renamePage(page.children, value, label),
        },
  );

export function App() {
  const [pages, setPages] = useState<Page[]>([
    {
      children: [
        { label: "About us", value: "about" },
        { label: "Pricing", value: "pricing" },
        { label: "Contact", value: "contact" },
      ],
      label: "Website",
      value: "website",
    },
  ]);

  const toOption = (page: Page): TreeOption => {
    // The site root keeps its name.
    const editable = page.value !== "website";
    return {
      actions: editable
        ? ({ rename }) => [
            { addon: <IconPen />, execute: rename, label: "Rename" },
          ]
        : [],
      children: page.children?.map(toOption),
      editable,
      icon: page.children ? <IconFolder /> : <IconFileLines />,
      label: page.label,
      value: page.value,
    };
  };

  return (
    <Tree
      aria-label="Pages"
      defaultExpanded={["website"]}
      onLabelChange={(value, label) =>
        setPages((pages) => renamePage(pages, value, label))
      }
      options={pages.map(toOption)}
      w="224"
    />
  );
}
