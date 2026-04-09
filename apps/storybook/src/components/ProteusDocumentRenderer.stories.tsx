import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";
import { useState } from "react";
import { action } from "storybook/actions";

const sampleHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 16px; }
    h1 { font-size: 18px; color: #1a1a1a; }
    p { color: #666; }
    button { padding: 8px 16px; background: #0037FF; color: white; border: none; border-radius: 6px; cursor: pointer; }
    button:hover { background: #0029cc; }
  </style>
</head>
<body>
  <h1>MCP App Bridge Widget</h1>
  <p>This is an interactive UI rendered inside a sandboxed iframe via the Bridge component.</p>
  <button onclick="document.getElementById('output').textContent = 'Button clicked at ' + new Date().toLocaleTimeString()">Click me</button>
  <p id="output"></p>
</body>
</html>
`;

const mockResources: Record<string, { html: string; mimeType: string }> = {
  "ui://sample-widget": { html: sampleHtml, mimeType: "text/html" },
};

const useResource = (resource: string) => ({
  data: mockResources[resource] ?? { html: "", mimeType: "text/html" },
  isLoading: false,
});

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
          maxH: "xs",
          objectFit: "cover",
          src: "https://placehold.co/1600x900",
        },
        {
          $type: "Image",
          alt: "A delicious, juicy pan-seared chicken breast dish with broccoli sides",
          maxH: "xs",
          objectFit: "cover",
          src: "https://placehold.co/900x1600",
        },
        {
          $type: "Image",
          alt: "A delicious, juicy pan-seared chicken breast dish with broccoli sides",
          maxH: "xs",
          objectFit: "cover",
          src: "https://placehold.co/400x600",
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
          src: "https://placehold.co/400x600",
        },
        {
          alt: "Chicken with lemon sauce and broccoli",
          src: "https://placehold.co/400x600",
        },
        {
          alt: "Sliced roasted chicken breast with broccoli",
          src: "https://placehold.co/400x600",
        },
        {
          alt: "Sesame chicken with broccoli",
          src: "https://placehold.co/400x600",
        },
      ],
    },
    element: {
      $type: "Document",
      actions: [
        {
          $type: "Action",
          appearance: "primary",
          children: "Download All",
          onClick: {
            action: "download",
            url: {
              $type: "Map",
              children: { $type: "Value", path: "src" },
              path: "/images",
            },
          },
        },
      ],
      appName: "Opal",
      body: [
        {
          $type: "Group",
          children: {
            $type: "Map",
            children: {
              $type: "Group",
              children: {
                $type: "Image",
                alt: { $type: "Value", path: "alt" },
                objectFit: "cover",
                overflow: "hidden",
                rounded: "md",
                src: { $type: "Value", path: "src" },
              },
              flexDirection: "column",
              maxH: "full",
            },
            path: "/images",
          },
          display: "grid",
          gap: "12",
          gridAutoRows: "fr",
          gridTemplateColumns: "2",
          maxH: "md",
        },
      ],
      subtitle: "4 variations generated",
      title: "Generated Images",
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
          appearance: "primary",
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
      body: [
        {
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
      ],
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
      dimensionHeaders: [
        {
          name: "sessionSource",
        },
      ],
      kind: "analyticsData#runReport",
      metadata: {
        currencyCode: "USD",
        timeZone: "America/New_York",
      },
      metricHeaders: [
        {
          name: "sessions",
          type: "TYPE_INTEGER",
        },
        {
          name: "activeUsers",
          type: "TYPE_INTEGER",
        },
      ],
      rowCount: 1001,
      rows: [
        {
          dimensionValues: [{ value: "(direct)" }],
          metricValues: [{ value: "206188" }, { value: "202176" }],
        },
        {
          dimensionValues: [{ value: "google" }],
          metricValues: [{ value: "34845" }, { value: "18965" }],
        },
        {
          dimensionValues: [{ value: "(not set)" }],
          metricValues: [{ value: "18657" }, { value: "13535" }],
        },
        {
          dimensionValues: [{ value: "bing" }],
          metricValues: [{ value: "2734" }, { value: "1414" }],
        },
        {
          dimensionValues: [{ value: "marketo-hostedevent" }],
          metricValues: [{ value: "2608" }, { value: "1576" }],
        },
        {
          dimensionValues: [{ value: "optimizely.zoom.us" }],
          metricValues: [{ value: "1778" }, { value: "562" }],
        },
        {
          dimensionValues: [{ value: "marketo" }],
          metricValues: [{ value: "941" }, { value: "618" }],
        },
        {
          dimensionValues: [{ value: "chatgpt.com" }],
          metricValues: [{ value: "689" }, { value: "337" }],
        },
        {
          dimensionValues: [{ value: "marketo-hostedwebinar" }],
          metricValues: [{ value: "646" }, { value: "476" }],
        },
        {
          dimensionValues: [{ value: "linkedin" }],
          metricValues: [{ value: "638" }, { value: "531" }],
        },
      ],
    },
    element: {
      $type: "Document",
      appName: "Opal",
      body: [
        {
          $type: "Chart",
          data: { $type: "Value", path: "/rows" },
          series: [
            {
              dataKey: "metricValues/0/value",
              name: "Sessions",
            },
            {
              dataKey: "metricValues/1/value",
              name: "Active Users",
            },
          ],
          type: "bar",
          xAxisKey: "dimensionValues/0/value",
        },
        {
          $type: "DataTable",
          columns: [
            {
              accessorKey: "dimensionValues/0/value",
              header: "Session Source",
              size: 200,
            },
            {
              accessorKey: "metricValues/0/value",
              format: "Number",
              header: "Sessions",
              size: 100,
            },
            {
              accessorKey: "metricValues/1/value",
              format: "Number",
              header: "Active Users",
              size: 100,
            },
          ],
          data: { $type: "Value", path: "/rows" },
        },
      ],
      title: "Sessions by Source",
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
    element: {
      $type: "Document",
      appName: "MCP App",
      body: [
        {
          $type: "Text",
          children: "Embedded MCP app widget:",
        },
        {
          $type: "Bridge",
          height: 200,
          resource: "ui://sample-widget",
        },
      ],
      title: "Bridge Component",
    },
    useResource,
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
