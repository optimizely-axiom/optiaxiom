import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box } from "@optiaxiom/react";
import { ProteusDocumentRenderer } from "@optiaxiom/react/unstable";
import { useState } from "react";
import { action } from "storybook/actions";

export default {
  args: {
    onMessage: action("onMessage"),
    onToolCall: action("onToolCall"),
  },
  component: ProteusDocumentRenderer,
  decorators: (Story) => (
    <Box style={{ maxWidth: "768px" }}>
      <Story />
    </Box>
  ),
  parameters: {
    layout: "padded",
  },
} as Meta<typeof ProteusDocumentRenderer>;

type Story = StoryObj<typeof ProteusDocumentRenderer>;

export const Basic: Story = {
  args: {
    data: {
      badge_intent: "success",
    },
    element: {
      $type: "Document",
      appName: "Opal",
      body: [
        {
          $type: "Text",
          children: [
            "This is a basic Proteus Document that demonstrates rendering elements from JSON. ",
            {
              $type: "Badge",
              children: "Sample",
              intent: {
                $type: "Value",
                path: "/badge_intent",
              },
            },
          ],
        },
      ],
      subtitle: "Secondary title",
      title: "Welcome to Proteus Documents",
    },
  },
};

export const FormWithInputs: Story = {
  args: {
    element: {
      $type: "Document",
      actions: [
        {
          $type: "Action",
          appearance: "primary-opal",
          children: "Create Test Plan",
        },
      ],
      appName: "Opal",
      body: [
        {
          $type: "Group",
          children: [
            {
              $type: "Heading",
              children: "1. Where should this test run?",
              fontSize: "md",
              fontWeight: "600",
              level: "2",
            },
            {
              $type: "Text",
              children:
                "Select how you'd like to define the page or experience.",
              color: "fg.secondary",
              fontSize: "md",
            },
            {
              $type: "Field",
              children: {
                $type: "Select",
                children: [
                  {
                    $type: "SelectTrigger",
                    w: "full",
                  },
                  {
                    $type: "SelectContent",
                  },
                ],
                name: "target_by",
                options: [
                  {
                    label: "URL",
                    value: "url",
                  },
                  {
                    label: "Saved Pages",
                    value: "page",
                  },
                ],
              },
              label: "Target by",
            },
            {
              $type: "Show",
              children: {
                $type: "Field",
                children: {
                  $type: "Input",
                  name: "url",
                  placeholder: "Add a URL",
                },
                label: "URL",
              },
              when: {
                "==": [{ $type: "Value", path: "/target_by" }, "url"],
              },
            },
            {
              $type: "Show",
              children: {
                $type: "Field",
                children: {
                  $type: "Select",
                  children: [
                    {
                      $type: "SelectTrigger",
                      w: "full",
                    },
                    {
                      $type: "SelectContent",
                    },
                  ],
                  name: "saved_page",
                  options: [
                    { label: "Home page", value: "home" },
                    { label: "Marketplace", value: "marketplace" },
                    { label: "Product Details", value: "product_details" },
                    { label: "Shopping Cart", value: "cart" },
                    { label: "Checkout", value: "checkout" },
                  ],
                },
                label: "Saved Page",
              },
              when: {
                "==": [{ $type: "Value", path: "/target_by" }, "page"],
              },
            },
          ],
          flexDirection: "column",
          gap: "16",
        },
        {
          $type: "Show",
          children: {
            $type: "Group",
            children: [
              {
                $type: "Heading",
                children: "2. What would you like to test?",
                fontSize: "md",
                fontWeight: "600",
                level: "2",
              },
              {
                $type: "Text",
                children:
                  "Describe what you'd like to test. If you're not sure, try getting test ideas first.",
                color: "fg.secondary",
                fontSize: "md",
              },
              {
                $type: "Field",
                children: {
                  $type: "Textarea",
                  name: "test_idea",
                  placeholder:
                    "e.g., Add quantity badges to product thumbnails to show how many of each item they're buying, improving clarity, confidence, and potentially conversion",
                },
                label: "Test Idea",
              },
            ],
            flexDirection: "column",
            gap: "16",
          },
          when: {
            or: [
              {
                and: [
                  {
                    "==": [{ $type: "Value", path: "/target_by" }, "url"],
                  },
                  { "!!": { $type: "Value", path: "/url" } },
                ],
              },
              {
                and: [
                  {
                    "==": [{ $type: "Value", path: "/target_by" }, "page"],
                  },
                  { "!!": { $type: "Value", path: "/saved_page" } },
                ],
              },
            ],
          },
        },
      ],
      title: "Create a test plan",
    },
  },
  render: function Render(args) {
    const [data, setData] = useState<Record<string, unknown>>({
      target_by: "url",
    });
    return (
      <ProteusDocumentRenderer {...args} data={data} onDataChange={setData} />
    );
  },
};

export const WithImage: Story = {
  args: {
    data: {
      link: "https://placehold.co/600x400",
    },
    element: {
      $type: "Document",
      actions: [
        {
          $type: "Action",
          appearance: "primary",
          children: "Download",
          onClick: {
            action: "download",
            url: { $type: "Value", path: "/link" },
          },
        },
      ],
      body: [
        {
          $type: "Image",
          alt: "A delicious, juicy pan-seared chicken breast dish with broccoli sides",
          m: "auto",
          maxW: "md",
          src: "https://placehold.co/600x400",
        },
        {
          $type: "Group",
          border: "1",
          borderColor: "border.tertiary",
          children: [
            {
              $type: "Group",
              children: [
                {
                  $type: "Text",
                  children: "Alt Text",
                  fontSize: "md",
                  fontWeight: "500",
                },
                {
                  $type: "Text",
                  children:
                    "A delicious, juicy pan-seared chicken breast dish with broccoli sides",
                  color: "fg.secondary",
                  fontSize: "sm",
                },
              ],
              flex: "1",
              flexDirection: "column",
              gap: "8",
            },
          ],
          gap: "8",
          px: "16",
          py: "12",
          rounded: "lg",
        },
      ],
      subtitle: "Created Jan 15, 2025",
      title: "Juicy Chicken with Broccoli",
    },
  },
};

export const WithImageGrid: Story = {
  args: {
    data: {
      images: [
        {
          alt: "Lime chicken thighs on a plate",
          src: "https://placehold.co/274x250",
        },
        {
          alt: "Chicken with lemon sauce and broccoli",
          src: "https://placehold.co/274x250",
        },
        {
          alt: "Sliced roasted chicken breast with broccoli",
          src: "https://placehold.co/274x250",
        },
        {
          alt: "Sesame chicken with broccoli",
          src: "https://placehold.co/274x250",
        },
      ],
    },
    element: {
      $type: "Document",
      actions: [
        {
          $type: "Action",
          appearance: "primary",
          children: "Download",
        },
      ],
      appName: "Opal",
      body: [
        {
          $type: "Group",
          children: {
            $type: "Map",
            children: {
              $type: "Image",
              alt: { $type: "Value", path: "alt" },
              rounded: "md",
              src: { $type: "Value", path: "src" },
              w: "full",
            },
            path: "/images",
          },
          display: "grid",
          gap: "12",
          gridTemplateColumns: "2",
          m: "auto",
          maxW: "lg",
          w: "full",
        },
      ],
      subtitle: "4 variations generated",
      title: "Generated Images",
    },
    readOnly: true,
  },
};

export const WithAllActions: Story = {
  args: {
    element: {
      $type: "Document",
      actions: [
        {
          $type: "Action",
          appearance: "primary",
          children: "Approve",
        },
        {
          $type: "CancelAction",
          children: "Reject",
        },
      ],
      appName: "Opal",
      body: [
        {
          $type: "Text",
          children: "Would you like to approve the proposed changes?",
        },
      ],
      title: "Approve Changes",
    },
  },
};

export const ReadonlyMode: Story = {
  args: {
    data: { message: "This form is readonly", name: "John Doe" },
    element: {
      $type: "Document",
      actions: [
        {
          $type: "Action",
          appearance: "primary",
          children: "Submit",
        },
      ],
      appName: "Opal",
      body: [
        {
          $type: "Field",
          children: {
            $type: "Input",
            name: "name",
          },
          label: "Name",
        },
        {
          $type: "Field",
          children: {
            $type: "Textarea",
            name: "message",
          },
          label: "Message",
        },
      ],
      title: "Readonly Document",
    },
    readOnly: true,
  },
};

export const WithDataTable: Story = {
  args: {
    element: {
      $type: "Document",
      appName: "Opal",
      body: [
        {
          $type: "DataTable",
          columns: [
            { accessorKey: "name", header: "Name" },
            { accessorKey: "role", header: "Role" },
            { accessorKey: "status", header: "Status" },
          ],
          data: [
            { name: "Alice", role: "Engineer", status: "Active" },
            { name: "Bob", role: "Designer", status: "Active" },
            { name: "Charlie", role: "PM", status: "On Leave" },
          ],
        },
      ],
      title: "Team Members",
    },
  },
};

export const WithChart: Story = {
  args: {
    element: {
      $type: "Document",
      appName: "Opal",
      body: [
        {
          $type: "Chart",
          data: [
            { month: "Jan", revenue: 4000, revenueLabel: "$4K" },
            { month: "Feb", revenue: 3000, revenueLabel: "$3K" },
            { month: "Mar", revenue: 2000, revenueLabel: "$2K" },
            { month: "Apr", revenue: 2780, revenueLabel: "$2.8K" },
            { month: "May", revenue: 2780, revenueLabel: "$2.8K" },
            { month: "Jun", revenue: 2780, revenueLabel: "$2.8K" },
          ],
          series: [
            { dataKey: "revenue", labelKey: "revenueLabel", name: "Revenue" },
          ],
          type: "bar",
          xAxisKey: "month",
        },
        {
          $type: "Chart",
          data: [
            {
              central: 41000000,
              centralLabel: "$41M",
              east: 57000000,
              eastLabel: "$57M",
              month: "Jan",
              south: 38000000,
              southLabel: "$38M",
              west: 68000000,
              westLabel: "$68M",
            },
          ],
          series: [
            { dataKey: "west", labelKey: "westLabel", name: "West" },
            { dataKey: "east", labelKey: "eastLabel", name: "East" },
            { dataKey: "central", labelKey: "centralLabel", name: "Central" },
            { dataKey: "south", labelKey: "southLabel", name: "South" },
          ],
          type: "bar",
          xAxisKey: "month",
        },
      ],
      title: "Quarterly Report",
    },
  },
};

export const ExploreReport: Story = {
  args: {
    data: {
      data: {
        schema: {
          columns: [
            {
              dataType: "DATA_TYPE_TIMESTAMP",
              displayName: "Time Bucket",
              key: "Time Bucket",
            },
            {
              dataType: "DATA_TYPE_INT64",
              displayName: "measure0",
              key: "Measure 0",
            },
          ],
        },
        upserts: [
          {
            i: [
              1765180800000, 1765785600000, 1766390400000, 1766995200000,
              1767600000000, 1768204800000, 1768809600000, 1769414400000,
              1770019200000, 1770624000000, 1771228800000, 1771833600000,
              1772438400000,
            ],
            schema: {
              dataType: "DATA_TYPE_TIMESTAMP",
              displayName: "Time Bucket",
              key: "Time Bucket",
            },
          },
          {
            i: [
              495, 494, 237, 176, 435, 488, 485, 496, 492, 534, 477, 526, 496,
            ],
            schema: {
              dataType: "DATA_TYPE_INT64",
              displayName: "measure0",
              key: "Measure 0",
            },
          },
        ],
      },
      explore: {
        description:
          "Event segmentation showing the weekly unique count of users who started an experiment over the past 3 months.",
        name: "Unique Users Starting Experiments (Last 3 Months, Weekly)",
      },
    },
    element: {
      $type: "Document",
      appName: "Opal",
      body: [
        {
          $type: "Text",
          bg: "bg.page",
          children: { $type: "Value", path: "/explore/description" },
          color: "fg.secondary",
          fontSize: "md",
          p: "16",
          rounded: "md",
        },
        {
          $type: "Chart",
          data: {
            $type: "Zip",
            sources: {
              date: {
                $type: "Value",
                formatter: "DateTime",
                path: "/data/upserts/0/i",
              },
              measure0: { $type: "Value", path: "/data/upserts/1/i" },
            },
          },
          series: [
            {
              dataKey: "measure0",
              name: "Unique Accounts",
            },
          ],
          type: "line",
          xAxisKey: "date",
        },
        {
          $type: "DataTable",
          columns: [
            { accessorKey: "date", header: "Time Bucket" },
            {
              accessorKey: "measure0",
              header: "Unique Accounts",
            },
          ],
          data: {
            $type: "Zip",
            sources: {
              date: {
                $type: "Value",
                formatter: {
                  options: { month: "short", year: "numeric" },
                  type: "DateTime",
                },
                path: "/data/upserts/0/i",
              },
              measure0: { $type: "Value", path: "/data/upserts/1/i" },
            },
          },
        },
      ],
      title: { $type: "Value", path: "/explore/name" },
    },
  },
};

export const PartialRendering: Story = {
  args: {
    element: {
      $type: "Document",
      actions: [
        {
          $type: "Action",
          children: "Submit",
        },
      ],
      appName: "Opal",
      body: [
        {
          $type: "Group",
          children: [
            {
              $type: "Text",
              children: "Sample text",
            },
            {
              $type: "InvalidElement",
              content: "This is an invalid element type",
            },
          ],
        },
      ],
      title: "Invalid Document Example",
    },
  },
};
