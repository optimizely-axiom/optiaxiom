import type { Meta, StoryObj } from "@storybook/react";

import { Field, Flex, Text } from "@optiaxiom/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectRadioItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@optiaxiom/react/unstable";
import { expect, screen, userEvent } from "@storybook/test";
import { useEffect, useState } from "react";

type Story<T = string> = StoryObj<typeof Select<T>>;

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
        <SelectTrigger>
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>

        <SelectContent>
          {languages.map((item, index) => {
            return (
              <SelectRadioItem item={item} key={index}>
                {item}
              </SelectRadioItem>
            );
          })}
        </SelectContent>
      </>
    ),
    defaultOpen: true,
    defaultValue: "Bangla",
    items: languages,
  },
  component: Select,
  parameters: {
    useOverlayDecorator: true,
  },
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

const fruits = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"];
const vegetables = ["Aubergine", "Broccoli", "Carrot", "Courgette", "Leek"];
const meats = ["Beef", "Chicken", "Lamb", "Pork"];
const combinedFoodList = [...fruits, ...vegetables, ...meats];

export const Group: Story = {
  args: {
    children: (
      <>
        <SelectTrigger>
          <SelectValue placeholder="Select an item" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            {fruits.map((item, index) => {
              return (
                <SelectRadioItem item={item} key={index}>
                  {item}
                </SelectRadioItem>
              );
            })}
          </SelectGroup>

          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            {vegetables.map((item, index) => {
              return (
                <SelectRadioItem item={item} key={index}>
                  {item}
                </SelectRadioItem>
              );
            })}
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectLabel>Meats</SelectLabel>
            {meats.map((item, index) => {
              return (
                <SelectRadioItem item={item} key={index}>
                  {item}
                </SelectRadioItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </>
    ),
    defaultValue: null,
    items: combinedFoodList,
  },
};

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

export const Controlled: Story<Book> = {
  args: {
    children: (
      <>
        <SelectTrigger>
          <SelectValue placeholder="Select a book" />
        </SelectTrigger>

        <SelectContent>
          {books.map((item, index) => {
            return (
              <SelectRadioItem item={item} key={index}>
                {item.title}
              </SelectRadioItem>
            );
          })}
        </SelectContent>
      </>
    ),
    isItemDisabled: (book) => book.disabled,
    items: books,
    itemToString: (book) => book?.title ?? "",
  },
  render: function Controlled(args) {
    const [value, setValue] = useState<Book | null>(books[9]);

    return (
      <Flex alignItems="center">
        <Select {...args} onValueChange={setValue} value={value} />

        <Text>Selected Value: {value ? value.title : "None"}</Text>
      </Flex>
    );
  },
};

export const AsyncLoading: Story = {
  render: function AsyncLoading(args) {
    const [items, setItems] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setItems(languages);
        setIsLoading(false);
      }, 3000);
    }, []);

    return (
      <Select {...args} items={items}>
        <SelectTrigger>
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>

        <SelectContent loading={isLoading}>
          {items.map((item) => (
            <SelectRadioItem item={item} key={item}>
              {item}
            </SelectRadioItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
};
