import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Flex, Search, Text } from "@optiaxiom/react";
import {
  Combobox,
  ComboboxContent,
  ComboboxTrigger,
  Command,
  CommandCheckboxItem,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

type Story = StoryObj<typeof Combobox>;

// const withTemplate = (args: ComponentPropsWithoutRef<typeof Combobox>) => {
//   return (
//     <Combobox {...args}>
//       <ComboboxTrigger />
//       <ComboboxContent w="240" />
//     </Combobox>
//   );
// };

export default {
  component: Combobox,
} as Meta<typeof Combobox>;
const users = [
  {
    email: "",
    id: "AM",
    name: "Assign to me",
    src: "https://images.unsplash.com/photo-1715029005043-e88d219a3c48?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
  {
    email: "david.nguyen@example.com",
    id: "DN",
    name: "David Nguyen",
  },
];

const PeopleSelector = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Combobox onOpenChange={setOpen} open={open}>
      <ComboboxTrigger
        title={
          selectedUser
            ? users.find((u) => u.id === selectedUser)?.name
            : "Assign to"
        }
      ></ComboboxTrigger>
      <ComboboxContent asChild>
        <Command style={{ maxWidth: "280px", width: "280px" }}>
          <CommandInput asChild>
            <Search />
          </CommandInput>
          <CommandSeparator />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {users.map((user) => (
              <CommandItem
                key={user.id}
                keywords={[user.name, user.email]}
                onSelect={(currentValue) => {
                  setSelectedUser(
                    currentValue === selectedUser ? "" : currentValue,
                  );
                  setOpen(false);
                }}
                value={user.id}
              >
                <Flex alignItems="center" flexDirection="row" gap="8" p="2">
                  <Avatar
                    colorScheme="blue"
                    name={user.name}
                    size="md"
                    src={user.src}
                  />
                  <Flex flexDirection="column" gap="4">
                    <Text>{user.name}</Text>
                    {user.email && <Text color="dark.200">{user.email}</Text>}
                  </Flex>
                </Flex>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </ComboboxContent>
    </Combobox>
  );
};

export const People: Story = {
  render: PeopleSelector,
};

const items = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

const SingleSelectExample = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <Flex alignItems="center" flexDirection="column" gap="8">
      <Combobox onOpenChange={setOpen} onSelect={handleSelect} open={open}>
        <ComboboxTrigger title="Select Item" />
        <ComboboxContent w="240">
          <CommandEmpty />
          <CommandList>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => {
                  handleSelect(item.value);
                  setOpen(false);
                }}
                value={item.value}
              >
                {item.label}
              </CommandItem>
            ))}
          </CommandList>
          <Flex>Clear All</Flex>
        </ComboboxContent>
      </Combobox>
      <Text>Selected value: {selectedValue || "None"}</Text>
    </Flex>
  );
};

const MultipleSelectExample = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <Flex alignItems="center" flexDirection="column" gap="8">
      <Combobox onSelect={handleSelect}>
        <ComboboxTrigger title="Select Items" />
        <ComboboxContent w="240">
          {items.map((item) => (
            <CommandCheckboxItem
              checked={selectedValues.includes(item.value)}
              key={item.value}
              onCheckedChange={() => handleSelect(item.value)}
              value={item.value}
            >
              {item.label}
            </CommandCheckboxItem>
          ))}
        </ComboboxContent>
      </Combobox>
      <Text>
        Selected values:{" "}
        {selectedValues.length > 0 ? selectedValues.join(", ") : "None"}
      </Text>
    </Flex>
  );
};

export const SingleSelect: Story = {
  render: SingleSelectExample,
};

export const MultipleSelect: Story = {
  render: MultipleSelectExample,
};
