import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Button, Flex, Search, Text } from "@optiaxiom/react";
import {
  Combobox,
  ComboboxContent,
  ComboboxTrigger,
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@optiaxiom/react/unstable";
import { type ComponentPropsWithoutRef, useState } from "react";

type Story = StoryObj<typeof Combobox>;

const withTemplate = (args: ComponentPropsWithoutRef<typeof Combobox>) => {
  return (
    <Combobox {...args}>
      <ComboboxTrigger />
      <ComboboxContent w="240" />
    </Combobox>
  );
};

export default {
  component: Combobox,
} as Meta<typeof Combobox>;

export const Basic: Story = {
  args: {
    defaultValue: "en",
    items: [
      { label: "English", value: "en" },
      { label: "French", value: "fr" },
      { label: "German", value: "de" },
      { label: "Spanish", value: "es" },
      { label: "Portuguese", value: "pt" },
      { label: "Russian", value: "ru" },
      { label: "Japanese", value: "ja" },
      { label: "Korean", value: "ko" },
      { label: "Chinese", value: "zh" },
    ],
  },
  render: withTemplate,
};

export const NoDefaultValue: Story = {
  args: {
    items: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Cherry", value: "cherry" },
      { label: "Date", value: "date" },
      { label: "Elderberry", value: "elderberry" },
    ],
  },
  render: withTemplate,
};

export const CustomEmptyResult: Story = {
  args: {
    items: [
      { label: "Red", value: "red" },
      { label: "Blue", value: "blue" },
      { label: "Green", value: "green" },
    ],
  },
  render: (args) => (
    <Combobox {...args}>
      <ComboboxTrigger />
      <ComboboxContent emptyResult="No colors found" side="top" w="240" />
    </Combobox>
  ),
};

export const LongList: Story = {
  args: {
    items: Array.from({ length: 50 }, (_, i) => ({
      label: `Item ${i + 1}`,
      value: `item-${i + 1}`,
    })),
  },
  render: withTemplate,
};

export const CustomTrigger: Story = {
  args: {
    items: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
    ],
  },
  render: (args) => (
    <Combobox {...args}>
      <ComboboxTrigger asChild>
        <Button appearance="primary">Select Size</Button>
      </ComboboxTrigger>
      <ComboboxContent side="top" w="240" />
    </Combobox>
  ),
};

const CallBack = (args: ComponentPropsWithoutRef<typeof Combobox>) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  return (
    <Flex alignItems="center">
      <Combobox
        {...args}
        onSelect={(value) => {
          setSelectedValue(value);
        }}
      >
        <ComboboxTrigger />
        <ComboboxContent side="top" w="240" />
      </Combobox>
      <Text>Selected value: {selectedValue || "None"}</Text>
    </Flex>
  );
};

export const WithOnSelectCallback: Story = {
  args: {
    items: [
      { label: "Option A", value: "a" },
      { label: "Option B", value: "b" },
      { label: "Option C", value: "c" },
    ],
  },
  render: CallBack,
};

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
