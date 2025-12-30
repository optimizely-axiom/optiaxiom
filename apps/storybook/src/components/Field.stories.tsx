import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Box,
  Button,
  Field,
  Group,
  Input,
  Text,
  Textarea,
} from "@optiaxiom/react";
import { SurfaceProvider } from "@optiaxiom/react/unstable";
import { IconCalendar } from "@tabler/icons-react";
import { useState } from "react";
import { action } from "storybook/actions";

export default {
  args: {
    children: "input",
    label: "Label",
  },
  argTypes: {
    children: {
      control: { type: "select" },
      mapping: {
        input: <Input placeholder="Enter text..." w="224" />,
        textarea: <Textarea placeholder="Enter text..." w="224" />,
      },
      options: ["input", "textarea"],
    },
  },
  component: Field,
} as Meta<typeof Field>;

type Story = StoryObj<typeof Field>;

export const Basic: Story = {};

export const sizes: Story = {
  render: () => (
    <Group flexDirection="column" gap="16">
      <Field label="Label">
        <Input placeholder="Enter text..." w="224" />
      </Field>
      <Field label="Label">
        <Input placeholder="Enter text..." size="lg" w="224" />
      </Field>
    </Group>
  ),
};

export const Required: Story = {
  args: {
    children: (
      <Input
        addonBefore={<IconCalendar size="20" />}
        placeholder="Enter date..."
        w="224"
      />
    ),
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    children: <Input disabled placeholder="Enter text..." w="224" />,
  },
};

export const Description: Story = {
  args: {
    description: "Form note",
  },
};

export const Error: Story = {
  args: {
    error: "Required field",
  },
};

export const ErrorNoMessage: Story = {
  args: {
    error: true,
  },
};

export const DescriptionAndError: Story = {
  args: {
    ...Description.args,
    ...Error.args,
  },
};

export const Info: Story = {
  args: {
    info: "This is an important input",
  },
  decorators: (Story) => (
    <Box bg="bg.page" p="12">
      <Story />
    </Box>
  ),
};

export const RequiredAndInfo: Story = {
  args: {
    ...Info.args,
    ...Required.args,
  },
};

export const WithTextarea: Story = {
  args: {
    children: "textarea",
    info: "This is an important textarea",
    label: "Label",
    required: true,
  },
};

export const WithMessageSuggestion: Story = {
  render: function WithMessageSuggestion() {
    const [value, setValue] = useState("");
    const defaultSuggestions = [
      {
        createdAt: new Date().toISOString(),
        id: "sug-1",
        surface: "product<storybook>/page<demo>/resource<form>/property<email>",
        text: "We recommend using your work email for better integration with your organization.",
        tool: {
          name: "useWorkEmail",
          parameters: { emailType: "work" },
        },
        type: "message" as const,
      },
    ];
    const [suggestions, setSuggestions] = useState(defaultSuggestions);

    return (
      <SurfaceProvider
        accept={(suggestionId: string) => {
          action("accept")(suggestionId);
          setSuggestions((prev) => prev.filter((s) => s.id !== suggestionId));
        }}
        executeTool={action("execute")}
        metadata={{}}
        name="email"
        pageViewId=""
        path="product<storybook>/page<demo>/resource<form>/property<email>"
        reject={(suggestionId: string) => {
          action("reject")(suggestionId);
          setSuggestions((prev) => prev.filter((s) => s.id !== suggestionId));
        }}
        suggestionPopover={{ register: () => () => {}, registered: false }}
        suggestions={suggestions}
        track={action("track")}
        type="property"
      >
        <Group alignItems="start" flexDirection="column" gap="16">
          <Field label="Email">
            <Input
              onValueChange={setValue}
              placeholder="Enter email"
              value={value}
            />
          </Field>

          <Group gap="8">
            <Text fontSize="sm">Value: {value || "(empty)"}</Text>
            <Text fontSize="sm">Suggestions: {suggestions.length}</Text>
          </Group>

          <Button
            disabled={suggestions.length > 0}
            onClick={() => setSuggestions(defaultSuggestions)}
            size="sm"
          >
            Reset Suggestion
          </Button>
        </Group>
      </SurfaceProvider>
    );
  },
};
