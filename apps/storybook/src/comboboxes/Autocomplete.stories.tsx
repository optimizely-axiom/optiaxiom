import type { Meta, StoryObj } from "@storybook/react";

import { Field, Flex, Text } from "@optiaxiom/react";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmptyItem,
  AutocompleteItem,
  AutocompleteItemIndicator,
  AutocompleteList,
  AutocompleteTrigger,
} from "@optiaxiom/react/unstable";
import { expect, screen, userEvent } from "@storybook/test";
import { useEffect, useState } from "react";

type Story<T = string> = StoryObj<typeof Autocomplete<T>>;

export default {
  args: {
    defaultOpen: true,
  },
  component: Autocomplete,
  parameters: {
    useOverlayDecorator: true,
  },
} as Meta<typeof Autocomplete>;

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
  render: function Basic(args) {
    const [items, setItems] = useState(languages);

    return (
      <Autocomplete
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
        <AutocompleteTrigger placeholder="Search a Language" w="208" />

        <AutocompleteContent>
          <AutocompleteList>
            {(item: string) => (
              <AutocompleteItem addonAfter={<AutocompleteItemIndicator />}>
                {item}
              </AutocompleteItem>
            )}
          </AutocompleteList>
          <AutocompleteEmptyItem>No result found</AutocompleteEmptyItem>
        </AutocompleteContent>
      </Autocomplete>
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
  play: async ({ canvas }) => {
    const input = canvas.getByRole("combobox");
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.click(
      await screen.findByRole("option", { name: "French" }),
    );
    await userEvent.type(
      canvas.getByPlaceholderText("Search a Language"),
      "Ger",
    );
    await userEvent.tab();
    await expect(screen.getByPlaceholderText("Search a Language")).toHaveValue(
      "French",
    );

    await userEvent.click(input);
    await userEvent.click(await screen.findByText("Urdu"));
    await userEvent.click(input);
    await expect(
      await screen.findByRole("option", { name: "Urdu" }),
    ).toHaveAttribute("data-selected");
  },
};

export const Disabled: Story = {
  ...Basic,
  args: {
    defaultOpen: false,
    disabled: true,
    value: "English",
  },
};

const books = [
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

export const Controlled: Story<(typeof books)[number]> = {
  render: function DefaultSelected(args) {
    const [items, setItems] = useState(books);
    const [value, setValue] = useState<(typeof books)[number] | null>(books[9]);

    return (
      <Flex alignItems="center">
        <Autocomplete
          {...args}
          isItemDisabled={(book) => book.disabled}
          items={items}
          itemToKey={(book) => book?.id}
          itemToString={(book) => book?.title ?? ""}
          onInputValueChange={(inputValue) => {
            setItems(
              books.filter(
                (book) =>
                  !inputValue ||
                  book.title.includes(inputValue) ||
                  book.author.includes(inputValue),
              ),
            );
          }}
          onValueChange={setValue}
          value={value}
        >
          <AutocompleteTrigger placeholder="Search a book" />

          <AutocompleteContent>
            <AutocompleteList>
              {(item: (typeof books)[number]) => (
                <AutocompleteItem addonAfter={<AutocompleteItemIndicator />}>
                  {item.title}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>

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

    const fetchData = (query: string) => {
      setIsLoading(true);
      setTimeout(() => {
        const filteredLanguages = languages.filter((lang) =>
          lang.toLowerCase().includes(query.toLowerCase()),
        );
        setItems(filteredLanguages);
        setIsLoading(false);
      }, 500);
    };

    return (
      <Autocomplete
        {...args}
        items={items}
        onInputValueChange={(value) => fetchData(value)}
      >
        <AutocompleteTrigger placeholder="Search a language" w="208" />
        <AutocompleteContent loading={isLoading}>
          <AutocompleteList>
            {(item) => <AutocompleteItem>{item}</AutocompleteItem>}
          </AutocompleteList>
          <AutocompleteEmptyItem>No results found</AutocompleteEmptyItem>
        </AutocompleteContent>
      </Autocomplete>
    );
  },
};
