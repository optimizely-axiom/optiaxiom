import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarGroup, Box, Button, Field } from "@optiaxiom/react";
import {
  Combobox,
  ComboboxCheckboxItem,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxFooter,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "@optiaxiom/react/unstable";
import { IconUsers } from "@tabler/icons-react";
import { Fragment, useEffect, useState } from "react";

type Story<T = string> = StoryObj<typeof Combobox<T>>;

export default {
  args: {
    defaultOpen: true,
  },
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
    const [open, setOpen] = useState(args.defaultOpen);
    const [items, setItems] = useState(languages);
    const [value, setValue] = useState("");

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
        onOpenChange={setOpen}
        onSelect={(value) => {
          setValue(value);
          setOpen(false);
        }}
        open={open}
      >
        <ComboboxTrigger>
          <ComboboxValue placeholder="Select a language" value={value} />
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

export const Multiple: Story = {
  render: function Multiple(args) {
    const [open, setOpen] = useState(args.defaultOpen);
    const [items, setItems] = useState(languages);
    const [values, setValues] = useState<string[]>([]);

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
        onOpenChange={setOpen}
        onSelect={(value) => {
          setValues((values) =>
            values.includes(value)
              ? values.filter((v) => v !== value)
              : [...values, value],
          );
        }}
        open={open}
      >
        <ComboboxTrigger>
          <ComboboxValue
            placeholder="Select a language"
            type="multiple"
            value={values}
          />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput placeholder="Languages..." />
          <ComboboxList>
            {items.map((item) => (
              <ComboboxCheckboxItem
                active={values.includes(item)}
                item={item}
                key={item}
              >
                {item}
              </ComboboxCheckboxItem>
            ))}
          </ComboboxList>
          <ComboboxEmpty>No result found</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    );
  },
};

const actions = {
  all: {
    email: "",
    id: "all",
    name: "Show all users",
    src: undefined,
  },
  me: {
    email: "arthur.morgan@example.com",
    id: "me",
    name: "Arthur Morgan",
    src: undefined,
  },
};
const users = [
  {
    email: "arthur.morgan@example.com",
    id: "AM",
    name: "Arthur Morgan",
  },
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
  render: function People(args) {
    const [open, setOpen] = useState(args.defaultOpen);
    const [list, setList] = useState([actions.me, ...users]);
    const [items, setItems] = useState(list);
    const [values, setValues] = useState<typeof users>([]);

    useEffect(() => {
      if (!open) {
        const list = values.length
          ? [actions.me, ...values, actions.all]
          : [actions.me, ...users];
        setList(list);
      }
    }, [open, values]);
    useEffect(() => {
      setItems(list);
    }, [list]);

    return (
      <Combobox
        {...args}
        items={items}
        itemToKey={(user) => user?.id}
        itemToString={(user) => (user ? user.name : "")}
        onInputValueChange={(inputValue) => {
          setItems(
            inputValue
              ? list.filter(
                  (user) =>
                    user !== actions.all &&
                    user !== actions.me &&
                    (user.email
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()) ||
                      user.name
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())),
                )
              : list,
          );
        }}
        onOpenChange={setOpen}
        onSelect={(value) => {
          if (value === actions.me) {
            setValues([users[0]]);
            setOpen(false);
          } else if (value === actions.all) {
            setList([actions.me, ...users]);
          } else {
            setValues((values) =>
              values.includes(value)
                ? values.filter((v) => v !== value)
                : [...values, value],
            );
          }
        }}
        open={open}
      >
        <ComboboxTrigger>
          <ComboboxValue
            placeholder="Select assignees"
            type="multiple"
            value={values}
          >
            <AvatarGroup>
              {values.slice(0, 3).map((user) => (
                <Avatar
                  colorScheme="purple"
                  key={user.id}
                  name={user.name}
                  size="xs"
                  src={user.src}
                />
              ))}
            </AvatarGroup>
            {!values.length ? null : values.length > 1 ? (
              <>{values.length} assignees</>
            ) : (
              values[0].name
            )}
          </ComboboxValue>
        </ComboboxTrigger>

        <ComboboxContent>
          <ComboboxInput placeholder="People..." />
          <ComboboxList>
            {items.map((user) => (
              <Fragment key={user.id}>
                {user === actions.all && <ComboboxSeparator />}

                {user === actions.me ? (
                  <ComboboxItem
                    addonBefore={
                      <Avatar
                        colorScheme="purple"
                        name={user.name}
                        size="xs"
                        src={user.src}
                      />
                    }
                    item={user}
                  >
                    Assign to me
                  </ComboboxItem>
                ) : user === actions.all ? (
                  <ComboboxItem icon={<IconUsers />} item={user}>
                    Show all users
                  </ComboboxItem>
                ) : (
                  <ComboboxCheckboxItem
                    active={values.includes(user)}
                    addonBefore={
                      <Avatar
                        colorScheme="purple"
                        name={user.name}
                        size="xs"
                        src={user.src}
                      />
                    }
                    item={user}
                  >
                    {user.name}
                  </ComboboxCheckboxItem>
                )}

                {user === actions.me && <ComboboxSeparator />}
              </Fragment>
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

export const Controlled: Story<(typeof books)[number]> = {
  render: function DefaultSelected(args) {
    const [items, setItems] = useState(books);
    const [open, setOpen] = useState(args.defaultOpen);
    const [values, setValues] = useState([books[9]]);

    return (
      <Combobox
        {...args}
        items={items}
        itemToKey={(book) => book?.id}
        itemToString={(book) => (book ? book.title : "")}
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
        onSelect={(value) => {
          setValues((values) =>
            values.includes(value)
              ? values.filter((v) => v !== value)
              : [...values, value],
          );
        }}
        open={open}
      >
        <ComboboxTrigger>
          <ComboboxValue
            placeholder="Select books"
            type="multiple"
            value={values}
          />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput placeholder="Books..." />
          <ComboboxList>
            {items.map((book) => (
              <ComboboxCheckboxItem
                active={values.includes(book)}
                item={book}
                key={book.id}
              >
                {book.title}
              </ComboboxCheckboxItem>
            ))}
          </ComboboxList>
          <ComboboxFooter>
            <Button onClick={() => setValues([])}>Clear All</Button>
            <Button appearance="primary" onClick={() => setOpen(false)}>
              Done
            </Button>
          </ComboboxFooter>
        </ComboboxContent>
      </Combobox>
    );
  },
};
