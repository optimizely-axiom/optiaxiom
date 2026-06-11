import type { Meta, StoryObj } from "@storybook/react-vite";

import { Group, RichTextEditor, Text } from "@optiaxiom/react";
import { useState } from "react";

export default {
  args: {
    placeholder: "Write something...",
  },
  component: RichTextEditor,
} as Meta<typeof RichTextEditor>;

type Story = StoryObj<typeof RichTextEditor>;

export const Basic: Story = {};

export const DefaultValue: Story = {
  args: {
    defaultValue:
      "<p>Some <strong>rich</strong> text with <em>formatting</em> and a <a href='https://example.com'>link</a>.</p>",
  },
};

export const Controlled: Story = {
  render: function Controlled(args) {
    const [value, setValue] = useState(
      "<p>Edit this text and watch the HTML update below.</p>",
    );
    return (
      <Group flexDirection="column" gap="16" maxW="lg">
        <RichTextEditor {...args} onValueChange={setValue} value={value} />
        <Text color="fg.secondary" fontSize="sm">
          HTML: <code>{value}</code>
        </Text>
      </Group>
    );
  },
};

export const Readonly: Story = {
  args: {
    defaultValue:
      "<p>This editor is read-only. The toolbar is hidden and you cannot edit the content.</p><ul><li>Bullet item one</li><li>Bullet item two</li></ul>",
    readOnly: true,
  },
};

export const FixedHeight: Story = {
  args: {
    defaultValue:
      "<p>This editor has a constrained height. The toolbar stays pinned at the top while the editable content scrolls inside.</p><p>Paragraph 2 — keep typing or scrolling to see the behavior.</p><p>Paragraph 3.</p><p>Paragraph 4.</p><p>Paragraph 5.</p><p>Paragraph 6.</p><p>Paragraph 7.</p><p>Paragraph 8.</p><p>Paragraph 9 — the last line.</p>",
    h: "224",
  },
};
