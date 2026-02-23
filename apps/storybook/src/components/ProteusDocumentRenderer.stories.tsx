import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box } from "@optiaxiom/react";
import { ProteusDocumentRenderer } from "@optiaxiom/react/unstable";
import { useState } from "react";
import { action } from "storybook/actions";

export default {
  args: {
    onCancelAction: action("onCancelAction"),
    onToolCall: action("onToolCall"),
  },
  component: ProteusDocumentRenderer,
  decorators: (Story) => (
    <Box maxW="lg">
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
    element: {
      $type: "Proteus.Document",
      appName: "Opal",
      body: [
        {
          $type: "Proteus.Text",
          children:
            "This is a basic Proteus Document that demonstrates rendering elements from JSON.",
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
      $type: "Proteus.Document",
      actions: [
        {
          $type: "Proteus.Action",
          appearance: "primary-opal",
          children: "Create Test Plan",
        },
      ],
      appName: "Opal",
      body: [
        {
          $type: "Proteus.Group",
          children: [
            {
              $type: "Proteus.Heading",
              children: "1. Where should this test run?",
              fontSize: "md",
              fontWeight: "600",
              level: "2",
            },
            {
              $type: "Proteus.Text",
              children:
                "Select how you'd like to define the page or experience.",
              color: "fg.secondary",
              fontSize: "md",
            },
            {
              $type: "Proteus.Field",
              children: {
                $type: "Proteus.Select",
                children: [
                  {
                    $type: "Proteus.SelectTrigger",
                    w: "full",
                  },
                  {
                    $type: "Proteus.SelectContent",
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
              $type: "Proteus.Show",
              children: {
                $type: "Proteus.Field",
                children: {
                  $type: "Proteus.Input",
                  name: "url",
                  placeholder: "Add a URL",
                },
                label: "URL",
              },
              when: {
                "==": [{ $type: "Proteus.Value", path: "/target_by" }, "url"],
              },
            },
            {
              $type: "Proteus.Show",
              children: {
                $type: "Proteus.Field",
                children: {
                  $type: "Proteus.Select",
                  children: [
                    {
                      $type: "Proteus.SelectTrigger",
                      w: "full",
                    },
                    {
                      $type: "Proteus.SelectContent",
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
                "==": [{ $type: "Proteus.Value", path: "/target_by" }, "page"],
              },
            },
          ],
          flexDirection: "column",
          gap: "16",
        },
        {
          $type: "Proteus.Show",
          children: {
            $type: "Proteus.Group",
            children: [
              {
                $type: "Proteus.Heading",
                children: "2. What would you like to test?",
                fontSize: "md",
                fontWeight: "600",
                level: "2",
              },
              {
                $type: "Proteus.Text",
                children:
                  "Describe what you'd like to test. If you're not sure, try getting test ideas first.",
                color: "fg.secondary",
                fontSize: "md",
              },
              {
                $type: "Proteus.Field",
                children: {
                  $type: "Proteus.Textarea",
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
                    "==": [
                      { $type: "Proteus.Value", path: "/target_by" },
                      "url",
                    ],
                  },
                  { "!!": { $type: "Proteus.Value", path: "/url" } },
                ],
              },
              {
                and: [
                  {
                    "==": [
                      { $type: "Proteus.Value", path: "/target_by" },
                      "page",
                    ],
                  },
                  { "!!": { $type: "Proteus.Value", path: "/saved_page" } },
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
    const [data, setData] = useState<Record<string, string>>({
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
      $type: "Proteus.Document",
      actions: [
        {
          $type: "Proteus.Action",
          appearance: "primary",
          children: "Download",
        },
      ],
      appName: "Opal",
      body: [
        {
          $type: "Proteus.Image",
          alt: "A delicious, juicy pan-seared chicken breast dish with broccoli sides",
          src: "https://placehold.co/600x400",
        },
        {
          $type: "Proteus.Group",
          border: "1",
          borderColor: "border.tertiary",
          children: [
            {
              $type: "Proteus.Group",
              children: [
                {
                  $type: "Proteus.Text",
                  children: "Alt Text",
                  fontSize: "md",
                  fontWeight: "500",
                },
                {
                  $type: "Proteus.Text",
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
    element: {
      $type: "Proteus.Document",
      actions: [
        {
          $type: "Proteus.Action",
          appearance: "primary",
          children: "Download",
        },
      ],
      appName: "Opal",
      body: [
        {
          $type: "Proteus.Group",
          children: [
            {
              $type: "Proteus.Image",
              alt: "Lime chicken thighs on a plate",
              src: "https://placehold.co/274x250",
            },
            {
              $type: "Proteus.Image",
              alt: "Chicken with lemon sauce and broccoli",
              src: "https://placehold.co/274x250",
            },
            {
              $type: "Proteus.Image",
              alt: "Sliced roasted chicken breast with broccoli",
              src: "https://placehold.co/274x250",
            },
            {
              $type: "Proteus.Image",
              alt: "Sesame chicken with broccoli",
              src: "https://placehold.co/274x250",
            },
          ],
          display: "grid",
          gap: "12",
          gridTemplateColumns: "2",
        },
        {
          $type: "Proteus.Group",
          border: "1",
          borderColor: "border.tertiary",
          children: [
            {
              $type: "Proteus.Group",
              children: [
                {
                  $type: "Proteus.Text",
                  children: "Alt Text",
                  fontSize: "md",
                  fontWeight: "500",
                },
                {
                  $type: "Proteus.Text",
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

export const WithAllActions: Story = {
  args: {
    element: {
      $type: "Proteus.Document",
      actions: [
        {
          $type: "Proteus.Action",
          appearance: "primary",
          children: "Approve",
        },
        {
          $type: "Proteus.CancelAction",
          children: "Reject",
        },
      ],
      appName: "Opal",
      body: [
        {
          $type: "Proteus.Text",
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
      $type: "Proteus.Document",
      actions: [
        {
          $type: "Proteus.Action",
          appearance: "primary",
          children: "Submit",
        },
      ],
      appName: "Opal",
      body: [
        {
          $type: "Proteus.Field",
          children: {
            $type: "Proteus.Input",
            name: "name",
          },
          label: "Name",
        },
        {
          $type: "Proteus.Field",
          children: {
            $type: "Proteus.Textarea",
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

export const PartialRendering: Story = {
  args: {
    element: {
      $type: "Proteus.Document",
      actions: [
        {
          $type: "Proteus.Action",
          children: "Submit",
        },
      ],
      appName: "Opal",
      body: [
        {
          $type: "Proteus.InvalidElement",
          content: "This is an invalid element type",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      ],
      title: "Invalid Document Example",
    },
  },
};
