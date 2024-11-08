import type { Meta, StoryObj } from "@storybook/react";

import { Box, Kbd, Link, Toast, toaster, ToastTitle } from "@optiaxiom/react";
import {
  Spotlight,
  SpotlightContent,
  SpotlightEmpty,
  SpotlightInput,
  SpotlightItem,
  SpotlightLabel,
  SpotlightList,
  SpotlightTrigger,
} from "@optiaxiom/react/unstable";
import { Fragment, useState } from "react";

export default {
  args: {
    defaultOpen: true,
  },
  component: Spotlight,
  parameters: {
    useOverlayDecorator: true,
  },
} as Meta<typeof Spotlight>;

type Story<T> = StoryObj<typeof Spotlight<T>>;

const pages = [
  {
    category: "Layout",
    description: "Set the element's `gap` CSS property",
    title: "Gap",
  },
  {
    category: "Layout",
    description: "Set the element's margin on all sides",
    title: "Margin",
  },
  {
    category: "Typography",
    description: "Set the element's font family",
    title: "Font Family",
  },
  {
    category: "Typography",
    description:
      "Set the element's `font-size` and `line-height` CSS properties",
    title: "Font Size",
  },
  {
    category: "Typography",
    description: "Set the element's text color",
    title: "Text Color",
  },
  {
    category: "Sizing",
    description: "Set the element's height",
    title: "Height",
  },
  {
    category: "Sizing",
    description: "Set the element's width",
    title: "Width",
  },
];

export const Basic: Story<(typeof pages)[number]> = {
  render: function Basic(args) {
    const [open, setOpen] = useState(args.defaultOpen);
    const [inputValue, setInputValueState] = useState("");
    const [items, setItems] = useState(pages);

    const setInputValue = (inputValue: string) => {
      setInputValueState(inputValue);
      setItems(
        pages.filter(
          (page) =>
            !inputValue ||
            page.description.toLowerCase().includes(inputValue.toLowerCase()) ||
            page.title.toLowerCase().includes(inputValue.toLowerCase()),
        ),
      );
    };

    const categories = new Set();
    const shouldShowCategory = (category: string) => {
      const flag = categories.has(category);
      categories.add(category);
      return !flag;
    };

    return (
      <Spotlight
        {...args}
        inputValue={inputValue}
        items={items}
        onInputValueChange={setInputValue}
        onItemSelect={(value) => {
          toaster.create(
            <Toast colorScheme="success">
              <ToastTitle>
                Selected <strong>{value.title}</strong>
              </ToastTitle>
            </Toast>,
          );
        }}
        onOpenChange={setOpen}
        open={open}
      >
        <SpotlightTrigger
          addonAfter={
            <Kbd keys="command" variant="subtle">
              K
            </Kbd>
          }
          w="240"
        >
          Quick search...
        </SpotlightTrigger>

        <SpotlightContent>
          <SpotlightInput placeholder="Search..." />

          <SpotlightList>
            {items.map((item) => (
              <Fragment key={item.title}>
                {shouldShowCategory(item.category) && (
                  <SpotlightLabel>{item.category}</SpotlightLabel>
                )}

                <SpotlightItem description={item.description} item={item}>
                  {item.title}
                </SpotlightItem>
              </Fragment>
            ))}
          </SpotlightList>

          <SpotlightEmpty>
            <Box>
              No results for &quot;
              <Box asChild color="fg.default">
                <span>{inputValue}</span>
              </Box>
              &quot;
            </Box>
            <Box color="fg.default">
              Try searching for:{" "}
              <Link asChild>
                <button onClick={() => setInputValue("gap")}>Gap</button>
              </Link>
            </Box>
          </SpotlightEmpty>
        </SpotlightContent>
      </Spotlight>
    );
  },
};