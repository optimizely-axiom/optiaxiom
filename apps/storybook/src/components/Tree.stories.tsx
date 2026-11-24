import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  IconCalendarClock,
  IconCopy,
  IconFileLines,
  IconFolder,
  IconLayerGroup,
  IconLock,
  IconPen,
  IconTrashCan,
  IconUserPen,
} from "@optiaxiom/icons";
import { Badge, dialogkit, Group, Text, toaster } from "@optiaxiom/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Tree,
  type TreeOption,
} from "@optiaxiom/react/unstable";
import { type ReactNode, useState } from "react";
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
  children,
  icon: children ? <IconFolder /> : <IconFileLines />,
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
          page("blog", "Blog"),
          page("contact", "Contact"),
        ]),
        detail: <Badge>3</Badge>,
      },
      { ...page("archive", "Archive"), detail: <Badge>12</Badge> },
    ],
  },
};

export const LongLabels: Story = {
  args: {
    defaultExpanded: ["home"],
    options: [
      page("home", "Home", [
        page("blog", "Blog"),
        page(
          "launch",
          "Spring product launch announcement for enterprise customers",
        ),
        page(
          "review",
          "Quarterly business review materials for the leadership team",
          [page("agenda", "Agenda")],
        ),
        page(
          "onboarding",
          "Customer onboarding checklist and welcome email templates",
        ),
      ]),
    ],
  },
  play: async ({ canvas }) => {
    await userEvent.hover(canvas.getByText(/^Spring product launch/));
    await expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "Spring product launch announcement for enterprise customers",
    );
  },
};

/**
 * The statuses a CMS page tree shows at the end of a row; several can show at
 * once.
 */
const status = (label: string, icon: ReactNode, count?: number) => (
  <Group aria-label={label} color="fg.secondary" gap="2" role="img">
    {icon}
    {count !== undefined && <Text fontSize="sm">{count}</Text>}
  </Group>
);

const pageActions = [{ label: "Duplicate" }, { label: "Delete" }];

export const AddonAfter: Story = {
  args: {
    defaultExpanded: ["home"],
    options: [
      page("home", "Home", [
        {
          ...page(
            "launch",
            "Spring product launch announcement for enterprise customers",
          ),
          actions: pageActions,
          addonAfter: (
            <>
              {status("Scheduled", <IconCalendarClock />)}
              {status("3 variations", <IconLayerGroup />, 3)}
            </>
          ),
        },
        {
          ...page("pricing", "Pricing"),
          actions: pageActions,
          addonAfter: status("Locked", <IconLock />),
        },
        {
          ...page("careers", "Careers"),
          actions: pageActions,
          addonAfter: status("Being edited by Emily Chen", <IconUserPen />),
        },
        { ...page("contact", "Contact"), actions: pageActions },
      ]),
    ],
    w: "384",
  },
  play: async ({ canvas }) => {
    await userEvent.hover(canvas.getByText(/^Spring product launch/));
    await screen.findByRole("tooltip");

    // The full-label tooltip closes once the pointer is on the end addon.
    await userEvent.hover(canvas.getByRole("img", { name: "3 variations" }));
    await waitFor(() =>
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument(),
    );
  },
};

export const AddonAfterHoverCard: Story = {
  args: {
    options: [
      {
        ...page("launch", "Spring launch"),
        addonAfter: (
          <HoverCard>
            <HoverCardTrigger asChild>
              {status("3 variations", <IconLayerGroup />, 3)}
            </HoverCardTrigger>
            <HoverCardContent aria-label="Variations">
              <Text>English (United States)</Text>
              <Text>German</Text>
              <Text>French</Text>
            </HoverCardContent>
          </HoverCard>
        ),
      },
      page("pricing", "Pricing"),
    ],
    w: "384",
  },
  play: async ({ canvas }) => {
    const row = canvas
      .getByRole("treeitem", { name: "Spring launch" })
      .querySelector<HTMLElement>(":scope > *");
    await userEvent.hover(canvas.getByRole("img", { name: "3 variations" }));
    const card = await screen.findByRole("dialog", { name: "Variations" });

    // The card opens on the row's right, aligned with its top.
    await waitFor(async () => {
      const rowRect = row!.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      await expect(cardRect.left).toBeGreaterThanOrEqual(rowRect.right);
      await expect(cardRect.top).toBeCloseTo(rowRect.top, 0);
    });
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

let loadAttempts = 0;

export const LoadError: Story = {
  args: {
    options: [
      page("home", "Home", async () => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        // The first attempt fails; expanding again loads the pages. The tree
        // shows nothing on failure, so the loader reports it itself.
        if (++loadAttempts % 2 === 1) {
          toaster.create("Couldn't load Home.", { intent: "danger" });
          throw new Error("Network error");
        }
        return [page("blog", "Blog"), page("contact", "Contact")];
      }),
    ],
  },
};

export const Paging: Story = {
  args: {
    options: [
      page("blog", "Blog", async ({ pageParam }) => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        const index = typeof pageParam === "number" ? pageParam : 0;
        const start = index * 3;
        return {
          nextPageLabel: "Load more posts",
          nextPageParam: start + 3 < 8 ? index + 1 : undefined,
          options: Array.from({ length: Math.min(3, 8 - start) }, (_, index) =>
            page(`post-${start + index + 1}`, `Post ${start + index + 1}`),
          ),
        };
      }),
    ],
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

export const Actions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const blog = canvas.getByRole("treeitem", { name: "Blog" });

    await userEvent.click(blog);
    await userEvent.keyboard("{Shift>}{F10}{/Shift}");
    await userEvent.click(
      await screen.findByRole("option", { name: "Duplicate" }),
    );

    await expect(
      await canvas.findByRole("treeitem", { name: "Blog copy" }),
    ).toBeInTheDocument();
    await waitFor(() => expect(blog).toHaveFocus());
  },
  render: function Actions(args) {
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
        children: page.children?.map(toOption),
        editable: !root,
        icon: page.children ? <IconFolder /> : <IconFileLines />,
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
