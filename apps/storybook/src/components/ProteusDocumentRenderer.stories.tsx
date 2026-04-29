import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";
import { useEffect, useState } from "react";
import { action } from "storybook/actions";

export default {
  args: {
    onInteraction: action("onInteraction"),
    onMessage: action("onMessage"),
    strict: true,
  },
  component: ProteusDocumentRenderer,
  decorators: (Story) => (
    <Box style={{ maxWidth: 600 }}>
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
    element: {
      $type: "Document",
      body: [
        {
          $type: "ImageCarousel",
          images: [
            {
              alt: "A delicious, juicy pan-seared chicken breast dish with broccoli sides",
              src: "https://placehold.co/1600x900",
            },
          ],
        },
        {
          $type: "ImageCarousel",
          images: [
            {
              alt: "A delicious, juicy pan-seared chicken breast dish with broccoli sides",
              src: "https://placehold.co/900x1600",
            },
          ],
          title: "Sample 2",
        },
        {
          $type: "ImageCarousel",
          images: [
            {
              alt: "A delicious, juicy pan-seared chicken breast dish with broccoli sides",
              src: "https://placehold.co/400x600",
            },
          ],
          title: "Sample 3",
        },
      ],
      subtitle: "Created Jan 15, 2025",
      title: "Juicy Chicken with Broccoli",
    },
  },
};

export const WithImageCarousel: Story = {
  args: {
    data: {
      images: [
        {
          alt: "Lime chicken thighs on a plate",
          src: "https://placehold.co/400x600",
        },
        {
          alt: "Chicken with lemon sauce and broccoli",
          src: "https://placehold.co/600x400",
        },
        {
          alt: "Sliced roasted chicken breast with broccoli",
          src: "https://placehold.co/400x600",
        },
        {
          alt: "Sesame chicken with broccoli",
          src: "https://placehold.co/600x400",
        },
        {
          alt: "Grilled chicken with vegetables",
          src: "https://placehold.co/400x600",
        },
        {
          alt: "Roasted chicken with potatoes",
          src: "https://placehold.co/600x400",
        },
        {
          alt: "Chicken salad bowl",
          src: "https://placehold.co/400x600",
        },
        {
          alt: "BBQ chicken wings",
          src: "https://placehold.co/600x400",
        },
      ],
    },
    element: {
      $type: "Document",
      appName: "Opal",
      body: [
        {
          $type: "ImageCarousel",
          images: {
            $type: "Value",
            path: "/images",
          },
        },
      ],
      subtitle: "Created Jan 15, 2025",
      title: "Images created",
    },
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
          $type: "Button",
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

export const AskUserQuestion: Story = {
  args: {
    data: {
      questions: [
        {
          options: [
            "Search existing",
            "Generate from Axiom",
            "Start from scratch",
          ],
          question: "How should I handle the Flow components?",
          type: "single_select",
        },
        {
          options: [
            "Unit",
            "Integration",
            "Visual regression",
            "Accessibility",
          ],
          question: "Which tests should I add?",
          type: "multi_select",
        },
      ],
    },
    element: {
      $type: "Document",
      blocking: true,
      body: {
        $type: "Question",
        questions: {
          $type: "Value",
          path: "/questions",
        },
      },
    },
  },
};

export const AskAgentInput: Story = {
  args: {
    data: {
      agent: {
        description:
          "Simplifies UTM parameter creation for campaign tracking by using campaign details (source, medium, campaign, content, term) and automatically generates correctly formatted UTM links. This agent ensures accurate attribution tracking, improves data quality, and simplifies campaign analysis.",
        name: "UTM Creation",
      },
      parameters: [
        {
          description:
            "Marketing channel where link is used. If none provided, all included",
          name: "Channel",
          placeholder: "e.g., Social, Email, Paid Search",
          required: false,
          type: "string",
          value: null,
        },
        {
          description: "Name of the asset or campaign that you're promoting",
          name: "Campaign Name",
          placeholder: "e.g., spring-sale-2024",
          required: true,
          type: "string",
          value: null,
        },
        {
          description: "The destination URL",
          name: "Landing Page URL",
          placeholder: "e.g., https://example.com/landing-page",
          required: true,
          type: "string",
          value: null,
        },
        {
          description: "Additional content if needed",
          name: "Content",
          placeholder: "e.g., hero-banner, sidebar-cta",
          required: false,
          type: "string",
          value: null,
        },
        {
          description: "Whether to include metadata in the output",
          name: "Include Metadata",
          required: false,
          type: "boolean",
          value: null,
        },
      ],
    },
    element: {
      $type: "Document",
      actions: [
        {
          $type: "Action",
          children: "Cancel",
          onClick: {
            message: "[User declined to run the agent]",
          },
        },
        {
          $type: "Action",
          appearance: "primary-opal",
          children: "Run agent",
          onClick: {
            message: {
              $type: "Map",
              children: {
                $type: "Concat",
                children: [
                  { $type: "Value", path: "name" },
                  ": ",
                  {
                    $type: "Show",
                    children: "[Not specified]",
                    when: { "!": { $type: "Value", path: "value" } },
                  },
                  {
                    $type: "Show",
                    children: { $type: "Value", path: "value" },
                    when: { "!!": { $type: "Value", path: "value" } },
                  },
                ],
              },
              path: "/parameters",
              separator: "\n",
            },
          },
          type: "submit",
        },
      ],
      blocking: true,
      body: {
        $type: "Group",
        children: {
          $type: "Map",
          children: [
            {
              $type: "Show",
              children: {
                $type: "Field",
                children: {
                  $type: "Input",
                  autoFocus: {
                    $type: "Show",
                    children: true,
                    when: { "==": [{ $type: "MapIndex" }, 0] },
                  },
                  name: "value",
                  placeholder: { $type: "Value", path: "placeholder" },
                  required: { $type: "Value", path: "required" },
                },
                description: { $type: "Value", path: "description" },
                label: { $type: "Value", path: "name" },
                required: { $type: "Value", path: "required" },
              },
              when: {
                "==": [{ $type: "Value", path: "type" }, "string"],
              },
            },
            {
              $type: "Show",
              children: {
                $type: "Switch",
                children: {
                  $type: "Value",
                  path: "name",
                },
                description: { $type: "Value", path: "description" },
                name: "value",
                value: "Yes",
              },
              when: {
                "==": [{ $type: "Value", path: "type" }, "boolean"],
              },
            },
          ],
          path: "/parameters",
        },
        flexDirection: "column",
        gap: "24",
      },
      subtitle: {
        $type: "Value",
        path: "/agent/description",
      },
      title: {
        $type: "Value",
        path: "/agent/name",
      },
      titleIcon:
        "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2221%22%20height%3D%2220%22%20fill%3D%22none%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M9.463%208.198c.184-.052.437-.005.616.064l9.73%203.361c.226.095.4.286.462.507a.87.87%200%200%201-.608%201.09l-3.795%201.374c-.896.286-.934.773-.934.785l-1.177%203.656c-.095.226-.296.364-.517.427-.48.136-.907-.102-1.044-.581l-3.33-9.556c-.136-.48.117-.99.597-1.127M15.972%200a2.45%202.45%200%200%201%202.457%202.457v4.3c0%20.308-.307.615-.614.615a.63.63%200%200%201-.615-.614V2.457c0-.691-.576-1.228-1.228-1.228H2.457c-.691%200-1.228.537-1.228%201.228v13.515c0%20.652.537%201.228%201.228%201.228h4.3c.307%200%20.614.27.614.614%200%20.308-.307.615-.614.615h-4.3A2.45%202.45%200%200%201%200%2015.972V2.457A2.426%202.426%200%200%201%202.457%200zm-3.486%2017.418.767-2.385q.013-.057.031-.119a2%202%200%200%201%20.295-.558c.294-.39.746-.709%201.371-.916l2.859-1.036L9.77%209.627zM3.51%209.762l2.62.824a.63.63%200%200%201%20.422.78.63.63%200%200%201-.78.421l-2.622-.824c-.327-.103-.497-.48-.42-.78.102-.328.48-.497.78-.421m1.832-4.406a.63.63%200%200%201%20.868-.014l1.768%201.707c.22.213.228.648.014.869a.63.63%200%200%201-.869.015L5.356%206.225a.606.606%200%200%201-.014-.869m4.79-2.615a.63.63%200%200%201%20.794.395l.913%202.59a.63.63%200%200%201-.394.795.63.63%200%200%201-.794-.394l-.913-2.59c-.086-.298.07-.682.394-.796%22%2F%3E%3C%2Fsvg%3E",
    },
  },
  render: function Render(args) {
    const [data, setData] = useState<Record<string, unknown>>(args.data ?? {});
    return (
      <ProteusDocumentRenderer {...args} data={data} onDataChange={setData} />
    );
  },
};

export const AskAgentInputTruncate: Story = {
  args: {
    ...AskAgentInput.args,
    data: {
      ...AskAgentInput.args?.data,
      parameters: [
        {
          name: "Post Topic",
          placeholder: "e.g., Our new AI-powered Personalization engine launch",
          required: true,
          type: "string",
          value: null,
        },
        {
          name: "Target Audience",
          placeholder: "e.g., Digital marketing managers and CRO specialists",
          required: true,
          type: "string",
          value: null,
        },
        {
          name: "Channels",
          placeholder: "e.g., LinkedIn, X, Instagram",
          required: true,
          type: "string",
          value: null,
        },
        {
          name: "Primary CTA",
          placeholder:
            "e.g., Read the blog post: https://optimizely.com/blog/ai-personalization",
          required: true,
          type: "string",
          value: null,
        },
        {
          name: "Brand Voice Notes",
          placeholder:
            "e.g., Professional, insightful, use 1-2 relevant emojis",
          required: false,
          type: "string",
          value: null,
        },
        {
          name: "Keywords",
          placeholder: "e.g., personalization, AI, conversion",
          required: false,
          type: "string",
          value: null,
        },
        {
          name: "Publish Date",
          placeholder: "e.g., 2026-05-01",
          required: false,
          type: "string",
          value: null,
        },
        {
          name: "Campaign Source",
          placeholder: "e.g., Q2 launch campaign",
          required: false,
          type: "string",
          value: null,
        },
        {
          name: "Tracking ID",
          placeholder: "e.g., UTM-12345",
          required: false,
          type: "string",
          value: null,
        },
        {
          name: "Include Hashtags",
          required: false,
          type: "boolean",
          value: null,
        },
      ],
    },
    element: {
      $type: "Document",
      body: {},
      ...AskAgentInput.args?.element,
      compact: true,
    },
  },
  render: function Render(args) {
    const [data, setData] = useState<Record<string, unknown>>(args.data ?? {});
    return (
      <ProteusDocumentRenderer {...args} data={data} onDataChange={setData} />
    );
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

export const WithMetricCards: Story = {
  args: {
    data: {
      metrics: [
        {
          label: "Title",
          trend: "+12% vs last quarter",
          trendColor: "fg.success.strong",
          value: "$204M",
        },
        {
          label: "TOTAL CLOSE RATE",
          trend: "-3% vs last quarter",
          trendColor: "fg.error.strong",
          value: "83%",
        },
        {
          label: "TOTAL DEALS CLOSED",
          trend: "+18 vs last quarter",
          trendColor: "fg.success.strong",
          value: "230",
        },
      ],
    },
    element: {
      $type: "Document",
      appName: "Salesforce CRM",
      body: [
        {
          $type: "Group",
          children: {
            $type: "Map",
            children: {
              $type: "Group",
              border: "1",
              borderColor: "border.tertiary",
              children: [
                {
                  $type: "Text",
                  children: { $type: "Value", path: "label" },
                  color: "fg.tertiary",
                  fontSize: "xs",
                  textTransform: "uppercase",
                },
                {
                  $type: "Text",
                  children: { $type: "Value", path: "value" },
                  fontSize: "2xl",
                  fontWeight: "700",
                },
                {
                  $type: "Text",
                  children: { $type: "Value", path: "trend" },
                  color: { $type: "Value", path: "trendColor" },
                  fontSize: "sm",
                },
              ],
              flex: "1",
              flexDirection: "column",
              gap: "4",
              p: "12",
              rounded: "xl",
            },
            path: "/metrics",
          },
          gap: "16",
        },
      ],
      subtitle: "October 1 - December 31, 2025",
      title: "Q4 2024 Sales Performance",
    },
  },
};

export const ExploreReport: Story = {
  args: {
    data: {
      data: {
        chart: {
          chartData: [
            {
              label: "page_view",
              value: 64,
            },
            {
              label: "purchase",
              value: 23,
            },
            {
              label: "user_engagement_tracking",
              value: 18,
            },
            {
              label: "session_start",
              value: 15,
            },
            {
              label: "first_visit",
              value: 12,
            },
            {
              label: "scroll_depth_tracking_event",
              value: 9,
            },
            {
              label: "button_click_homepage_hero",
              value: 7,
            },
            {
              label: "video_start",
              value: 5,
            },
            {
              label: "add_to_cart",
              value: 4,
            },
            {
              label: "newsletter_subscription_form",
              value: 2,
            },
          ],
        },
        columns: [
          {
            accessorKey: "dimensionValues/0/value",
            header: "Event Name",
            size: 200,
          },
          {
            accessorKey: "metricValues/0/value",
            format: "Number",
            header: "Event Count",
            size: 100,
          },
        ],
        rows: [
          {
            dimensionValues: [
              {
                value: "page_view",
              },
            ],
            metricValues: [
              {
                value: "64",
              },
            ],
          },
          {
            dimensionValues: [
              {
                value: "purchase",
              },
            ],
            metricValues: [
              {
                value: "23",
              },
            ],
          },
          {
            dimensionValues: [
              {
                value: "user_engagement_tracking",
              },
            ],
            metricValues: [
              {
                value: "18",
              },
            ],
          },
          {
            dimensionValues: [
              {
                value: "session_start",
              },
            ],
            metricValues: [
              {
                value: "15",
              },
            ],
          },
          {
            dimensionValues: [
              {
                value: "first_visit",
              },
            ],
            metricValues: [
              {
                value: "12",
              },
            ],
          },
          {
            dimensionValues: [
              {
                value: "scroll_depth_tracking_event",
              },
            ],
            metricValues: [
              {
                value: "9",
              },
            ],
          },
          {
            dimensionValues: [
              {
                value: "button_click_homepage_hero",
              },
            ],
            metricValues: [
              {
                value: "7",
              },
            ],
          },
          {
            dimensionValues: [
              {
                value: "video_start",
              },
            ],
            metricValues: [
              {
                value: "5",
              },
            ],
          },
          {
            dimensionValues: [
              {
                value: "add_to_cart",
              },
            ],
            metricValues: [
              {
                value: "4",
              },
            ],
          },
          {
            dimensionValues: [
              {
                value: "newsletter_subscription_form",
              },
            ],
            metricValues: [
              {
                value: "2",
              },
            ],
          },
        ],
        title: "GA4 Realtime Report",
      },
    },
    element: {
      $type: "Document",
      appName: "Opal",
      body: [
        {
          $type: "Chart",
          data: { $type: "Value", path: "/data/chart/chartData" },
          layout: "vertical",
          series: [
            {
              dataKey: "value",
              name: "Event Count",
            },
          ],
          type: "bar",
          xAxisKey: "label",
        },
        {
          $type: "DataTable",
          columns: { $type: "Value", path: "/data/columns" },
          data: { $type: "Value", path: "/data/rows" },
        },
      ],
      title: { $type: "Value", path: "/data/title" },
    },
  },
};

export const ExploreResources: Story = {
  args: {
    data: {
      table_data: [
        {
          cmp_url: "https://example/task/id-123",
          due_date: "2025-12-01T01:30:00Z",
          owner: "John Doe",
          reference: "TSK-8526",
          status: "Overdue",
          title: "Add quantity badges to product thumbnails",
          type: "Task",
        },
        {
          cmp_url: "https://example/task/id-345",
          due_date: "2026-02-06T11:00:00Z",
          owner: "Jane Doe",
          reference: "TSK-9102",
          status: "In Progress",
          title: "D-Congress 2026 - Digital screen content",
          type: "Task",
        },
        {
          cmp_url: "https://example/asset/id-456",
          // image_url:
          //   "https://placehold.co/600x400/e2e8f0/475569?text=Enrollment",
          owner: "Sample User",
          status: null,
          title: "User Initiated Enrollment.docx",
          type: "Asset",
        },
      ],
      total_results: 3,
    },
    element: {
      $type: "Document",
      appIcon:
        "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Crect%20width%3D%2220%22%20height%3D%2220%22%20rx%3D%224%22%20fill%3D%22%23F0F3FF%22%2F%3E%3Cpath%20d%3D%22M16.1963%2015.4847V16.1976H3.70117V15.4847H16.1963ZM14.034%205.84521C14.0339%205.11412%2013.4342%204.51465%2012.703%204.51465H7.15169C6.42066%204.51476%205.82124%205.11413%205.82113%205.84521V11.3966C5.82113%2012.1277%206.42054%2012.7274%207.15169%2012.7275H12.703C13.4342%2012.7275%2014.034%2012.1278%2014.034%2011.3966V8.25203L12.3246%209.95695C11.5283%2010.7513%2010.229%2010.7497%209.43481%209.95329L7.66398%208.17757L7.91585%207.9257L8.16813%207.67423L9.93937%209.45036C10.4557%209.96804%2011.304%209.96917%2011.8217%209.4528L14.034%207.24577V5.84521ZM14.7465%206.53491L16.0465%205.23853L16.5499%205.74308L14.7465%207.54159V11.3966C14.7465%2012.5213%2013.8277%2013.44%2012.703%2013.44H7.15169C6.02701%2013.4399%205.10824%2012.5212%205.10824%2011.3966V5.84521C5.10835%204.7206%206.02718%203.80186%207.15169%203.80176H12.703C13.8277%203.80176%2014.7464%204.72064%2014.7465%205.84521V6.53491Z%22%20fill%3D%22%230037FF%22%2F%3E%3C%2Fsvg%3E",
      appName: "Content Marketing Platform",
      body: [
        {
          $type: "Group",
          border: "1",
          borderColor: "border.tertiary",
          children: {
            $type: "Map",
            children: [
              {
                $type: "Card",
                border: "0",
                children: {
                  $type: "CardHeader",
                  addonBefore: {
                    $type: "Show",
                    children: {
                      $type: "Image",
                      alt: "",
                      objectFit: "cover",
                      rounded: "sm",
                      size: "xl",
                      src: {
                        $type: "Value",
                        path: "image_url",
                      },
                    },
                    when: {
                      "!!": {
                        $type: "Value",
                        path: "image_url",
                      },
                    },
                  },
                  children: {
                    $type: "CardLink",
                    children: {
                      $type: "Value",
                      path: "title",
                    },
                    href: {
                      $type: "Value",
                      path: "cmp_url",
                    },
                  },
                  description: {
                    $type: "Group",
                    children: [
                      {
                        $type: "Group",
                        children: [
                          {
                            $type: "Show",
                            children: {
                              $type: "Text",
                              children: {
                                $type: "Value",
                                path: "reference",
                              },
                              whiteSpace: "nowrap",
                            },
                            when: {
                              "!!": {
                                $type: "Value",
                                path: "reference",
                              },
                            },
                          },
                          {
                            $type: "Show",
                            children: {
                              $type: "Group",
                              children: [
                                {
                                  $type: "IconCalendar",
                                  h: "auto",
                                  w: "16",
                                },
                                {
                                  $type: "Time",
                                  date: {
                                    $type: "Value",
                                    path: "due_date",
                                  },
                                  whiteSpace: "nowrap",
                                },
                              ],
                              gap: "2",
                            },
                            when: {
                              "!!": {
                                $type: "Value",
                                path: "due_date",
                              },
                            },
                          },
                          {
                            $type: "Show",
                            children: {
                              $type: "Group",
                              children: [
                                {
                                  $type: "Avatar",
                                  colorScheme: "purple",
                                  name: {
                                    $type: "Value",
                                    path: "owner",
                                  },
                                  size: "2xs",
                                },
                                {
                                  $type: "Text",
                                  children: {
                                    $type: "Value",
                                    path: "owner",
                                  },
                                  lineClamp: "1",
                                },
                              ],
                              gap: "2",
                            },
                            when: {
                              "!!": {
                                $type: "Value",
                                path: "owner",
                              },
                            },
                          },
                        ],
                        flexDirection: "row",
                        gap: "12",
                      },
                      {
                        $type: "Show",
                        children: {
                          $type: "Badge",
                          children: {
                            $type: "Value",
                            path: "status",
                          },
                          intent: "danger",
                        },
                        when: {
                          "==": [{ $type: "Value", path: "status" }, "Overdue"],
                        },
                      },
                      {
                        $type: "Show",
                        children: {
                          $type: "Badge",
                          children: {
                            $type: "Value",
                            path: "status",
                          },
                          intent: "success",
                        },
                        when: {
                          "==": [
                            { $type: "Value", path: "status" },
                            "Completed",
                          ],
                        },
                      },
                      {
                        $type: "Show",
                        children: {
                          $type: "Badge",
                          children: {
                            $type: "Value",
                            path: "status",
                          },
                          intent: "information",
                        },
                        when: {
                          "==": [
                            { $type: "Value", path: "status" },
                            "In Progress",
                          ],
                        },
                      },
                      {
                        $type: "Show",
                        children: {
                          $type: "Badge",
                          children: {
                            $type: "Value",
                            path: "status",
                          },
                        },
                        when: [
                          {
                            "!!": {
                              $type: "Value",
                              path: "status",
                            },
                          },
                          {
                            "!=": [
                              { $type: "Value", path: "status" },
                              "Overdue",
                            ],
                          },
                          {
                            "!=": [
                              { $type: "Value", path: "status" },
                              "Completed",
                            ],
                          },
                          {
                            "!=": [
                              { $type: "Value", path: "status" },
                              "In Progress",
                            ],
                          },
                        ],
                      },
                    ],
                    flexDirection: "row",
                    fontSize: "sm",
                    justifyContent: "space-between",
                    mt: "8",
                  },
                  lineClamp: "2",
                },
                p: "12",
              },
            ],
            path: "/table_data",
            separator: {
              $type: "Separator",
              borderColor: "border.tertiary",
            },
          },
          flexDirection: "column",
          maxH: "sm",
          overflow: "auto",
          rounded: "md",
        },
      ],
      title: [
        {
          $type: "Value",
          path: "/total_results",
        },
        " results found",
      ],
    },
  },
};

export const WithBridge: Story = {
  args: {
    data: {
      state: "init",
    },
    element: {
      $type: "Document",
      appName: "MCP App (OpenAI Shim)",
      body: [
        {
          $type: "Text",
          children: "Embedded MCP app widget with OpenAI shim:",
        },
        {
          $type: "Bridge",
          height: 200,
          resource: "ui://openai-widget",
        },
      ],
      title: "Bridge Component (OpenAI Profile)",
    },
  },
  render: function Render(args) {
    const [resource, setResource] = useState<{
      data: undefined | { mimeType: string; text: string };
      isError: boolean;
    }>({
      data: undefined,
      isError: false,
    });

    useEffect(() => {
      setTimeout(() => {
        setResource({
          data: {
            mimeType: "text/html+skybridge",
            text: `
              <!DOCTYPE html>
              <html>
                <head>
                  <style>
                    body {
                      font-family: system-ui, sans-serif;
                      margin: 0;
                      padding: 16px;
                    }
                    h1 {
                      font-size: 18px;
                      color: #1a1a1a;
                    }
                    p {
                      color: #666;
                    }
                    button {
                      padding: 8px 16px;
                      background: #0037ff;
                      color: white;
                      border: none;
                      border-radius: 6px;
                      cursor: pointer;
                      margin-right: 8px;
                    }
                    button:hover {
                      background: #0029cc;
                    }
                  </style>
                </head>
                <body>
                  <h1>MCP App Bridge Widget (OpenAI)</h1>
                  <p>
                    This widget uses the OpenAI shim. Click to trigger actions
                    visible in the Storybook Actions panel.
                  </p>
                  <button id="btn-tool">Call Tool</button>
                  <button id="btn-msg">Send Message</button>
                  <p id="output"></p>
                  <script>
                    document.getElementById('btn-tool').addEventListener('click', async function() {
                      if (window.openai && window.openai.callTool) {
                        const response = window.openai.callTool('refresh_data', { range: 'Q1' });
                        document.getElementById('output').textContent = 'callTool response: ' + JSON.stringify(await response);
                      }
                    });
                    document.getElementById('btn-msg').addEventListener('click', function() {
                      if (window.openai && window.openai.sendFollowUpMessage) {
                        window.openai.sendFollowUpMessage({ prompt: 'Hello from the widget' });
                      }
                    });
                    const listener = (event) => {
                      const toolOutput = event.detail.globals.toolOutput;
                      if (toolOutput) {
                        document.getElementById('output').textContent = 'toolOutput: ' + JSON.stringify(toolOutput);
                      }
                      window.removeEventListener('openai:set_globals', listener)
                    };
                    window.addEventListener('openai:set_globals', listener);
                  </script>
                </body>
              </html>
            `,
          },
          isError: false,
        });
      }, 1000);
    }, []);

    return (
      <ProteusDocumentRenderer
        {...args}
        onInteraction={(name, params) => {
          action("onInteraction")(name, params);
          return { state: "next" };
        }}
        onMessage={(message) => {
          action("onMessage")(message);
        }}
        useResource={() => resource}
      />
    );
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
    strict: false,
  },
};

/**
 * Reproduces Opal's `ask_agent_input` action card with a `file` parameter.
 * The host's `onUpload` callback is mocked: it accepts any File, simulates a
 * 1.5s upload, and returns a fake signed URL. The form data carries a single
 * URL string per file param. On submit, the `onMessage` action log shows the
 * structured payload `{ parts, files }`.
 */
export const AskAgentInputWithFileParam: Story = {
  render: function AskAgentInputWithFileParamRender(args) {
    const [data, setData] = useState(args.data);
    return (
      <ProteusDocumentRenderer
        {...args}
        data={data}
        onDataChange={setData}
      />
    );
  },
  args: {
    data: {
      agent: {
        description: "Summarizes uploaded source documents.",
        name: "Doc Summarizer",
      },
      parameters: [
        {
          description: "What to call the run",
          name: "Run Name",
          required: true,
          type: "string",
        },
        {
          description: "PDF or text file to summarize",
          name: "Source Document",
          required: true,
          type: "file",
        },
      ],
    },
    element: {
      $type: "Document",
      actions: [
        {
          $type: "Action",
          appearance: "subtle",
          children: "Cancel",
          onClick: { message: "[User declined to run the agent]" },
        },
        {
          $type: "Action",
          appearance: "primary-opal",
          children: "Run agent",
          onClick: {
            message: {
              files: {
                $type: "Map",
                children: {
                  $type: "Show",
                  children: { $type: "Value", path: "value" },
                  when: {
                    and: [
                      { "==": [{ $type: "Value", path: "type" }, "file"] },
                      { "!!": { $type: "Value", path: "value" } },
                    ],
                  },
                },
                path: "/parameters",
              },
              parts: [
                {
                  content: {
                    $type: "Map",
                    children: {
                      $type: "Show",
                      children: {
                        $type: "Concat",
                        children: [
                          { $type: "Value", path: "name" },
                          ": ",
                          {
                            $type: "Show",
                            children: "[Not specified]",
                            when: { "!": { $type: "Value", path: "value" } },
                          },
                          {
                            $type: "Show",
                            children: { $type: "Value", path: "value" },
                            when: { "!!": { $type: "Value", path: "value" } },
                          },
                        ],
                      },
                      when: { "!=": [{ $type: "Value", path: "type" }, "file"] },
                    },
                    path: "/parameters",
                    separator: "\n",
                  },
                  type: "text",
                },
              ],
            },
          },
          type: "submit",
        },
      ],
      appName: "Opal",
      body: {
        $type: "Group",
        children: {
          $type: "Map",
          children: [
            {
              $type: "Show",
              children: {
                $type: "Field",
                children: {
                  $type: "Input",
                  name: "value",
                  placeholder: { $type: "Value", path: "placeholder" },
                  required: { $type: "Value", path: "required" },
                },
                description: { $type: "Value", path: "description" },
                label: { $type: "Value", path: "name" },
                required: { $type: "Value", path: "required" },
              },
              when: { "==": [{ $type: "Value", path: "type" }, "string"] },
            },
            {
              $type: "Show",
              children: {
                $type: "Field",
                children: {
                  $type: "FileUpload",
                  accept: ["application/pdf", "text/*"],
                  name: "value",
                  required: { $type: "Value", path: "required" },
                },
                description: { $type: "Value", path: "description" },
                label: { $type: "Value", path: "name" },
                required: { $type: "Value", path: "required" },
              },
              when: { "==": [{ $type: "Value", path: "type" }, "file"] },
            },
          ],
          path: "/parameters",
        },
        flexDirection: "column",
        gap: "24",
      },
      subtitle: { $type: "Value", path: "/agent/description" },
      title: { $type: "Value", path: "/agent/name" },
    },
    onUpload: async (file) => {
      action("onUpload (mocked)")(file);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const fileId = Math.random().toString(36).slice(2, 10);
      return `https://opal-localdev.optimizely.com/file-server/files/${fileId}/${encodeURIComponent(
        file.name,
      )}?signed=mock`;
    },
  },
};
