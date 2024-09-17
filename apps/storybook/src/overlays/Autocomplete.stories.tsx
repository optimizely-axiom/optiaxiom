import type { Meta, StoryObj } from "@storybook/react";

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteLabel,
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

const itemToString = (book: unknown) => {
  return book ? (book as Book).title : "";
};

const itemToKey = (book: unknown) => {
  return (book as Book).id;
};

const isItemDisabled = (book: unknown) => {
  return (book as Book).disabled;
};

export const Basic: Story = {
  render: function Basic() {
    const [items, setItems] = useState(languages);

    const onInputValueChange = (inputValue: string) => {
      setItems(
        languages.filter(
          (language: string) =>
            !inputValue ||
            language.toLowerCase().includes(inputValue.toLowerCase()) ||
            language.toLowerCase().includes(inputValue.toLowerCase()),
        ),
      );
    };

    return (
      <Autocomplete items={items} onInputValueChange={onInputValueChange}>
        <AutocompleteTrigger>
          <AutocompleteInput placeholder="Search a Language" w="208" />
        </AutocompleteTrigger>
        <AutocompleteContent>
          {items.map((item, index) => (
            <AutocompleteItem item={item} key={index}>
              {item}
            </AutocompleteItem>
          ))}
          {items.length === 0 ? (
            <AutocompleteEmpty>No result Found</AutocompleteEmpty>
          ) : (
            <></>
          )}
        </AutocompleteContent>
      </Autocomplete>
    );
  },
};

export const WithLabel: Story = {
  render: function WithLabel() {
    const [items, setItems] = useState(books);

    const onInputValueChange = (inputValue: string) => {
      setItems(
        books.filter(
          (book: Book) =>
            !inputValue ||
            book.title.includes(inputValue) ||
            book.author.includes(inputValue),
        ),
      );
    };

    return (
      <Autocomplete
        isItemDisabled={isItemDisabled}
        itemToKey={itemToKey}
        itemToString={itemToString}
        items={items}
        onInputValueChange={onInputValueChange}
      >
        <AutocompleteTrigger>
          <AutocompleteLabel label="Label">
            <AutocompleteInput placeholder="Search a book" />
          </AutocompleteLabel>
        </AutocompleteTrigger>

        <AutocompleteContent>
          {items.map((item, index) => (
            <AutocompleteItem item={item} key={index}>
              {item.title}
            </AutocompleteItem>
          ))}
        </AutocompleteContent>
      </Autocomplete>
    );
  },
};

export const Disabled: Story = {
  render: function Disabled() {
    const [items, setItems] = useState(languages);

    const onInputValueChange = (inputValue: string) => {
      setItems(
        languages.filter(
          (language: string) =>
            !inputValue ||
            language.toLowerCase().includes(inputValue.toLowerCase()) ||
            language.toLowerCase().includes(inputValue.toLowerCase()),
        ),
      );
    };

    return (
      <Autocomplete
        disabled
        items={items}
        onInputValueChange={onInputValueChange}
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

export const DisabledItems: Story = {
  render: function DefaultSelected() {
    const [items, setItems] = useState(books);
    const [value, setValue] = useState("Crime and Punishment");

    function onValueChange(value: string) {
      setValue(value);
    }
    const onInputValueChange = (inputValue: string) => {
      setItems(
        books.filter(
          (book: Book) =>
            !inputValue ||
            book.title.includes(inputValue) ||
            book.author.includes(inputValue),
        ),
      );
    };

    return (
      <Autocomplete
        isItemDisabled={isItemDisabled}
        itemToKey={itemToKey}
        itemToString={itemToString}
        items={items}
        onInputValueChange={onInputValueChange}
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
            </AutocompleteItem>
          ))}
        </AutocompleteContent>
      </Autocomplete>
    );
  },
};
