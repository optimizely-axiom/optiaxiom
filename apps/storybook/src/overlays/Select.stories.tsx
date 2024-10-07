import type { Meta, StoryObj } from "@storybook/react";

import { Field, Flex, Text } from "@optiaxiom/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

type Story = StoryObj<typeof Select>;

export default {
  component: Select,
} as Meta<typeof Select>;

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

const itemToString = (book: Book | null) => {
  return book ? book.title : "";
};

const itemToKey = (book: Book | null) => {
  return book?.id;
};

const isItemDisabled = (book: Book) => {
  return book.disabled;
};

export const Basic: Story = {
  render: function Basic() {
    const [value, setValue] = useState<string>();

    return (
      <Select items={languages} onValueChange={setValue} value={value}>
        <SelectTrigger>{value || "Select a language"}</SelectTrigger>
        <SelectContent>
          {languages.map((item, index) => (
            <SelectItem item={item} key={index}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
};

export const WithLabel: Story = {
  render: function WithLabel() {
    const [value, setValue] = useState(books[0]);

    return (
      <Field label="Label">
        <Select
          isItemDisabled={isItemDisabled}
          itemToKey={itemToKey}
          itemToString={itemToString}
          items={books}
          onValueChange={setValue}
          value={value}
        >
          <SelectTrigger>{value.title} </SelectTrigger>
          <SelectContent>
            {books.map((item, index) => (
              <SelectItem item={item} key={index}>
                {item.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    );
  },
};

export const Disabled: Story = {
  render: function Disabled() {
    const [value, setValue] = useState("English");

    return (
      <Select disabled items={languages} onValueChange={setValue} value={value}>
        <SelectTrigger>{value} </SelectTrigger>
        <SelectContent>
          {languages.map((item, index) => (
            <SelectItem item={item} key={index}>
              {item}
            </SelectItem>
          ))}
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
          isItemDisabled={isItemDisabled}
          itemToKey={itemToKey}
          itemToString={itemToString}
          items={books}
          onValueChange={setValue}
          value={value}
        >
          <SelectTrigger>{value.title} </SelectTrigger>

          <SelectContent>
            {books.map((item, index) => (
              <SelectItem item={item} key={index}>
                {item.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Text>Selected Value: {value ? value.title : "None"}</Text>
      </Flex>
    );
  },
};
