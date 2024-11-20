import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarGroup, Box, Button, Field } from "@optiaxiom/react";
import {
  Combobox,
  ComboboxCheckboxItem,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxFooter,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxRadioItem,
  ComboboxScrollArea,
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
        onItemSelect={(value) => {
          setValue(value);
          setOpen(false);
        }}
        onOpenChange={setOpen}
        open={open}
        value={value ? [value] : []}
      >
        <ComboboxTrigger>
          <ComboboxValue placeholder="Select a language" />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput placeholder="Languages..." />
          <ComboboxListbox>
            {items.map((item) => (
              <ComboboxRadioItem item={item} key={item}>
                {item}
              </ComboboxRadioItem>
            ))}
          </ComboboxListbox>
          {items.length === 0 && <ComboboxEmpty>No result found</ComboboxEmpty>}
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
    const [value, setValue] = useState<string[]>([]);

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
        onItemSelect={(value) => {
          setValue((values) =>
            values.includes(value)
              ? values.filter((v) => v !== value)
              : [...values, value],
          );
        }}
        onOpenChange={setOpen}
        open={open}
        value={value}
      >
        <ComboboxTrigger>
          <ComboboxValue placeholder="Select a language" />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput placeholder="Languages..." />
          <ComboboxListbox>
            {items.map((item) => (
              <ComboboxCheckboxItem item={item} key={item}>
                {item}
              </ComboboxCheckboxItem>
            ))}
          </ComboboxListbox>
          {items.length === 0 && <ComboboxEmpty>No result found</ComboboxEmpty>}
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
    const [value, setValue] = useState(new Set<(typeof users)[number]>());

    useEffect(() => {
      if (!open) {
        const list = value.size
          ? [actions.me, ...value, actions.all]
          : [actions.me, ...users];
        setList(list);
      }
    }, [open, value]);
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
        onItemSelect={(value) => {
          if (value === actions.me) {
            setValue(new Set([users[0]]));
            setOpen(false);
          } else if (value === actions.all) {
            setList([actions.me, ...users]);
          } else {
            setValue((values) =>
              values.has(value)
                ? new Set([...values].filter((v) => v !== value))
                : new Set([value, ...values]),
            );
          }
        }}
        onOpenChange={setOpen}
        open={open}
        value={value}
      >
        <ComboboxTrigger>
          <ComboboxValue placeholder="Select assignees">
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
            {!value.size ? null : value.size > 1 ? (
              <>{value.size} assignees</>
            ) : (
              [...value][0].name
            )}
          </ComboboxValue>
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
  author?: string;
  disabled?: boolean;
  id: string;
  title?: string;
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

const controlledActions: { clear: Book; done: Book } = {
  clear: {
    id: "clear",
  },
  done: {
    id: "done",
  },
};

export const Controlled: Story<Book> = {
  render: function DefaultSelected(args) {
    const [items, setItems] = useState(books);
    const [open, setOpen] = useState(args.defaultOpen);
    const [value, setValue] = useState<Book[]>([books[9]]);

    return (
      <Combobox
        {...args}
        isItemDisabled={(item) =>
          item === controlledActions.clear && value.length === 0
        }
        items={[...items, controlledActions.clear, controlledActions.done]}
        itemToKey={(book) => book?.id}
        itemToString={(book) => (book ? String(book.title) : "")}
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
        onItemSelect={(value) => {
          if (value === controlledActions.clear) {
            setValue([]);
          } else if (value === controlledActions.done) {
            setOpen(false);
          } else {
            setValue((values) =>
              values.includes(value)
                ? values.filter((v) => v !== value)
                : [...values, value],
            );
          }
        }}
        onOpenChange={setOpen}
        open={open}
        value={value}
      >
        <ComboboxTrigger>
          <ComboboxValue placeholder="Select books" />
        </ComboboxTrigger>

        <ComboboxContent>
          <ComboboxInput placeholder="Books..." />

          <ComboboxListbox>
            <ComboboxScrollArea>
              {items.map((book) => (
                <ComboboxCheckboxItem item={book} key={book.id}>
                  {book.title}
                </ComboboxCheckboxItem>
              ))}
            </ComboboxScrollArea>

            <ComboboxFooter>
              <ComboboxItem asChild item={controlledActions.clear}>
                <Button disabled={value.length === 0}>Clear All</Button>
              </ComboboxItem>

              <ComboboxItem asChild item={controlledActions.done}>
                <Button appearance="primary">Done</Button>
              </ComboboxItem>
            </ComboboxFooter>
          </ComboboxListbox>
        </ComboboxContent>
      </Combobox>
    );
  },
};

const fruits = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"];
const vegetables = ["Aubergine", "Broccoli", "Carrot", "Courgette", "Leek"];
const meats = ["Beef", "Chicken", "Lamb", "Pork"];
const combinedFoodList = [...fruits, ...vegetables, ...meats];

export const Group: Story = {
  render: function Group(args) {
    const [open, setOpen] = useState(args.defaultOpen);
    const [items, setItems] = useState(combinedFoodList);
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

    return (
      <Combobox
        {...args}
        items={items}
        onInputValueChange={(inputValue) => {
          setItems(
            combinedFoodList.filter(
              (food) =>
                !inputValue ||
                food.toLowerCase().includes(inputValue.toLowerCase()),
            ),
          );
          setSearchInput(inputValue);
        }}
        onItemSelect={(value) => {
          setValue(value);
          setOpen(false);
        }}
        onOpenChange={setOpen}
        open={open}
        value={value ? [value] : []}
      >
        <ComboboxTrigger>
          <ComboboxValue placeholder="Select an item" />
        </ComboboxTrigger>

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
