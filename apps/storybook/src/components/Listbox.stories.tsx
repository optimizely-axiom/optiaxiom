import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Box,
  type BoxProps,
  Listbox,
  ListboxCheckboxItem,
  ListboxEmpty,
  ListboxGroup,
  ListboxItem,
  ListboxItemIndicator,
  ListboxLabel,
  ListboxRadioItem,
  ListboxSeparator,
  Paper,
} from "@optiaxiom/react";
import { IconLanguage, IconStar } from "@tabler/icons-react";

type Story = StoryObj<typeof Listbox>;

export default {
  args: {
    "aria-label": "Sample",
    role: "listbox",
    tabIndex: 0,
  },
  component: Listbox,
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
          <ListboxItem asChild key={item} role="option">
            <PointerItem>{item}</PointerItem>
          </ListboxItem>
        ))}
      </>
    ),
  },
};

export const Appearance: Story = {
  args: {
    children: (
      <>
        {languages.map((item) => (
          <ListboxItem
            asChild
            intent={item === "Bangla" ? "danger" : undefined}
            key={item}
            role="option"
          >
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
            role="option"
          >
            <PointerItem>{item}</PointerItem>
          </ListboxItem>
        ))}
      </>
    ),
  },
};

export const SingleSelect: Story = {
  args: {
    children: (
      <>
        {languages.map((item) => (
          <ListboxRadioItem
            aria-selected={item === "Bangla"}
            asChild
            key={item}
            role="option"
          >
            <PointerItem>{item}</PointerItem>
          </ListboxRadioItem>
        ))}
      </>
    ),
  },
};

export const MultiSelect: Story = {
  args: {
    children: (
      <>
        {languages.map((item) => (
          <ListboxCheckboxItem
            aria-selected={item === "Bangla" || item === "Catalan"}
            asChild
            key={item}
            role="option"
          >
            <PointerItem>{item}</PointerItem>
          </ListboxCheckboxItem>
        ))}
      </>
    ),
  },
};

export const IconSingleSelect: Story = {
  args: {
    children: (
      <>
        {languages.map((item) => (
          <ListboxRadioItem
            asChild
            icon={<IconStar />}
            key={item}
            role="option"
          >
            <PointerItem>{item}</PointerItem>
          </ListboxRadioItem>
        ))}
      </>
    ),
  },
};

export const IconMultiSelect: Story = {
  args: {
    children: (
      <>
        {languages.map((item) => (
          <ListboxCheckboxItem
            asChild
            icon={<IconStar />}
            key={item}
            role="option"
          >
            <PointerItem>{item}</PointerItem>
          </ListboxCheckboxItem>
        ))}
      </>
    ),
  },
};

export const ComplexContent: Story = {
  args: {
    children: (
      <>
        {languages.map((item) => (
          <ListboxRadioItem
            aria-selected={item === "Bangla"}
            key={item}
            role="option"
          >
            <IconLanguage />
            {item}
          </ListboxRadioItem>
        ))}
      </>
    ),
  },
};

export const Separator: Story = {
  args: {
    children: (
      <>
        <ListboxItem asChild role="option">
          <PointerItem>Select All</PointerItem>
        </ListboxItem>

        <ListboxSeparator />

        {languages.map((item) => (
          <ListboxItem asChild key={item} role="option">
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
              role="option"
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
              role="option"
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
              role="option"
            >
              <PointerItem>{item}</PointerItem>
            </ListboxItem>
          ))}
        </ListboxGroup>
      </>
    ),
  },
};
