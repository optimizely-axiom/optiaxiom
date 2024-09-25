import type { Meta, StoryObj } from "@storybook/react";

import { Field } from "@optiaxiom/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

export default {
  component: Select,
} as Meta<typeof Select>;

type Story = StoryObj<typeof Select>;

export const Basic: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder="Select an item" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="Excel">Excel</SelectItem>
        <SelectItem disabled value="PDF">
          PDF
        </SelectItem>
        <SelectItem value="Powerpoint">Powerpoint</SelectItem>
        <SelectItem value="Video">Video</SelectItem>
        <SelectItem value="Word">Word</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Controlled: Story = {
  render: function Basic(args) {
    const [value, setValue] = useState("Excel");

    return (
      <Select onValueChange={setValue} value={value} {...args}>
        <SelectTrigger>
          <SelectValue placeholder="Select an item" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Media</SelectLabel>
            <SelectItem value="Excel">Excel</SelectItem>
            <SelectItem disabled value="PDF">
              PDF
            </SelectItem>
            <SelectItem value="Powerpoint">Powerpoint</SelectItem>
            <SelectItem value="Video">Video</SelectItem>
            <SelectItem value="Word">Word</SelectItem>
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectLabel>Color</SelectLabel>
            <SelectItem value="Red">Red</SelectItem>
            <SelectItem value="Green">Green</SelectItem>
            <SelectItem value="Pink">Pink</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  },
};

export const disabled: Story = {
  ...Basic,
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <Field label="Favorite Application">
      <Select {...args}>
        <SelectTrigger>
          <SelectValue placeholder="Select an app" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Excel">Excel</SelectItem>
          <SelectItem disabled value="PDF">
            PDF
          </SelectItem>
          <SelectItem value="Powerpoint">Powerpoint</SelectItem>
          <SelectItem value="Video">Video</SelectItem>
          <SelectItem value="Word">Word</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  ),
};

export const ItemAlignedPosition: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder="Select an app" />
      </SelectTrigger>

      <SelectContent position="item-aligned">
        <SelectItem value="Excel">Excel</SelectItem>
        <SelectItem disabled value="PDF">
          PDF
        </SelectItem>
        <SelectItem value="Powerpoint">Powerpoint</SelectItem>
        <SelectItem value="Video">Video</SelectItem>
        <SelectItem value="Word">Word</SelectItem>
      </SelectContent>
    </Select>
  ),
};
