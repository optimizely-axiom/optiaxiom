import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Box, Button, Field } from "@optiaxiom/react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxFooter,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

type Story<T = string, M extends "multiple" | "single" = "single"> = StoryObj<
  typeof Combobox<T, M>
>;

export default {
  component: Combobox,
  decorators: (Story) => (
    <Box w="320">
      <Story />
    </Box>
  ),
  parameters: {
    useOverlayDecorator: true,
  },
} as Meta<typeof Combobox>;

const languages = [
  "Afrikaans",
  "Arabic",
  "Bengali",
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
  render: function Basic(args) {
    const [items, setItems] = useState(languages);

    return (
      <Combobox
        {...args}
        items={items}
        onInputValueChange={(inputValue) => {
          setItems(
            languages.filter(
              (language) =>
                !inputValue ||
                language.toLowerCase().includes(inputValue.toLowerCase()),
            ),
          );
        }}
      >
        <ComboboxTrigger>
          <ComboboxValue placeholder="Select a language" />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput placeholder="Languages..." />
          <ComboboxList>
            {items.map((item) => (
              <ComboboxItem
                addonAfter={<ComboboxItemIndicator />}
                item={item}
                key={item}
              >
                {item}
              </ComboboxItem>
            ))}
          </ComboboxList>
          <ComboboxEmpty>No result found</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
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

export const Multiple: Story<string, "multiple"> = {
  ...(Basic as Story<string, "multiple">),
  args: {
    mode: "multiple",
  },
};

const users = [
  {
    email: "david.nguyen@example.com",
    id: "DN",
    name: "David Nguyen",
  },
  {
    email: "emily.chen@example.com",
    id: "EC",
    name: "Emily Chen",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    email: "michael.rodriguez@example.com",
    id: "MR",
    name: "Michael Rodriguez",
  },
  {
    email: "sarah.patel@example.com",
    id: "SP",
    name: "Sarah Patel",
  },
];

export const People: Story<(typeof users)[number]> = {
  render: function PeopleSelector(args) {
    const [items, setItems] = useState(users);

    return (
      <Combobox
        {...args}
        items={items}
        itemToKey={(user) => user?.id}
        itemToString={(user) => (user ? user.name : "")}
        onInputValueChange={(inputValue) => {
          setItems(
            inputValue
              ? users.filter(
                  (user) =>
                    user.email
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()) ||
                    user.name.toLowerCase().includes(inputValue.toLowerCase()),
                )
              : users,
          );
        }}
      >
        <ComboboxTrigger>
          <ComboboxValue placeholder="Select user" />
        </ComboboxTrigger>

        <ComboboxContent>
          <ComboboxInput placeholder="People..." />
          <ComboboxList>
            {items.map((user) => (
              <ComboboxItem
                addonBefore={
                  <Avatar name={user.name} size="sm" src={user.src} />
                }
                description={user.email}
                item={user}
                key={user.id}
              >
                {user.name}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );
  },
};

const books = [
  { author: "George Orwell", disabled: false, id: "book-5", title: "1984" },
  {
    author: "Oscar Wilde",
    disabled: true,
    id: "book-4",
    title: "A Picture of Dorian Gray",
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
  {
    author: "Marcus Aurelius",
    disabled: false,
    id: "book-7",
    title: "Meditations",
  },
  {
    author: "Jane Austen",
    disabled: true,
    id: "book-6",
    title: "Pride and Prejudice",
  },
  {
    author: "Fyodor Dostoevsky",
    disabled: true,
    id: "book-8",
    title: "The Brothers Karamazov",
  },
  {
    author: "Fyodor Dostoyevsky",
    disabled: false,
    id: "book-3",
    title: "The Idiot",
  },
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
];

export const Controlled: Story<(typeof books)[number], "multiple"> = {
  render: function DefaultSelected(args) {
    const [items, setItems] = useState(books);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([books[9]]);

    return (
      <Combobox
        {...args}
        items={items}
        itemToKey={(book) => book?.id}
        itemToString={(book) => (book ? book.title : "")}
        mode="multiple"
        onInputValueChange={(inputValue) => {
          setItems(
            books.filter(
              (book) =>
                !inputValue ||
                book.title.includes(inputValue.toLowerCase()) ||
                book.author.includes(inputValue.toLowerCase()),
            ),
          );
        }}
        onOpenChange={setOpen}
        onValueChange={setValue}
        open={open}
        value={value}
      >
        <ComboboxTrigger>
          <ComboboxValue placeholder="Select books" />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput placeholder="Books..." />
          <ComboboxList>
            {items.map((book) => (
              <ComboboxItem item={book} key={book.id}>
                {book.title}
              </ComboboxItem>
            ))}
          </ComboboxList>
          <ComboboxFooter>
            <Button onClick={() => setValue([])}>Clear All</Button>
            <Button appearance="primary" onClick={() => setOpen(false)}>
              Done
            </Button>
          </ComboboxFooter>
        </ComboboxContent>
      </Combobox>
    );
  },
};
