import type { Meta, StoryObj } from "@storybook/react";

import { Combobox } from "@optiaxiom/react";
import { type ComponentPropsWithoutRef } from "react";

type Story = StoryObj<typeof Combobox>;

const withTemplate = (args: ComponentPropsWithoutRef<typeof Combobox>) => {
  return <Combobox {...args}></Combobox>;
};

export default {
  component: Combobox,
} as Meta<typeof Combobox>;

export const Basic: Story = {
  args: {
    defaultValue: "en",
    items: [
      { label: "English", value: "en" },
      { label: "French", value: "fr" },
      { label: "German", value: "de" },
      { label: "Spanish", value: "es" },
      { label: "Portuguese", value: "pt" },
      { label: "Russian", value: "ru" },
      { label: "Japanese", value: "ja" },
      { label: "Korean", value: "ko" },
      { label: "Chinese", value: "zh" },
    ],
  },
  render: withTemplate,
};
