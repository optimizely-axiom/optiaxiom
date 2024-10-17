import type { Meta, StoryObj } from "@storybook/react";

import { Field, Flex, Text } from "@optiaxiom/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

type Story = StoryObj<typeof Select<string>>;

export default {
  component: Select,
} as Meta<typeof Select<string>>;

type Book = {
  author: string;
  disabled: boolean;
  id: string;
  title: string;
};

const books: Book[] = [
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

const languages = [
  "English",
  "French",
  "German",
  "Spanish",
  "Portuguese",
  "Russian",
  "Japanese",
  "Korean",
  "Chinese (Simplified)",
  "Italian",
  "Dutch",
  "Polish",
  "Swedish",
  "Danish",
  "Finnish",
  "Norwegian",
  "Turkish",
  "Arabic",
  "Hindi",
  "Bengali",
  "Vietnamese",
  "Thai",
  "Indonesian",
  "Greek",
  "Czech",
  "Romanian",
  "Hungarian",
  "Hebrew",
  "Ukrainian",
  "Swahili",
  "Malay",
  "Tagalog",
  "Persian",
  "Tamil",
  "Urdu",
  "Afrikaans",
  "Bulgarian",
  "Catalan",
  "Croatian",
  "Lithuanian",
];

export const Basic: Story = {
  args: {
    items: languages,
  },
  render: function Basic(args) {
    const [value, setValue] = useState("Bengali");

    return (
      <Select
        {...args}
        items={languages}
        onValueChange={setValue}
        value={value}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>

        <SelectContent>
          {languages.map((item, index) => {
            return (
              <SelectItem item={item} key={index}>
                {item}
                <SelectItemIndicator />
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  },
};

export const WithLabel: Story = {
  ...Basic,
  decorators: (Story) => (
    <Field label="Label">
      <Story />
    </Field>
  ),
};

export const Disabled: Story = {
  ...Basic,
  args: {
    disabled: true,
  },
};

const fruits = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"];

const vegetables = ["Aubergine", "Broccoli", "Carrot", "Courgette", "Leek"];

const meats = ["Beef", "Chicken", "Lamb", "Pork"];

const combinedFoodList = [
  "Apple",
  "Banana",
  "Blueberry",
  "Grapes",
  "Pineapple",
  "Aubergine",
  "Broccoli",
  "Carrot",
  "Courgette",
  "Leek",
  "Beef",
  "Chicken",
  "Lamb",
  "Pork",
];
export const Grouped: Story = {
  args: {
    items: languages,
  },
  render: function Basic(args) {
    const [value, setValue] = useState<string>();

    return (
      <Select
        {...args}
        items={combinedFoodList}
        onValueChange={setValue}
        value={value}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select an item" />
        </SelectTrigger>

        <SelectContent>
          <SelectLabel>Fruits</SelectLabel>
          {fruits.map((item, index) => {
            return (
              <SelectItem item={item} key={index}>
                {item}
                <SelectItemIndicator />
              </SelectItem>
            );
          })}
          <SelectSeparator />

          <SelectLabel>Vegetables</SelectLabel>
          {vegetables.map((item, index) => {
            return (
              <SelectItem item={item} key={index}>
                {item}
                <SelectItemIndicator />
              </SelectItem>
            );
          })}
          <SelectSeparator />

          <SelectLabel>Meats</SelectLabel>
          {meats.map((item, index) => {
            return (
              <SelectItem item={item} key={index}>
                {item}
                <SelectItemIndicator />
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  },
};

export const Controlled: Story = {
  render: function DefaultSelected() {
    const [value, setValue] = useState(books[9]);

    return (
      <Flex alignItems="center">
        <Select
          isItemDisabled={(book) => book.disabled}
          items={books}
          itemToKey={(book) => book?.id}
          itemToString={(book) => book?.title ?? ""}
          onValueChange={setValue}
          value={value}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a book" />
          </SelectTrigger>

          <SelectContent>
            {books.map((item, index) => {
              return (
                <SelectItem item={item} key={index}>
                  {item.title}
                  <SelectItemIndicator />
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Text>Selected Value: {value ? value.title : "None"}</Text>
      </Flex>
    );
  },
};
