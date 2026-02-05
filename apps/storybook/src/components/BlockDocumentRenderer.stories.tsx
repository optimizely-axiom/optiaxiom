import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box } from "@optiaxiom/react";
import { BlockDocumentRenderer } from "@optiaxiom/react/unstable";
import { useState } from "react";
import { action } from "storybook/internal/actions";

export default {
  args: {
    onCancelAction: action("onCancelAction"),
    onToolCall: action("onToolCall"),
  },
  component: BlockDocumentRenderer,
  decorators: (Story) => (
    <Box maxW="lg">
      <Story />
    </Box>
  ),
  parameters: {
    layout: "padded",
  },
} as Meta<typeof BlockDocumentRenderer>;

type Story = StoryObj<typeof BlockDocumentRenderer>;

export const Basic: Story = {
  args: {
    element: {
      $type: "Block.Document",
      appName: "Opal",
      body: [
        {
          $type: "Block.Text",
          children:
            "This is a basic Block Document that demonstrates rendering elements from JSON.",
        },
      ],
      subtitle: "Secondary title",
      title: "Welcome to Block Documents",
    },
  },
};

export const FormWithInputs: Story = {
  args: {
    element: {
      $type: "Block.Document",
      actions: [
        {
          $type: "Block.Action",
          appearance: "primary-opal",
          children: "Create Test Plan",
        },
      ],
      appName: "Opal",
      body: [
        {
          $type: "Block.Group",
          children: [
            {
              $type: "Block.Heading",
              children: "1. Where should this test run?",
              fontSize: "md",
              fontWeight: "600",
              level: "2",
            },
            {
              $type: "Block.Text",
              children:
                "Select how you'd like to define the page or experience.",
              color: "fg.secondary",
              fontSize: "md",
            },
            {
              $type: "Block.Field",
              children: {
                $type: "Block.Select",
                children: [
                  {
                    $type: "Block.SelectTrigger",
                    w: "full",
                  },
                  {
                    $type: "Block.SelectContent",
                  },
                ],
                name: "target_by",
                options: [
                  {
                    execute: {
                      action: "setVisibility",
                      params: { page: false, url: true },
                    },
                    label: "URL",
                    value: "url",
                  },
                  {
                    execute: {
                      action: "setVisibility",
                      params: { page: true, url: false },
                    },
                    label: "Saved Pages",
                    value: "page",
                  },
                ],
              },
              label: "Target by",
            },
            {
              $id: "url",
              $type: "Block.Field",
              children: {
                $type: "Block.Input",
                name: "url",
                onValueChange: {
                  action: "setVisibility",
                  params: { question_2: true },
                },
                placeholder: "Add a URL",
              },
              label: "URL",
            },
            {
              $id: "page",
              $type: "Block.Field",
              $visible: false,
              children: {
                $type: "Block.Select",
                children: [
                  {
                    $type: "Block.SelectTrigger",
                    w: "full",
                  },
                  {
                    $type: "Block.SelectContent",
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
          ],
          flexDirection: "column",
          gap: "16",
        },
        {
          $id: "question_2",
          $type: "Block.Group",
          $visible: false,
          children: [
            {
              $type: "Block.Heading",
              children: "2. What would you like to test?",
              fontSize: "md",
              fontWeight: "600",
              level: "2",
            },
            {
              $type: "Block.Text",
              children:
                "Describe what you'd like to test. If you're not sure, try getting test ideas first.",
              color: "fg.secondary",
              fontSize: "md",
            },
            {
              $id: "url",
              $type: "Block.Field",
              children: {
                $type: "Block.Textarea",
                name: "test_idea",
                placeholder:
                  "e.g., Add quantity badges to product thumbnails to show how many of each item they’re buying, improving clarity, confidence, and potentially conversion",
              },
              label: "Test Idea",
            },
          ],
          flexDirection: "column",
          gap: "16",
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
      <BlockDocumentRenderer {...args} data={data} onDataChange={setData} />
    );
  },
};

export const WithAllActions: Story = {
  args: {
    element: {
      $type: "Block.Document",
      actions: [
        {
          $type: "Block.Action",
          appearance: "primary",
          children: "Approve",
        },
        {
          $type: "Block.CancelAction",
          children: "Reject",
        },
      ],
      appName: "Opal",
      body: [
        {
          $type: "Block.Text",
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
      $type: "Block.Document",
      actions: [
        {
          $type: "Block.Action",
          appearance: "primary",
          children: "Submit",
        },
      ],
      appName: "Opal",
      body: [
        {
          $type: "Block.Field",
          children: {
            $type: "Block.Input",
            name: "name",
          },
          label: "Name",
        },
        {
          $type: "Block.Field",
          children: {
            $type: "Block.Textarea",
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
      $type: "Block.Document",
      actions: [
        {
          $type: "Block.Action",
          children: "Submit",
        },
      ],
      appName: "Opal",
      body: [
        {
          $type: "Block.InvalidElement",
          content: "This is an invalid element type",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      ],
      title: "Invalid Document Example",
    },
  },
};
