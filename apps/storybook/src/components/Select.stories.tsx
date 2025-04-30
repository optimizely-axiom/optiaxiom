import type { Meta, StoryObj } from "@storybook/react";

import {
  Box,
  Button,
  Field,
  Flex,
  LabelMenuButton,
  Select,
  SelectContent,
  SelectTrigger,
  Text,
} from "@optiaxiom/react";
import { expect, screen, userEvent } from "@storybook/test";
import { useEffect, useMemo, useState } from "react";

type Story = StoryObj<typeof Select>;

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

export default {
  args: {
    children: (
      <>
        <SelectTrigger placeholder="Select a language" />
        <SelectContent />
      </>
    ),
    defaultOpen: true,
    defaultValue: "Bangla",
    options: languages.map((language) => ({
      label: language,
      value: language,
    })),
  },
  component: Select,
  decorators: (Story) => (
    <Box w="224">
      <Story />
    </Box>
  ),
} as Meta<typeof Select>;

export const Basic: Story = {};

export const WithLabel: Story = {
  args: {
    defaultOpen: false,
  },
  decorators: (Story) => (
    <Field label="Label">
      <Story />
    </Field>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText("Label"));
    await expect(canvas.getByLabelText("Label")).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(await screen.findByRole("listbox")).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    defaultOpen: false,
    disabled: true,
  },
};

const groups = {
  fruits: { label: "Fruits", separator: true },
  meats: { label: "Meats", separator: true },
  vegetables: { label: "Vegetables", separator: true },
};

const foods = [
  { group: groups.fruits, label: "Apple", value: "Apple" },
  { group: groups.fruits, label: "Banana", value: "Banana" },
  { group: groups.fruits, label: "Blueberry", value: "Blueberry" },
  { group: groups.fruits, label: "Grapes", value: "Grapes" },
  { group: groups.fruits, label: "Pineapple", value: "Pineapple" },
  { group: groups.vegetables, label: "Aubergine", value: "Aubergine" },
  { group: groups.vegetables, label: "Broccoli", value: "Broccoli" },
  { group: groups.vegetables, label: "Carrot", value: "Carrot" },
  { group: groups.vegetables, label: "Courgette", value: "Courgette" },
  { group: groups.vegetables, label: "Leek", value: "Leek" },
  { group: groups.meats, label: "Beef", value: "Beef" },
  { group: groups.meats, label: "Chicken", value: "Chicken" },
  { group: groups.meats, label: "Lamb", value: "Lamb" },
  { group: groups.meats, label: "Pork", value: "Pork" },
];

export const Group: Story = {
  args: {
    children: (
      <>
        <SelectTrigger placeholder="Select an item" />
        <SelectContent />
      </>
    ),
    defaultValue: undefined,
    options: foods,
  },
};

const books = [
  {
    author: "Harper Lee",
    disabled: false,
    id: "book-1",
    title: "To Kill a Mockingbird",
  },
  {
    author: "Lev Tolstoy",
    disabled: false,
    id: "book-2",
    title: "War and Peace",
  },
  {
    author: "Fyodor Dostoyevsky",
    disabled: false,
    id: "book-3",
    title: "The Idiot",
  },
  {
    author: "Oscar Wilde",
    disabled: true,
    id: "book-4",
    title: "A Picture of Dorian Gray",
  },
  { author: "George Orwell", disabled: false, id: "book-5", title: "1984" },
  {
    author: "Jane Austen",
    disabled: true,
    id: "book-6",
    title: "Pride and Prejudice",
  },
  {
    author: "Marcus Aurelius",
    disabled: false,
    id: "book-7",
    title: "Meditations",
  },
  {
    author: "Fyodor Dostoevsky",
    disabled: true,
    id: "book-8",
    title: "The Brothers Karamazov",
  },
  {
    author: "Lev Tolstoy",
    disabled: false,
    id: "book-9",
    title: "Anna Karenina",
  },
  {
    author: "Fyodor Dostoevsky",
    disabled: false,
    id: "book-10",
    title: "Crime and Punishment",
  },
];

export const Controlled: Story = {
  args: {
    children: (
      <>
        <SelectTrigger placeholder="Select a book" />
        <SelectContent />
      </>
    ),
    defaultValue: undefined,
    options: books.map((book) => ({
      disabledReason: book.disabled ? "Some reason" : undefined,
      label: book.title,
      value: book.id,
    })),
  },
  render: function Controlled(args) {
    const [value, setValue] = useState<string>(books[9].id);

    return (
      <Flex flexDirection="row" fontSize="md">
        <Select {...args} onValueChange={setValue} value={value} />
        <Text>Selected: {value ? value : "None"}</Text>
      </Flex>
    );
  },
};

export const AsyncLoading: Story = {
  render: function AsyncLoading(args) {
    const [items, setItems] = useState<
      Array<{
        label: string;
        value: string;
      }>
    >([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setItems(
          languages.map((language) => ({
            label: language,
            value: language,
          })),
        );
        setIsLoading(false);
      }, 3000);
    }, []);

    return (
      <Select {...args} loading={isLoading} options={items}>
        <SelectTrigger placeholder="Select a language" />
        <SelectContent />
      </Select>
    );
  },
};

const environments = ["Development", "QA", "Stage", "Production"];

export const AlternateTrigger: Story = {
  args: {
    defaultOpen: false,
    defaultValue: undefined,
  },
  render: function AsyncLoading(args) {
    const [value, setValue] = useState<string>("");

    return (
      <Flex w="224">
        <Select
          {...args}
          onValueChange={setValue}
          options={useMemo(
            () =>
              environments.map((environment) => ({
                label: environment,
                value: environment,
              })),
            [],
          )}
          value={value}
        >
          <SelectTrigger asChild>
            <LabelMenuButton label="Environment" />
          </SelectTrigger>
          <SelectContent />
        </Select>

        <Select
          {...args}
          onValueChange={setValue}
          options={useMemo(
            () =>
              environments.map((environment) => ({
                label: environment,
                value: environment,
              })),
            [],
          )}
          value={value}
        >
          <SelectTrigger asChild placeholder="Select an environment">
            <LabelMenuButton label="Environment" />
          </SelectTrigger>
          <SelectContent />
        </Select>
        <Button alignSelf="start" onClick={() => setValue("")}>
          Reset
        </Button>
      </Flex>
    );
  },
};
