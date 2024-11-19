import type { Meta, StoryObj } from "@storybook/react";

import {
  Box,
  type BoxProps,
  Button,
  Listbox,
  ListboxEmpty,
  ListboxFooter,
  ListboxGroup,
  ListboxItem,
  ListboxItemIndicator,
  ListboxLabel,
  ListboxScrollArea,
  ListboxSeparator,
  Paper,
} from "@optiaxiom/react";

type Story = StoryObj<typeof Listbox>;

export default {
  component: Listbox,
  parameters: {
    useOverlayDecorator: true,
  },
  render: (args) => (
    <Paper asChild maxH="xs" p="4" w="224">
      <Listbox {...args} />
    </Paper>
  ),
} as Meta<typeof Listbox>;

const PointerItem = (props: BoxProps) => (
  <Box
    onMouseEnter={(event) => {
      event.currentTarget.dataset.highlighted = "";
    }}
    onMouseLeave={(event) => {
      delete event.currentTarget.dataset.highlighted;
    }}
    {...props}
  />
);

const languages = [
  "Afrikaans",
  "Arabic",
  "Bangla",
  "Bulgarian",
  "Catalan",
  "Chinese (Simplified)",
  "Croatian",
  "Czech",
  "Danish",
  "Dutch",
  "English",
  "Finnish",
  "French",
  "German",
  "Greek",
  "Hebrew",
  "Hindi",
  "Hungarian",
  "Indonesian",
  "Italian",
  "Japanese",
  "Korean",
  "Lithuanian",
  "Malay",
  "Norwegian",
  "Persian",
  "Polish",
  "Portuguese",
  "Romanian",
  "Russian",
  "Spanish",
  "Swahili",
  "Swedish",
  "Tagalog",
  "Tamil",
  "Thai",
  "Turkish",
  "Ukrainian",
  "Urdu",
  "Vietnamese",
];

export const Basic: Story = {
  args: {
    children: (
      <>
        {languages.map((item) => (
          <ListboxItem asChild key={item}>
            <PointerItem>{item}</PointerItem>
          </ListboxItem>
        ))}
      </>
    ),
  },
};

export const Indicator: Story = {
  args: {
    children: (
      <>
        {languages.map((item) => (
          <ListboxItem
            addonAfter={<ListboxItemIndicator active={item === "Bangla"} />}
            asChild
            key={item}
          >
            <PointerItem>{item}</PointerItem>
          </ListboxItem>
        ))}
      </>
    ),
  },
};

export const Separator: Story = {
  args: {
    children: (
      <>
        <ListboxItem asChild>
          <PointerItem>Select All</PointerItem>
        </ListboxItem>

        <ListboxSeparator />

        {languages.map((item) => (
          <ListboxItem asChild key={item}>
            <PointerItem>{item}</PointerItem>
          </ListboxItem>
        ))}
      </>
    ),
  },
};

export const Empty: Story = {
  args: {
    children: (
      <>
        <ListboxEmpty>No results</ListboxEmpty>
      </>
    ),
  },
};

export const Footer: Story = {
  args: {
    children: (
      <>
        <ListboxScrollArea>
          {languages.map((item) => (
            <ListboxItem asChild key={item}>
              <PointerItem>{item}</PointerItem>
            </ListboxItem>
          ))}
        </ListboxScrollArea>

        <ListboxFooter>
          <Button>Clear All</Button>

          <Button appearance="primary">Done</Button>
        </ListboxFooter>
      </>
    ),
  },
};

const fruits = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"];
const vegetables = ["Aubergine", "Broccoli", "Carrot", "Courgette", "Leek"];
const meats = ["Beef", "Chicken", "Lamb", "Pork"];

export const Group: Story = {
  args: {
    children: (
      <>
        <ListboxGroup>
          <ListboxLabel>Fruits</ListboxLabel>
          {fruits.map((item) => (
            <ListboxItem
              addonAfter={<ListboxItemIndicator />}
              asChild
              key={`fruits-${item}`}
            >
              <PointerItem>{item}</PointerItem>
            </ListboxItem>
          ))}
        </ListboxGroup>

        <ListboxGroup>
          <ListboxLabel>Meats</ListboxLabel>
          {meats.map((item) => (
            <ListboxItem
              addonAfter={<ListboxItemIndicator />}
              asChild
              key={`meats-${item}`}
            >
              <PointerItem>{item}</PointerItem>
            </ListboxItem>
          ))}
        </ListboxGroup>

        <ListboxGroup>
          <ListboxLabel>Vegetables</ListboxLabel>
          {vegetables.map((item) => (
            <ListboxItem
              addonAfter={<ListboxItemIndicator />}
              asChild
              key={`vegetables-${item}`}
            >
              <PointerItem>{item}</PointerItem>
            </ListboxItem>
          ))}
        </ListboxGroup>
      </>
    ),
  },
};
