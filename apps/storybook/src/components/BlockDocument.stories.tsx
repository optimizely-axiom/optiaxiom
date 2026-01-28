/* eslint-disable no-console, @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "@storybook/react-vite";

import { BlockDocumentRenderer } from "@optiaxiom/react/unstable";

export default {
  component: BlockDocumentRenderer,
  parameters: {
    layout: "padded",
  },
} as Meta<typeof BlockDocumentRenderer>;

type Story = StoryObj<typeof BlockDocumentRenderer>;

export const Basic: Story = {
  args: {
    element: {
      $type: "Block.Document",
      children: [
        {
          $type: "Block.Heading",
          children: "Welcome to Block Documents",
          level: 2,
        },
        {
          $type: "Block.Text",
          children:
            "This is a basic Block Document that demonstrates rendering elements from JSON.",
        },
      ],
      version: "1.0",
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
          name: "submit",
        },
      ],
      children: [
        {
          $type: "Block.Heading",
          children: "Create Test Plan",
          level: 2,
        },
        {
          $type: "Block.Field",
          children: {
            $type: "Block.Input",
            name: "url",
            placeholder: "https://example.com",
          },
          label: "URL",
          required: true,
        },
        {
          $type: "Block.Field",
          children: {
            $type: "Block.Textarea",
            name: "test_idea",
            placeholder: "Enter test description...",
            rows: 4,
          },
          description: "Describe what you want to test",
          label: "Test Idea",
        },
      ],
      version: "1.0",
    },
    onAction: (name: string) => console.log("Action:", name),
    onDataChange: (data: Record<string, any>) =>
      console.log("Form data:", data),
  },
};

export const WithGroups: Story = {
  args: {
    element: {
      $type: "Block.Document",
      children: [
        {
          $type: "Block.Heading",
          children: "Layout with Groups",
          level: 2,
        },
        {
          $type: "Block.Group",
          children: [
            {
              $type: "Block.Text",
              children: "This is a vertical group with medium spacing",
              color: "secondary",
            },
            {
              $type: "Block.Text",
              children: "Items stack vertically",
            },
          ],
          flexDirection: "vertical",
          gap: "md",
        },
        {
          $type: "Block.Group",
          children: [
            {
              $type: "Block.Text",
              children: "Horizontal",
            },
            {
              $type: "Block.Text",
              children: "layout",
              color: "tertiary",
            },
            {
              $type: "Block.Text",
              children: "with small gap",
            },
          ],
          flexDirection: "horizontal",
          gap: "sm",
        },
      ],
      version: "1.0",
    },
  },
};

export const WithAllActions: Story = {
  args: {
    element: {
      $type: "Block.Document",
      actions: [
        {
          $type: "Block.Action",
          children: "Approve",
          name: "approve",
        },
        {
          $type: "Block.CancelAction",
          children: "Reject",
        },
      ],
      children: [
        {
          $type: "Block.Heading",
          children: "Approve Changes",
          level: 2,
        },
        {
          $type: "Block.Text",
          children: "Would you like to approve the proposed changes?",
        },
      ],
      version: "1.0",
    },
    onAction: (name: string) => console.log("Action:", name),
    onCancelAction: (text: string) => console.log("Cancel with text:", text),
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
          name: "submit",
        },
      ],
      children: [
        {
          $type: "Block.Heading",
          children: "Readonly Document",
          level: 2,
        },
        {
          $type: "Block.Field",
          children: {
            $type: "Block.Input",
            name: "name",
            value: "John Doe",
          },
          label: "Name",
        },
        {
          $type: "Block.Field",
          children: {
            $type: "Block.Textarea",
            name: "message",
            value: "This form is readonly",
          },
          label: "Message",
        },
      ],
      version: "1.0",
    },
    readonly: true,
  },
};

export const ComplexForm: Story = {
  args: {
    element: {
      $type: "Block.Document",
      actions: [
        {
          $type: "Block.Action",
          appearance: "primary-opal",
          children: "Create Test Plan",
          name: "create",
        },
        {
          $type: "Block.Action",
          appearance: "default-opal",
          children: "Save as Draft",
          name: "save_draft",
        },
      ],
      children: [
        {
          $type: "Block.Heading",
          children: "Test Plan Creation",
          level: 1,
        },
        {
          $type: "Block.Group",
          children: [
            {
              $type: "Block.Heading",
              children: "Basic Information",
              level: 2,
            },
            {
              $type: "Block.Field",
              children: {
                $type: "Block.Input",
                name: "url",
                placeholder: "https://example.com",
              },
              description: "The URL of the page to test",
              label: "Test URL",
              required: true,
            },
            {
              $type: "Block.Field",
              children: {
                $type: "Block.Textarea",
                name: "description",
                placeholder: "Enter test description...",
                rows: 3,
              },
              info: "Describe what functionality you want to test",
              label: "Test Description",
            },
            {
              $type: "Block.Heading",
              children: "Additional Details",
              level: 2,
            },
            {
              $type: "Block.Field",
              children: {
                $type: "Block.Textarea",
                name: "expected",
                placeholder: "What should happen?",
                rows: 2,
              },
              label: "Expected Behavior",
            },
          ],
          flexDirection: "vertical",
          gap: "lg",
        },
      ],
      version: "1.0",
    },
    onAction: (name: string) => console.log("Action:", name),
    onDataChange: (data: Record<string, any>) =>
      console.log("Form data:", data),
  },
};

export const InvalidDocumentFallback: Story = {
  args: {
    element: {
      $type: "Block.Document",
      actions: [
        {
          $type: "Block.InvalidAction",
          name: "invalid",
        } as any,
      ],
      children: [
        {
          $type: "Block.InvalidElement",
          content: "This is an invalid element type",
        } as any,
      ],
      version: "1.0",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "When a document fails validation, a fallback display shows the raw JSON data. This ensures graceful degradation when receiving malformed data.",
      },
    },
  },
};

export const PartialRenderingWithErrors: Story = {
  args: {
    element: {
      $type: "Block.Document",
      actions: [
        {
          $type: "Block.Action",
          appearance: "primary-opal",
          children: "Valid Submit",
          name: "submit",
        },
        {
          $type: "Block.InvalidAction",
          children: "This action should be skipped",
          name: "invalid",
        } as any,
        {
          $type: "Block.Action",
          appearance: "default-opal",
          children: "Valid Cancel",
          name: "cancel",
        },
      ],
      children: [
        {
          $type: "Block.Heading",
          children: "Partial Rendering Demo",
          level: 2,
        },
        {
          $type: "Block.Text",
          children:
            "This document contains both valid and invalid elements. Valid elements render, invalid ones are skipped.",
        },
        {
          $type: "Block.InvalidElement",
          content: "This invalid element should be skipped",
        } as any,
        {
          $type: "Block.Field",
          children: {
            $type: "Block.Input",
            name: "valid_field",
            placeholder: "This is a valid input",
          },
          label: "Valid Field",
        },
        {
          $type: "Block.Text",
          // Missing children property - invalid
        } as any,
        {
          $type: "Block.Group",
          children: [
            {
              $type: "Block.Text",
              children: "Valid text in a group",
            },
            {
              $type: "Block.UnknownType",
              data: "This should be skipped",
            } as any,
            {
              $type: "Block.Text",
              children: "Another valid text",
            },
          ],
          flexDirection: "vertical",
          gap: "md",
        },
        {
          $type: "Block.Text",
          children: "Check the console for validation errors",
          color: "secondary",
        },
      ],
      version: "1.0",
    },
    onAction: (name: string) => console.log("Action:", name),
    onDataChange: (data: Record<string, unknown>) =>
      console.log("Form data:", data),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates partial rendering with graceful degradation. Invalid elements are skipped and logged to the console, while valid elements render normally. This allows documents with validation errors to still be partially usable.",
      },
    },
  },
};
