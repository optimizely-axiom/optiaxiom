import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarGroup, Box, Button, Field } from "@optiaxiom/react";
import {
  Combobox,
  ComboboxCheckboxItem,
  ComboboxContent,
  ComboboxFooter,
  ComboboxGroup,
  ComboboxInput,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxRadioItem,
  ComboboxSeparator,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { IconUsers } from "@tabler/icons-react";
import { Fragment, useEffect, useRef, useState } from "react";

type Story<T = string> = StoryObj<typeof Combobox<T>>;

export default {
  args: {
    defaultOpen: true,
  },
  component: Combobox,
  decorators: (Story) => (
    <Box w="224">
      <Story />
    </Box>
  ),
} as Meta<typeof Combobox>;

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
  render: function Basic(args) {
    const [open, setOpen] = useState(args.defaultOpen);
    const [value, setValue] = useState("Bangla");

    return (
      <Combobox
        {...args}
        defaultItems={languages}
        isItemSelected={(item) => item === value}
        onItemSelect={(value) => {
          setValue(value);
          setOpen(false);
        }}
        onOpenChange={setOpen}
        open={open}
      >
        <ComboboxTrigger>{value || "Set language"}</ComboboxTrigger>
        <ComboboxContent />
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

export const AsyncLoading: Story = {
  render: function AsyncLoading(args) {
    const [open, setOpen] = useState(args.defaultOpen);
    const [items, setItems] = useState(languages);
    const [value, setValue] = useState("Bangla");

    const [isLoading, setIsLoading] = useState(true);
    const timerRef = useRef(0);
    const fetchData = (query: string) => {
      setIsLoading(true);
      clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        const filteredLanguages = languages.filter((lang) =>
          lang.toLowerCase().includes(query.toLowerCase()),
        );
        setItems(filteredLanguages);
        setIsLoading(false);
      }, 3000);
    };

    return (
      <Combobox
        {...args}
        isItemSelected={(item) => item === value}
        items={items}
        onInputValueChange={fetchData}
        onItemSelect={(value) => {
          setValue(value);
          setOpen(false);
        }}
        onOpenChange={setOpen}
        open={open}
      >
        <ComboboxTrigger>Set language</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput placeholder="Languages..." />
          <ComboboxListbox loading={isLoading}>
            {items.map((item) => (
              <ComboboxRadioItem item={item} key={item}>
                {item}
              </ComboboxRadioItem>
            ))}
          </ComboboxListbox>
        </ComboboxContent>
      </Combobox>
    );
  },
};

export const Multiple: Story = {
  render: function Multiple(args) {
    const [open, setOpen] = useState(args.defaultOpen);
    const [value, setValue] = useState<string[]>([]);

    return (
      <Combobox
        {...args}
        defaultItems={languages}
        isItemSelected={(item) => value.includes(item)}
        onItemSelect={(value) => {
          setValue((values) =>
            values.includes(value)
              ? values.filter((v) => v !== value)
              : [...values, value],
          );
        }}
        onOpenChange={setOpen}
        open={open}
      >
        <ComboboxTrigger>Set languages</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput placeholder="Languages..." />
          <ComboboxListbox>
            {(item) => (
              <ComboboxCheckboxItem item={item} key={item}>
                {item}
              </ComboboxCheckboxItem>
            )}
          </ComboboxListbox>
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
    src: "https://i.pravatar.cc/150?img=10",
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
    const [value, setValue] = useState(new Set<(typeof users)[number]>());

    useEffect(() => {
      if (open) {
        const list = value.size
          ? [actions.me, ...value, actions.all]
          : [actions.me, ...users];
        setList(list);
      }
    }, [open, value]);

    return (
      <Combobox
        {...args}
        isItemSelected={(item) => value.has(item)}
        items={items}
        itemToLabel={(user) => user.name}
        onInputValueChange={(inputValue) => {
          setItems(
            inputValue
              ? users.filter(
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
        onItemSelect={(value) => {
          if (value === actions.me) {
            setValue(new Set([users[0]]));
            setOpen(false);
          } else if (value === actions.all) {
            setItems([actions.me, ...users]);
          } else {
            setValue((values) =>
              values.has(value)
                ? new Set([...values].filter((v) => v !== value))
                : new Set([value, ...values]),
            );
          }
        }}
        onOpenChange={(open) => {
          if (open) {
            setItems(list);
          }
          setOpen(open);
        }}
        open={open}
      >
        <ComboboxTrigger>
          {value.size ? (
            <>
              <AvatarGroup>
                {[...value].slice(0, 3).map((user) => (
                  <Avatar
                    colorScheme="purple"
                    key={user.id}
                    name={user.name}
                    size="xs"
                    src={user.src}
                  />
                ))}
              </AvatarGroup>
              {value.size > 1 ? (
                <>{value.size} assignees</>
              ) : (
                [...value][0].name
              )}
            </>
          ) : (
            "Assign"
          )}
        </ComboboxTrigger>

        <ComboboxContent>
          <ComboboxInput placeholder="People..." />
          <ComboboxListbox>
            {items.map((user) => (
              <Fragment key={user.id}>
                {user === actions.all && <ComboboxSeparator />}

                {user === actions.me ? (
                  <ComboboxRadioItem
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
                  </ComboboxRadioItem>
                ) : user === actions.all ? (
                  <ComboboxRadioItem icon={<IconUsers />} item={user}>
                    Show all users
                  </ComboboxRadioItem>
                ) : (
                  <ComboboxCheckboxItem
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
          </ComboboxListbox>
        </ComboboxContent>
      </Combobox>
    );
  },
};

type Book = {
  author: string;
  disabled?: boolean;
  id: string;
  title: string;
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

export const Controlled: Story<Book> = {
  render: function DefaultSelected(args) {
    const [open, setOpen] = useState(args.defaultOpen);
    const [value, setValue] = useState<Book[]>([books[9]]);

    return (
      <Combobox
        {...args}
        defaultFilter={(book, inputValue) =>
          book.title.includes(inputValue.toLowerCase()) ||
          book.author.includes(inputValue.toLowerCase())
        }
        defaultItems={books}
        isItemSelected={(item) => value.includes(item)}
        itemToLabel={(book) => book.title}
        onItemSelect={(value) => {
          setValue((values) =>
            values.includes(value)
              ? values.filter((v) => v !== value)
              : [...values, value],
          );
        }}
        onOpenChange={setOpen}
        open={open}
      >
        <ComboboxTrigger>Select books</ComboboxTrigger>

        <ComboboxContent>
          <ComboboxInput placeholder="Books..." />

          <ComboboxListbox>
            {(book) => (
              <ComboboxCheckboxItem item={book} key={book.id}>
                {book.title}
              </ComboboxCheckboxItem>
            )}
          </ComboboxListbox>

          <ComboboxFooter>
            <Button disabled={value.length === 0} onClick={() => setValue([])}>
              Clear All
            </Button>
            <Button appearance="primary" onClick={() => setOpen(false)}>
              Done
            </Button>
          </ComboboxFooter>
        </ComboboxContent>
      </Combobox>
    );
  },
};

const fruits = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"];
const vegetables = ["Aubergine", "Broccoli", "Carrot", "Courgette", "Leek"];
const meats = ["Beef", "Chicken", "Lamb", "Pork"];

export const Group: Story = {
  render: function Group(args) {
    const [open, setOpen] = useState(args.defaultOpen);
    const [searchInput, setSearchInput] = useState("");
    const [value, setValue] = useState("");

    const getFilteredItems = (items: string[]) => {
      return items.filter(
        (food) =>
          !searchInput ||
          food.toLowerCase().includes(searchInput.toLowerCase()),
      );
    };

    const filteredFruits = getFilteredItems(fruits);
    const filteredVegetables = getFilteredItems(vegetables);
    const filteredMeats = getFilteredItems(meats);
    const items = [...filteredFruits, ...filteredVegetables, ...filteredMeats];

    return (
      <Combobox
        {...args}
        isItemSelected={(item) => item === value}
        items={items}
        onInputValueChange={setSearchInput}
        onItemSelect={(value) => {
          setValue(value);
          setOpen(false);
        }}
        onOpenChange={setOpen}
        open={open}
      >
        <ComboboxTrigger>Select an item</ComboboxTrigger>

        <ComboboxContent>
          <ComboboxInput placeholder="Search foods..." />
          <ComboboxListbox>
            {filteredFruits.length > 0 && (
              <ComboboxGroup>
                <ComboboxLabel>Fruits</ComboboxLabel>
                {filteredFruits.map((item, index) => (
                  <ComboboxRadioItem item={item} key={`fruit-${index}`}>
                    {item}
                  </ComboboxRadioItem>
                ))}
              </ComboboxGroup>
            )}

            {filteredVegetables.length > 0 && (
              <ComboboxGroup>
                <ComboboxLabel>Vegetables</ComboboxLabel>
                {filteredVegetables.map((item, index) => (
                  <ComboboxRadioItem item={item} key={`vegetable-${index}`}>
                    {item}
                  </ComboboxRadioItem>
                ))}
              </ComboboxGroup>
            )}

            {filteredMeats.length > 0 && (
              <ComboboxGroup>
                <ComboboxLabel>Meats</ComboboxLabel>
                {filteredMeats.map((item, index) => (
                  <ComboboxRadioItem item={item} key={`meat-${index}`}>
                    {item}
                  </ComboboxRadioItem>
                ))}
              </ComboboxGroup>
            )}
          </ComboboxListbox>
        </ComboboxContent>
      </Combobox>
    );
  },
};
