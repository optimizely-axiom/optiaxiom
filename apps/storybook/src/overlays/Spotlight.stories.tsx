import type { Meta, StoryObj } from "@storybook/react";

import { Box, Kbd, Toast, toaster, ToastTitle } from "@optiaxiom/react";
import {
  Highlight,
  Spotlight,
  SpotlightContent,
  SpotlightEmpty,
  SpotlightInput,
  SpotlightLabel,
  SpotlightList,
  SpotlightRadioItem,
  SpotlightScrollArea,
  SpotlightSub,
  SpotlightSubItem,
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

const empty: Item = {
  title: "Empty",
};

const types = {
  items: [
    {
      title: "Colors",
    },
    {
      title: "Names",
    },
    {
      title: "Numbers",
    },
  ],
  title: "Types",
};

const pages = [
  {
    category: "Layout",
    description: "Set the element's `gap` CSS property",
    tag: "Numbers",
    title: "Gap",
  },
  {
    category: "Layout",
    description: "Set the element's margin on all sides",
    tag: "Numbers",
    title: "Margin",
  },
  {
    category: "Typography",
    description: "Set the element's font family",
    tag: "Names",
    title: "Font Family",
  },
  {
    category: "Typography",
    description:
      "Set the element's `font-size` and `line-height` CSS properties",
    tag: "Numbers",
    title: "Font Size",
  },
  {
    category: "Typography",
    description: "Set the element's text color",
    tag: "Colors",
    title: "Text Color",
  },
  {
    category: "Sizing",
    description: "Set the element's height",
    tag: "Numbers",
    title: "Height",
  },
  {
    category: "Sizing",
    description: "Set the element's width",
    tag: "Numbers",
    title: "Width",
  },
];

type Item = {
  category?: string;
  description?: string;
  title: string;
};

export const Basic: Story<{ items?: Item[] } & Item> = {
  render: function Basic(args) {
    const [open, setOpen] = useState(args.defaultOpen);
    const [inputValue, setInputValueState] = useState("");
    const [items, setItems] = useState(pages);
    const [filter, setFilter] = useState<Item | null>(null);

    const setInputValue = (inputValue: string) => {
      setInputValueState(inputValue);
      setItems(
        pages.filter(
          (page) =>
            !inputValue ||
            getAllPhrasesMatchingRegex(
              inputValue
                .split(" ")
                .map((q) => q.trim())
                .filter(Boolean),
            ).test(page.description + "\n" + page.title),
        ),
      );
    };

    const categories = new Set();
    const shouldShowCategory = (category: string | undefined) => {
      const flag = categories.has(category);
      categories.add(category);
      return !flag;
    };

    const filteredItems = (() => {
      const filteredItems = items.filter(
        (item) => !filter || item.tag === filter.title,
      );
      return filteredItems.length ? filteredItems : [empty];
    })();

    return (
      <Spotlight
        {...args}
        inputValue={inputValue}
        items={[types, ...filteredItems]}
        itemToSubItems={(item) => ("items" in item ? (item.items ?? []) : [])}
        onInputValueChange={setInputValue}
        onItemSelect={(value) => {
          if (types.items.includes(value)) {
            setFilter((filter) => (filter === value ? null : value));
          } else if (value === empty) {
            setFilter(null);
            setInputValue("gap");
          }
          toaster.create(
            <Toast intent="success">
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
            <SpotlightSub
              borderB="1"
              borderColor="border.tertiary"
              item={types}
              pb="sm"
            >
              {types.items.map((item) => (
                <SpotlightSubItem
                  item={item}
                  key={item.title}
                  selected={filter === item}
                >
                  {item.title}
                </SpotlightSubItem>
              ))}
            </SpotlightSub>

            <SpotlightScrollArea>
              {filteredItems.map((item) => (
                <Fragment key={item.title}>
                  {shouldShowCategory(item.category) && (
                    <SpotlightLabel>{item.category}</SpotlightLabel>
                  )}

                  {item === empty ? (
                    <>
                      <SpotlightEmpty>
                        <Box>
                          No results for &quot;
                          <Box asChild color="fg.default">
                            <span>{inputValue}</span>
                          </Box>
                          &quot;
                        </Box>
                      </SpotlightEmpty>

                      <SpotlightRadioItem item={item}>
                        Try searching for: <strong>Gap</strong>
                      </SpotlightRadioItem>
                    </>
                  ) : (
                    <SpotlightRadioItem
                      description={
                        <Highlight
                          content={item.description}
                          query={inputValue}
                        >
                          {(chunk) => (
                            <Box
                              asChild
                              borderB="2"
                              borderColor="fg.information"
                              fontWeight="600"
                            >
                              {chunk}
                            </Box>
                          )}
                        </Highlight>
                      }
                      item={item}
                    >
                      <Highlight content={item.title} query={inputValue}>
                        {(chunk) => (
                          <Box
                            asChild
                            borderB="2"
                            borderColor="fg.information"
                            fontWeight="600"
                          >
                            {chunk}
                          </Box>
                        )}
                      </Highlight>
                    </SpotlightRadioItem>
                  )}
                </Fragment>
              ))}
            </SpotlightScrollArea>
          </SpotlightList>
        </SpotlightContent>
      </Spotlight>
    );
  },
};

function escapeRegExp(string: string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
}

function getAllPhrasesMatchingRegex(phrases: string[]) {
  const escapedPhrases = phrases.map((p) => escapeRegExp(p));

  return new RegExp(
    "(?![^<>]*>)(^|\\b)(?=[^/.])(" + escapedPhrases.join("|") + ")",
    "gi",
  );
}
