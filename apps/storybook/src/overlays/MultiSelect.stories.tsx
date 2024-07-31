import type { Meta, StoryObj } from "@storybook/react";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@optiaxiom/react";
import { useState } from "react";

export default {
  component: MultiSelector,
} as Meta<typeof MultiSelector>;

type Story = StoryObj<typeof MultiSelector>;

const options = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
];

const MultiSelectTest = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <MultiSelector onValuesChange={setValue} values={value}>
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Select your framework" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {options.map((option, i) => (
            <MultiSelectorItem key={i} value={option.value}>
              {option.label}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};

export const Basic: Story = {
  render: MultiSelectTest,
};
