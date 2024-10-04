import type { Meta, StoryObj } from "@storybook/react";

import { Field, Flex, Text } from "@optiaxiom/react";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmptyItem,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteItemIndicator,
  AutocompleteTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

type Story = StoryObj<typeof Autocomplete>;

export default {
  component: Autocomplete,
} as Meta<typeof Autocomplete>;

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
    const [items, setItems] = useState(languages);

    return (
      <Autocomplete
        items={items}
        onInputValueChange={({ inputValue }) => {
          setItems(
            languages.filter(
              (language: string) =>
                !inputValue ||
                language.toLowerCase().includes(inputValue.toLowerCase()) ||
                language.toLowerCase().includes(inputValue.toLowerCase()),
            ),
          );
        }}
      >
        <AutocompleteTrigger>
          <AutocompleteInput placeholder="Search a Language" w="208" />
        </AutocompleteTrigger>

        <AutocompleteContent>
          {items.map((item, index) => (
            <AutocompleteItem item={item} key={index}>
              {item}
              <AutocompleteItemIndicator />
            </AutocompleteItem>
          ))}
          {items.length === 0 && (
            <AutocompleteEmptyItem>No result Found</AutocompleteEmptyItem>
          )}
        </AutocompleteContent>
      </Autocomplete>
    );
  },
};

export const WithLabel: Story = {
  render: function WithLabel() {
    const [items, setItems] = useState(books);

    return (
      <Field label="Label">
        <Autocomplete
          isItemDisabled={isItemDisabled}
          itemToKey={itemToKey}
          itemToString={itemToString}
          items={items}
          onInputValueChange={({ inputValue }) => {
            setItems(
              books.filter(
                (book: Book) =>
                  !inputValue ||
                  book.title.includes(inputValue) ||
                  book.author.includes(inputValue),
              ),
            );
          }}
        >
          <AutocompleteTrigger>
            <AutocompleteInput placeholder="Search a book" />
          </AutocompleteTrigger>

          <AutocompleteContent>
            {items.map((item, index) => (
              <AutocompleteItem item={item} key={index}>
                {item.title}
              </AutocompleteItem>
            ))}
          </AutocompleteContent>
        </Autocomplete>
      </Field>
    );
  },
};

export const Disabled: Story = {
  render: function Disabled() {
    const [items, setItems] = useState(languages);

    return (
      <Autocomplete
        disabled
        items={items}
        onInputValueChange={({ inputValue }) => {
          setItems(
            languages.filter(
              (language: string) =>
                !inputValue ||
                language.toLowerCase().includes(inputValue.toLowerCase()) ||
                language.toLowerCase().includes(inputValue.toLowerCase()),
            ),
          );
        }}
        value="English"
      >
        <AutocompleteTrigger>
          <AutocompleteInput placeholder="Search a Language" w="208" />
        </AutocompleteTrigger>
        <AutocompleteContent>
          {items.map((item, index) => (
            <AutocompleteItem item={item} key={index}>
              {item}
            </AutocompleteItem>
          ))}
        </AutocompleteContent>
      </Autocomplete>
    );
  },
};

export const Controlled: Story = {
  render: function DefaultSelected() {
    const [items, setItems] = useState(books);
    const [value, setValue] = useState(books[9]);

    function onValueChange(value: Book) {
      setValue(value);
    }

    return (
      <Flex alignItems="center">
        <Autocomplete
          isItemDisabled={isItemDisabled}
          itemToKey={itemToKey}
          itemToString={itemToString}
          items={items}
          onInputValueChange={({ inputValue }) => {
            setItems(
              books.filter(
                (book: Book) =>
                  !inputValue ||
                  book.title.includes(inputValue) ||
                  book.author.includes(inputValue),
              ),
            );
          }}
          onValueChange={onValueChange}
          value={value}
        >
          <AutocompleteTrigger>
            <AutocompleteInput placeholder="Search a book" />
          </AutocompleteTrigger>
          <AutocompleteContent>
            {items.map((item, index) => (
              <AutocompleteItem item={item} key={index}>
                {item.title}
                <AutocompleteItemIndicator />
              </AutocompleteItem>
            ))}
          </AutocompleteContent>
        </Autocomplete>

        <Text>Selected Value: {value ? value.title : "None"}</Text>
      </Flex>
    );
  },
};
