import type { Meta, StoryObj } from "@storybook/react-vite";

import { Kbd, type MenuOption, toaster } from "@optiaxiom/react";
import {
  Spotlight,
  SpotlightContent,
  SpotlightTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

export default {
  args: {
    defaultOpen: true,
  },
  component: Spotlight,
} as Meta<typeof Spotlight>;

type Story = StoryObj<typeof Spotlight>;

const categories = {
  Layout: {
    label: "Layout",
  },
  Sizing: {
    label: "Sizing",
  },
  Typography: {
    label: "Typography",
  },
} satisfies Record<string, MenuOption["group"]>;

const pages = [
  {
    category: categories.Layout,
    description: "Set the element's `gap` CSS property",
    tag: "Numbers",
    title: "Gap",
  },
  {
    category: categories.Layout,
    description: "Set the element's margin on all sides",
    tag: "Numbers",
    title: "Margin",
  },
  {
    category: categories.Typography,
    description: "Set the element's font family to control the visual appearance and readability of text content. Font families define the overall style and character of typography, allowing designers to establish visual hierarchy, improve readability, and create brand consistency across interfaces. Common font family categories include serif fonts for formal content, sans-serif fonts for modern interfaces, monospace fonts for code and technical content, and display fonts for headings and decorative text. The choice of font family significantly impacts user experience, accessibility, and the overall aesthetic appeal of digital products.",
    tag: "Names",
    title: "Font Family",
  },
  {
    category: categories.Typography,
    description:
      "Set the element's `font-size` and `line-height` CSS properties",
    tag: "Numbers",
    title: "Font Size",
  },
  {
    category: categories.Typography,
    description: "Set the element's text color",
    tag: "Colors",
    title: "Text Color",
  },
  {
    category: categories.Sizing,
    description: "Set the element's height",
    tag: "Numbers",
    title: "Height",
  },
  {
    category: categories.Sizing,
    description: "Set the element's width",
    tag: "Numbers",
    title: "Width",
  },
];

export const Basic: Story = {
  render: function Basic(args) {
    const [items, setItems] = useState(pages);
    const [inputValue, setInputValueState] = useState("");

    const setInputValue = (inputValue: string) => {
      setInputValueState(inputValue);
      setItems(
        pages.filter(
          (page) =>
            !inputValue ||
            (page.description + "\n" + page.title)
              .toLowerCase()
              .includes(inputValue.toLowerCase()),
        ),
      );
    };

    return (
      <Spotlight
        {...args}
        empty={`No results for "${inputValue}"`}
        inputValue={inputValue}
        onInputValueChange={setInputValue}
        options={[
          ...items.map<MenuOption>((item) => ({
            description: item.description,
            execute: () => {
              toaster.create(`Selected "${item.title}"`, { intent: "success" });
            },
            group: item.category,
            label: item.title,
          })),
        ]}
      >
        <SpotlightTrigger
          addonAfter={
            <Kbd ml="auto" modifiers="mod" variant="subtle">
              K
            </Kbd>
          }
          w="224"
        >
          Quick search...
        </SpotlightTrigger>
        <SpotlightContent />
      </Spotlight>
    );
  },
};
