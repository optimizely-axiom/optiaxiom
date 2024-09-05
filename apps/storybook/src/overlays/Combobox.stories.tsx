import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Button, Flex, Text } from "@optiaxiom/react";
import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxTrigger,
  CommandCheckboxItem,
  CommandEmpty,
  CommandFooter,
  CommandList,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

type Story = StoryObj<typeof Combobox>;

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
      <ComboboxTrigger title="Assign people" />

      <ComboboxContent>
        <CommandEmpty
          alignItems="center"
          display="flex"
          justifyContent="center"
        >
          <Button m="4" w="full">
            +Add people
          </Button>
        </CommandEmpty>
        <CommandList>
          {users.map((user) => (
            <ComboboxItem
              key={user.id}
              keywords={[user.name, user.email]}
              onSelect={(currentValue) => {
                setSelectedUser(
                  currentValue === selectedUser ? "" : currentValue,
                );
                setOpen(false);
              }}
              value={user.name}
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
            </ComboboxItem>
          ))}
        </CommandList>
      </ComboboxContent>
    </Combobox>
  );
};

const items = [
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

const SingleSelectExample = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <Flex alignItems="center" flexDirection="column" gap="8">
      <Combobox defaultValue={selectedValue} onOpenChange={setOpen} open={open}>
        <ComboboxTrigger title="Select Item" />
        <ComboboxContent w="240">
          <CommandEmpty
            alignItems="center"
            display="flex"
            justifyContent="center"
          >
            <Button m="4" w="full">
              +Add tag
            </Button>
          </CommandEmpty>
          <CommandList style={{ maxHeight: "30dvh" }}>
            {items.map((item) => (
              <ComboboxItem
                key={item}
                onSelect={() => {
                  handleSelect(item);
                  setOpen(false);
                }}
                value={item}
              >
                {item}
              </ComboboxItem>
            ))}
          </CommandList>
        </ComboboxContent>
      </Combobox>
      <Text>Selected value: {selectedValue || "None"}</Text>
    </Flex>
  );
};

const MultipleSelectExample = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <Flex alignItems="center" flexDirection="column" gap="8">
      <Combobox
        mode="multiple"
        onOpenChange={setOpen}
        open={open}
        value={selectedValues}
      >
        <ComboboxTrigger maxW="full" title="Select Items" w="240" />
        <ComboboxContent w="240">
          <CommandList style={{ maxHeight: "30dvh" }}>
            {items.map((item) => (
              <CommandCheckboxItem
                key={item}
                onCheckedChange={() => handleSelect(item)}
                value={item}
              >
                {item}
              </CommandCheckboxItem>
            ))}
          </CommandList>
          <CommandFooter>
            <Button onClick={() => setSelectedValues([])}>Clear All</Button>
            <Button appearance="primary" onClick={() => setOpen(false)}>
              Done
            </Button>
          </CommandFooter>
        </ComboboxContent>
      </Combobox>
      <Text>
        Selected values:{" "}
        {selectedValues.length > 0 ? selectedValues.join(", ") : "None"}
      </Text>
    </Flex>
  );
};

export const Basic: Story = {
  render: SingleSelectExample,
};

export const MultiSelect: Story = {
  render: MultipleSelectExample,
};

export const People: Story = {
  render: PeopleSelector,
};

const itemsWithDisabled = [
  { disabled: false, value: "English" },
  { disabled: false, value: "French" },
  { disabled: true, value: "German" },
  { disabled: false, value: "Spanish" },
  { disabled: false, value: "Portuguese" },
  { disabled: true, value: "Russian" },
  { disabled: false, value: "Japanese" },
  { disabled: false, value: "Korean" },
  { disabled: false, value: "Chinese (Simplified)" },
  { disabled: true, value: "Italian" },
];

const DisabledItemsExample = () => {
  const [singleSelectedValue, setSingleSelectedValue] = useState<string>("");
  const [multiSelectedValues, setMultiSelectedValues] = useState<string[]>([]);
  const [singleOpen, setSingleOpen] = useState(false);
  const [multiOpen, setMultiOpen] = useState(false);

  const handleSingleSelect = (value: string) => {
    setSingleSelectedValue(value);
    setSingleOpen(false);
  };

  const handleMultiSelect = (value: string) => {
    setMultiSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <Flex alignItems="center" flexDirection="column" gap="16">
      <Flex alignItems="center" flexDirection="column" gap="8">
        <Text fontWeight="500">Single Select with Disabled Items</Text>
        <Combobox
          defaultValue={singleSelectedValue}
          onOpenChange={setSingleOpen}
          open={singleOpen}
        >
          <ComboboxTrigger title="Select Language" />
          <ComboboxContent w="240">
            <CommandList style={{ maxHeight: "30dvh" }}>
              {itemsWithDisabled.map((item) => (
                <ComboboxItem
                  disabled={item.disabled}
                  key={item.value}
                  onSelect={() => handleSingleSelect(item.value)}
                  value={item.value}
                >
                  {item.value} {item.disabled && "(Disabled)"}
                </ComboboxItem>
              ))}
            </CommandList>
          </ComboboxContent>
        </Combobox>
        <Text>Selected value: {singleSelectedValue || "None"}</Text>
      </Flex>

      <Flex alignItems="center" flexDirection="column" gap="8">
        <Text fontWeight="500">Multiple Select with Disabled Items</Text>
        <Combobox
          mode="multiple"
          onOpenChange={setMultiOpen}
          open={multiOpen}
          value={multiSelectedValues}
        >
          <ComboboxTrigger
            maxDisplayedItems={3}
            maxW="full"
            title="Select Languages"
            w="240"
          />
          <ComboboxContent w="240">
            <CommandList style={{ maxHeight: "30dvh" }}>
              {itemsWithDisabled.map((item) => (
                <CommandCheckboxItem
                  disabled={item.disabled}
                  key={item.value}
                  onCheckedChange={() => handleMultiSelect(item.value)}
                  value={item.value}
                >
                  {item.value} {item.disabled && "(Disabled)"}
                </CommandCheckboxItem>
              ))}
            </CommandList>
            <CommandFooter>
              <Button onClick={() => setMultiSelectedValues([])}>
                Clear All
              </Button>
              <Button appearance="primary" onClick={() => setMultiOpen(false)}>
                Done
              </Button>
            </CommandFooter>
          </ComboboxContent>
        </Combobox>
        <Text>
          Selected values:{" "}
          {multiSelectedValues.length > 0
            ? multiSelectedValues.join(", ")
            : "None"}
        </Text>
      </Flex>
    </Flex>
  );
};

export const DisabledItems: Story = {
  render: DisabledItemsExample,
};
