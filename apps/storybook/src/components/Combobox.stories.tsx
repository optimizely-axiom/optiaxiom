import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarGroup, Box, Field } from "@optiaxiom/react";
import {
  Combobox,
  ComboboxContent,
  type ComboboxOption,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { IconSend, IconUserCircle } from "@tabler/icons-react";
import { useMemo, useRef, useState } from "react";

type Story = StoryObj<typeof Combobox>;

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
    const [value, setValue] = useState("Bangla");

    return (
      <Combobox
        {...args}
        items={useMemo(
          () =>
            languages.map<ComboboxOption>((language) => ({
              execute: () => setValue(language),
              label: language,
              selected: value === language,
            })),
          [value],
        )}
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
        defaultInputVisible
        items={useMemo(
          () =>
            items.map<ComboboxOption>((language) => ({
              execute: () => setValue(language),
              label: language,
              selected: () => value === language,
              visible: true,
            })),
          [items, value],
        )}
        loading={isLoading}
        onInputValueChange={fetchData}
      >
        <ComboboxTrigger>Set language</ComboboxTrigger>
        <ComboboxContent />
      </Combobox>
    );
  },
};

export const Multiple: Story = {
  render: function Multiple(args) {
    const [value, setValue] = useState<string[]>([]);

    return (
      <Combobox
        {...args}
        items={useMemo(
          () =>
            languages.map<ComboboxOption>((language) => ({
              execute: () =>
                setValue((values) =>
                  values.includes(language)
                    ? values.filter((v) => v !== language)
                    : [...values, language],
                ),
              label: language,
              multi: true,
              selected: () => value.includes(language),
            })),
          [value],
        )}
      >
        <ComboboxTrigger>Set languages</ComboboxTrigger>
        <ComboboxContent />
      </Combobox>
    );
  },
};

const inviteGroup = {
  name: "Invite",
  separator: true,
};
const userGroup = {
  name: "Users",
  separator: true,
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

export const People: Story = {
  render: function People() {
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = useState<typeof users>([]);

    return (
      <Combobox
        defaultOpen
        inputValue={inputValue}
        items={useMemo<ComboboxOption[]>(
          () => [
            {
              addon: <IconUserCircle size={20} />,
              execute: () => setValue([users[0]]),
              label: "Assign to me",
              visible: () => !inputValue,
            },
            ...users.map<ComboboxOption>((item) => ({
              addon: (
                <Avatar
                  colorScheme="purple"
                  name={item.name}
                  size="xs"
                  src={item.src}
                />
              ),
              execute: () =>
                setValue((value) =>
                  value.includes(item)
                    ? [...value].filter((v) => v !== item)
                    : [item, ...value],
                ),
              group: userGroup,
              label: item.name,
              multi: true,
              selected: () => value.includes(item),
              visible: () =>
                item.email.toLowerCase().includes(inputValue.toLowerCase()) ||
                item.name.toLowerCase().includes(inputValue.toLowerCase()),
            })),
            {
              addon: <IconSend size={20} />,
              group: inviteGroup,
              label: "Invite user",
              visible: () => !!inputValue,
            },
          ],
          [inputValue, value],
        )}
        onInputValueChange={setInputValue}
      >
        <ComboboxTrigger>
          {value.length ? (
            <>
              <AvatarGroup>
                {value.slice(0, 3).map((user) => (
                  <Avatar
                    colorScheme="purple"
                    key={user.id}
                    name={user.name}
                    size="xs"
                    src={user.src}
                  />
                ))}
              </AvatarGroup>
              {value.length > 1 ? <>{value.length} assignees</> : value[0].name}
            </>
          ) : (
            "Assign"
          )}
        </ComboboxTrigger>
        <ComboboxContent />
      </Combobox>
    );
  },
};

const books = [
  { id: "book-5", keywords: "George Orwell", label: "1984" },
  {
    disabledReason: () => "sample reason",
    id: "book-4",
    keywords: "Oscar Wilde",
    label: "A Picture of Dorian Gray",
  },
  {
    keywords: "Lev Tolstoy",

    id: "book-9",
    label: "Anna Karenina",
  },
  {
    keywords: "Fyodor Dostoevsky",

    id: "book-10",
    label: "Crime and Punishment",
  },
  {
    keywords: "Marcus Aurelius",

    id: "book-7",
    label: "Meditations",
  },
  {
    disabledReason: () => "another reason",
    id: "book-6",
    keywords: "Jane Austen",
    label: "Pride and Prejudice",
  },
  {
    disabledReason: () => "one more reason",
    id: "book-8",
    keywords: "Fyodor Dostoevsky",
    label: "The Brothers Karamazov",
  },
  {
    keywords: "Fyodor Dostoyevsky",

    id: "book-3",
    label: "The Idiot",
  },
  {
    keywords: "Harper Lee",

    id: "book-1",
    label: "To Kill a Mockingbird",
  },
  {
    keywords: "Lev Tolstoy",

    id: "book-2",
    label: "War and Peace",
  },
];

export const Controlled: Story = {
  render: function DefaultSelected(args) {
    const [value, setValue] = useState<string[]>([books[9].id]);

    return (
      <Combobox
        {...args}
        defaultInputVisible
        items={useMemo(
          () =>
            books.map<ComboboxOption>((book) => ({
              ...book,
              execute: () =>
                setValue((value) =>
                  value.includes(book.id)
                    ? value.filter((v) => v !== book.id)
                    : [...value, book.id],
                ),
              multi: true,
              selected: () => value.includes(book.id),
            })),
          [value],
        )}
      >
        <ComboboxTrigger>Select books</ComboboxTrigger>
        <ComboboxContent />
      </Combobox>
    );
  },
};

const groups = [
  { name: "Fruits", visible: true },
  { name: "Vegetables", visible: true },
  { name: "Meats", visible: true },
];

const foods = [
  { group: groups[0], label: "Apple" },
  { group: groups[0], label: "Banana" },
  { group: groups[0], label: "Blueberry" },
  { group: groups[0], label: "Grapes" },
  { group: groups[0], label: "Pineapple" },
  { group: groups[1], label: "Aubergine" },
  { group: groups[1], label: "Broccoli" },
  { group: groups[1], label: "Carrot" },
  { group: groups[1], label: "Courgette" },
  { group: groups[1], label: "Leek" },
  { group: groups[2], label: "Beef" },
  { group: groups[2], label: "Chicken" },
  { group: groups[2], label: "Lamb" },
  { group: groups[2], label: "Pork" },
];

export const Group: Story = {
  render: function Group(args) {
    const [value, setValue] = useState<{ label: string }>();

    return (
      <Combobox
        {...args}
        items={useMemo(
          () =>
            foods.map<ComboboxOption>((food) => ({
              ...food,
              execute: () => setValue(food),
              selected: () => value === food,
            })),
          [value],
        )}
      >
        <ComboboxTrigger>Select an item</ComboboxTrigger>
        <ComboboxContent />
      </Combobox>
    );
  },
};
