import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  IconCopy,
  IconFileLines,
  IconFolder,
  IconPen,
  IconTrashCan,
} from "@optiaxiom/icons";
import { Badge, dialogkit } from "@optiaxiom/react";
import { Tree, type TreeOption } from "@optiaxiom/react/unstable";
import { useState } from "react";
import { action } from "storybook/actions";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

type Story = StoryObj<typeof Tree>;

export default {
  args: {
    "aria-label": "Pages",
    onExpandedChange: action("onExpandedChange"),
    // Focus moves between items, and bubbles up to the tree from the one that
    // takes it.
    onFocus: (event) =>
      action("focus")(
        event.target.querySelector("[data-slot=tree-label]")?.textContent,
      ),
    onValueChange: action("onValueChange"),
    w: "224",
  },
  component: Tree,
} as Meta<typeof Tree>;

const page = (
  value: string,
  label: string,
  children?: TreeOption["children"],
): TreeOption => ({
  addon: children ? <IconFolder /> : <IconFileLines />,
  children,
  label,
  value,
});

const pages: TreeOption[] = [
  page("home", "Home", [
    page("company", "Company", [
      page("pricing", "Pricing"),
      page("careers", "Careers"),
    ]),
    page("blog", "Blog"),
    page("contact", "Contact"),
  ]),
  page("archive", "Archive"),
];

export const Basic: Story = {
  args: {
    defaultExpanded: ["home", "company"],
    defaultValue: ["pricing"],
    options: pages,
  },
};

export const Multiple: Story = {
  args: {
    defaultExpanded: ["home", "company"],
    defaultValue: ["pricing", "blog"],
    multiple: true,
    options: pages,
  },
};

export const Details: Story = {
  args: {
    defaultExpanded: ["home"],
    options: [
      {
        ...page("home", "Home", [
          { ...page("blog", "Blog"), description: "Draft" },
          { ...page("contact", "Contact"), description: "Scheduled" },
        ]),
        detail: <Badge>3</Badge>,
      },
      { ...page("archive", "Archive"), detail: <Badge>12</Badge> },
    ],
  },
};

export const Disabled: Story = {
  args: {
    defaultExpanded: ["home"],
    options: [
      page("home", "Home", [
        page("blog", "Blog"),
        {
          ...page("contact", "Contact"),
          disabledReason: "You don't have access to this page",
        },
      ]),
    ],
  },
};

export const LazyChildren: Story = {
  args: {
    options: [
      page("home", "Home", async () => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return [page("blog", "Blog"), page("contact", "Contact")];
      }),
    ],
  },
};

const withActions = (option: TreeOption): TreeOption => ({
  ...option,
  actions: [
    {
      addon: <IconPen />,
      execute: action(`Rename ${option.label}`),
      label: "Rename",
    },
    {
      addon: <IconCopy />,
      execute: action(`Duplicate ${option.label}`),
      label: "Duplicate",
    },
    {
      addon: <IconTrashCan />,
      disabledReason:
        option.value === "home" ? "The site root can't be deleted" : undefined,
      execute: action(`Delete ${option.label}`),
      group: { hidden: true, label: "Danger", separator: true },
      intent: "danger",
      label: "Delete",
    },
  ],
  children: Array.isArray(option.children)
    ? option.children.map(withActions)
    : option.children,
});

export const ContextMenu: Story = {
  args: {
    defaultExpanded: ["home", "company"],
    options: pages.map(withActions),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const company = canvas.getByRole("treeitem", { name: "Company" });

    await userEvent.click(company);
    await userEvent.keyboard("{Shift>}{F10}{/Shift}");
    await userEvent.click(
      await screen.findByRole("option", { name: "Duplicate" }),
    );

    await waitFor(() => expect(company).toHaveFocus());
  },
};

type Page = { children?: Page[]; label: string; value: string };

const updatePages = (
  pages: Page[],
  value: string,
  update: (page: Page) => Page[],
): Page[] =>
  pages.flatMap((page) =>
    page.value === value
      ? update(page)
      : [
          {
            ...page,
            children:
              page.children && updatePages(page.children, value, update),
          },
        ],
  );

let copies = 0;
const copyPage = (page: Page): Page => ({
  children: page.children?.map(copyPage),
  label: page.label,
  value: `${page.value}-copy-${++copies}`,
});

export const RenameDuplicateDelete: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("treeitem", { name: "Blog" }));
    await userEvent.keyboard("{Shift>}{F10}{/Shift}");
    await userEvent.click(
      await screen.findByRole("option", { name: "Duplicate" }),
    );

    await expect(
      await canvas.findByRole("treeitem", { name: "Blog copy" }),
    ).toBeInTheDocument();
  },
  render: function RenameDuplicateDelete(args) {
    const [pages, setPages] = useState<Page[]>([
      {
        children: [
          {
            children: [
              { label: "Pricing", value: "pricing" },
              { label: "Careers", value: "careers" },
            ],
            label: "Company",
            value: "company",
          },
          { label: "Blog", value: "blog" },
          { label: "Contact", value: "contact" },
        ],
        label: "Home",
        value: "home",
      },
      { label: "Archive", value: "archive" },
    ]);

    const toOption = (page: Page): TreeOption => {
      // The site root keeps its name and can't be deleted.
      const root = page.value === "home";
      return {
        actions: ({ rename }) => [
          ...(root
            ? []
            : [{ addon: <IconPen />, execute: rename, label: "Rename" }]),
          {
            addon: <IconCopy />,
            execute: () =>
              setPages((pages) =>
                updatePages(pages, page.value, (page) => [
                  page,
                  { ...copyPage(page), label: `${page.label} copy` },
                ]),
              ),
            label: "Duplicate",
          },
          {
            addon: <IconTrashCan />,
            disabledReason: root ? "The site root can't be deleted" : undefined,
            execute: async () => {
              const confirmed = await dialogkit.confirm({
                action: "Delete",
                body: page.children
                  ? `"${page.label}" and the pages inside it will be deleted.`
                  : `"${page.label}" will be deleted.`,
                header: "Delete page?",
              });
              if (confirmed) {
                setPages((pages) => updatePages(pages, page.value, () => []));
              }
            },
            group: { hidden: true, label: "Danger", separator: true },
            intent: "danger",
            label: "Delete",
          },
        ],
        addon: page.children ? <IconFolder /> : <IconFileLines />,
        children: page.children?.map(toOption),
        editable: !root,
        label: page.label,
        value: page.value,
      };
    };

    return (
      <Tree
        {...args}
        defaultExpanded={["home", "company"]}
        onLabelChange={(value, label) =>
          setPages((pages) =>
            updatePages(pages, value, (page) => [{ ...page, label }]),
          )
        }
        options={pages.map(toOption)}
      />
    );
  },
};
