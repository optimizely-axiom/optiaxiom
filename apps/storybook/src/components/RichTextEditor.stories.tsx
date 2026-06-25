import type { Meta, StoryObj } from "@storybook/react-vite";

import { Group, Text } from "@optiaxiom/react";
import { RichTextEditor } from "@optiaxiom/react/editor";
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

export const RichContent: Story = {
  args: {
    defaultValue: [
      "<h1>Quarterly report</h1>",
      "<p>Revenue grew <strong>12%</strong> this quarter, driven by <em>strong</em> retention and a new <code>pricing</code> tier.</p>",
      "<h2>Highlights</h2>",
      "<ul><li>Net revenue retention up to <strong>118%</strong></li><li>Churn down to 2.1%</li><li><a href='https://example.com'>View the full dashboard</a></li></ul>",
      "<h2>Next steps</h2>",
      "<ol><li><p><strong>Finalize Q3 targets</strong></p><p>Lock the revenue and retention goals with finance before the board review.</p></li><li><p><strong>Ship the new onboarding flow</strong></p><p>Roll out to 10% of new signups, then expand once activation holds steady.</p></li></ol>",
      "<h2>Competitive ranking</h2>",
      "<table><thead><tr><th>Rank</th><th>Competitor</th><th>Total Brand Mentions</th></tr></thead><tbody><tr><td>1</td><td>salesforce.com</td><td>84</td></tr><tr><td>2</td><td>hubspot.com</td><td>61</td></tr><tr><td>3</td><td>servicenow.com</td><td>22</td></tr></tbody></table>",
      "<h2>Pull the numbers</h2>",
      "<pre><code>const res = await fetch('/api/metrics?quarter=Q2');\nconst { revenue, retention } = await res.json();</code></pre>",
      "<blockquote><p>Generated automatically from this quarter's metrics.</p></blockquote>",
    ].join(""),
  },
};
