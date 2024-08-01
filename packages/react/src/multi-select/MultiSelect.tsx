import { CommandSeparator } from "cmdk";
import {
  type ComponentPropsWithRef,
  forwardRef,
  useMemo,
  useState,
} from "react";

import type { BoxProps } from "../box";
import type { PopoverContent } from "../popover-content";

import { Badge } from "../badge";
import { Button } from "../button";
import { Combobox } from "../combobox";
import { ComboboxContent } from "../combobox-content";
import { ComboboxTrigger } from "../combobox-trigger";
import { Command } from "../command";
import { CommandEmpty } from "../command-empty";
import { CommandInput } from "../command-input";
import { CommandItem } from "../command-item";
import { CommandList } from "../command-list";
import { Flex } from "../flex";
import { IconX } from "../icons/IconX";
import { Search } from "../search";
import { Text } from "../text";

// const books = [
//   {
//     email: "",
//     id: "AM",
//     name: "Assign to me",
//     src: "https://images.unsplash.com/photo-1715029005043-e88d219a3c48?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     email: "emily.chen@example.com",
//     id: "EC",
//     name: "Emily Chen",
//     src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     email: "michael.rodriguez@example.com",
//     id: "MR",
//     name: "Michael Rodriguez",
//   },
//   {
//     email: "sarah.patel@example.com",
//     id: "SP",
//     name: "Sarah Patel",
//   },
//   {
//     email: "david.nguyen@example.com",
//     id: "DN",
//     name: "David Nguyen",
//     src: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
// ];

type MultiSelectComboboxProps = BoxProps<
  typeof PopoverContent,
  {
    // defaultSelectedItems?: Item[];
  } & ComponentPropsWithRef<typeof Command>
>;

const books = [
  { author: "Harper Lee", id: "book-1", title: "To Kill a Mockingbird" },
  { author: "Lev Tolstoy", id: "book-2", title: "War and Peace" },
  { author: "Fyodor Dostoyevsy", id: "book-3", title: "The Idiot" },
  { author: "Oscar Wilde", id: "book-4", title: "A Picture of Dorian Gray" },
  { author: "George Orwell", id: "book-5", title: "1984" },
  { author: "Jane Austen", id: "book-6", title: "Pride and Prejudice" },
  { author: "Marcus Aurelius", id: "book-7", title: "Meditations" },
  {
    author: "Fyodor Dostoevsky",
    id: "book-8",
    title: "The Brothers Karamazov",
  },
  { author: "Lev Tolstoy", id: "book-9", title: "Anna Karenina" },
  { author: "Fyodor Dostoevsky", id: "book-10", title: "Crime and Punishment" },
];
const initialSelectedItems = [books[0], books[1]];

function getFilteredBooks(
  selectedItems: { author: string; id: string; title: string }[],
  inputValue: string,
) {
  const lowerCasedInputValue = inputValue.toLowerCase();

  return books.filter(function filterBook(book) {
    return (
      !selectedItems.includes(book) &&
      (book.title.toLowerCase().includes(lowerCasedInputValue) ||
        book.author.toLowerCase().includes(lowerCasedInputValue))
    );
  });
}

export const MultiSelectCombobox = forwardRef<
  HTMLDivElement,
  MultiSelectComboboxProps
>(({ children, ...props }, ref) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);
  console.log(selectedItems);
  const items = useMemo(
    () => getFilteredBooks(selectedItems, inputValue),
    [selectedItems, inputValue],
  );

  return (
    <Combobox>
      <ComboboxTrigger asChild>
        <Flex
          alignItems="center"
          border="1"
          flexDirection="row"
          flexWrap="wrap"
          gap="4"
          px="4"
          py="8"
          ref={ref}
          rounded="md"
          w="288"
        >
          {selectedItems.map((item) => (
            <Badge
              alignItems="center"
              colorScheme="information"
              display="flex"
              gap="4"
              key={item.id}
            >
              {item.title}
              <Button
                aria-label={`Remove ${item} option`}
                aria-roledescription="button to remove option"
                icon={<IconX />}
                // onClick={() => onValueChange(item)}
                // onMouseDown={mousePreventDefault}
                size="sm"
              />
            </Badge>
          ))}
          <Text> Assign people</Text>
        </Flex>
      </ComboboxTrigger>
      <ComboboxContent asChild {...props} ref={ref}>
        <Command style={{ maxWidth: "280px", width: "280px" }}>
          <CommandInput asChild>
            <Search onChange={(e) => setInputValue(e.target.value)} />
          </CommandInput>
          <CommandSeparator />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {items.map((item) => (
              <CommandItem
                key={item.id}
                keywords={[item.title, item.author]}
                onSelect={() => {
                  setSelectedItems([...selectedItems, item]);
                }}
                value={item.id}
              >
                <Flex alignItems="center" flexDirection="row" gap="8" p="2">
                  <Text>{item.title}</Text>
                </Flex>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </ComboboxContent>
    </Combobox>
  );
});

MultiSelectCombobox.displayName = "@optiaxiom/react/MultiSelectCombobox";
