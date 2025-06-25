import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Avatar,
  AvatarGroup,
  Box,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Field,
  Flex,
  Input,
} from "@optiaxiom/react";
import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
} from "@optiaxiom/react/unstable";
import {
  IconPencil,
  IconSend,
  IconSparkles,
  IconTrash,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
import { useMemo, useRef, useState } from "react";
import { expect, screen, userEvent, waitFor } from "storybook/test";

type Story = StoryObj<typeof Menu>;

export default {
  args: {
    defaultOpen: true,
  },
  component: Menu,
  decorators: (Story) => (
    <Box w="224">
      <Story />
    </Box>
  ),
} as Meta<typeof Menu>;

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
      <Menu
        {...args}
        options={useMemo(
          () =>
            languages.map<MenuOption>((language) => ({
              execute: () => setValue(language),
              label: language,
              selected: value === language,
            })),
          [value],
        )}
      >
        <MenuTrigger>{value || "Set language"}</MenuTrigger>
        <MenuContent />
      </Menu>
    );
  },
};

export const WithLabel: Story = {
  ...Basic,
  decorators: (Story) => (
    <Field
      label="Label"
      // Apply a bottom margin to force popover to appear below the label for
      // snapshot testing
      mb="80"
    >
      <Story />
    </Field>
  ),
};

export const AsyncLoading: Story = {
  play: async () => {
    await waitFor(() => expect(screen.getByRole("combobox")).toHaveFocus());
    await userEvent.keyboard("b");
    await waitFor(() => expect(screen.getByRole("combobox")).toHaveValue("b"));
  },
  render: function AsyncLoading(args) {
    const [items, setItems] = useState<string[]>();
    const [value, setValue] = useState("Bangla");

    const [isLoading, setIsLoading] = useState(false);
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
      <Menu
        {...args}
        empty={items ? undefined : "Start typing to search..."}
        inputVisible="always"
        loading={isLoading}
        onInputValueChange={fetchData}
        options={useMemo(
          () =>
            (items ?? []).map<MenuOption>((language) => ({
              execute: () => setValue(language),
              label: language,
              selected: () => value === language,
              visible: true,
            })),
          [items, value],
        )}
      >
        <MenuTrigger>Set language</MenuTrigger>
        <MenuContent />
      </Menu>
    );
  },
};

export const AsyncLoadingSpinner: Story = {
  play: async () => {
    await waitFor(() => expect(screen.getByRole("combobox")).toHaveFocus());
    await userEvent.keyboard("b");
    await waitFor(() => expect(screen.getByRole("combobox")).toHaveValue("b"));
  },
  render: function AsyncLoading(args) {
    const [items, setItems] = useState<string[]>();
    const [value, setValue] = useState("Bangla");

    const [isLoading, setIsLoading] = useState<"spinner">();
    const timerRef = useRef(0);
    const fetchData = (query: string) => {
      setIsLoading("spinner");
      clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        const filteredLanguages = languages.filter((lang) =>
          lang.toLowerCase().includes(query.toLowerCase()),
        );
        setItems(filteredLanguages);
        setIsLoading(undefined);
      }, 3000);
    };

    return (
      <Menu
        {...args}
        empty={items ? undefined : "Start typing to search..."}
        inputVisible="always"
        loading={isLoading}
        onInputValueChange={fetchData}
        options={useMemo(
          () =>
            (items ?? []).map<MenuOption>((language) => ({
              execute: () => setValue(language),
              label: language,
              selected: () => value === language,
              visible: true,
            })),
          [items, value],
        )}
      >
        <MenuTrigger>Set language</MenuTrigger>
        <MenuContent />
      </Menu>
    );
  },
};

export const Multiple: Story = {
  render: function Multiple(args) {
    const [value, setValue] = useState<string[]>([]);

    return (
      <Menu
        {...args}
        options={useMemo(
          () =>
            languages.map<MenuOption>((language) => ({
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
        <MenuTrigger>Set languages</MenuTrigger>
        <MenuContent />
      </Menu>
    );
  },
};

const inviteGroup = {
  label: "Invite",
  separator: true,
} satisfies MenuOption["group"];
const userGroup = {
  label: "Users",
  separator: true,
} satisfies MenuOption["group"];

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
      <Menu
        defaultOpen
        inputValue={inputValue}
        onInputValueChange={setInputValue}
        options={useMemo<MenuOption[]>(
          () => [
            {
              addon: <IconUserCircle size={20} />,
              execute: () => setValue([users[0]]),
              label: "Assign to me",
              visible: () => !inputValue,
            },
            ...users.map<MenuOption>((item) => ({
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
      >
        <MenuTrigger>
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
        </MenuTrigger>
        <MenuContent />
      </Menu>
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
      <Menu
        {...args}
        inputVisible="always"
        options={useMemo(
          () =>
            books.map<MenuOption>((book) => ({
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
        <MenuTrigger>Select books</MenuTrigger>
        <MenuContent />
      </Menu>
    );
  },
};

const groups = [
  { label: "Fruits" },
  { label: "Vegetables" },
  { label: "Meats" },
] satisfies Array<MenuOption["group"]>;

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
      <Menu
        {...args}
        options={useMemo(
          () =>
            foods.map<MenuOption>((food) => ({
              ...food,
              execute: () => setValue(food),
              selected: () => value === food,
            })),
          [value],
        )}
      >
        <MenuTrigger>Select an item</MenuTrigger>
        <MenuContent />
      </Menu>
    );
  },
};

export const Nested: Story = {
  args: {
    children: (
      <>
        <MenuTrigger aria-label="File options" />
        <MenuContent />
      </>
    ),
    options: [
      { label: "Create Task" },
      { label: "Hidden item", visible: false },
      {
        hiddenInSearchContext: true,
        label: "Add to",
        subOptions: () => [
          {
            group: { hidden: true, label: "", priority: -1 },
            label: "Favorite",
          },
          { label: "Collection" },
          { label: "Campaign" },
        ],
      },
      {
        label: "Download as",
        subOptions: [
          {
            label: "PNG",
            subOptions: [{ label: "Original" }, { label: "Custom" }],
          },
          { label: "JPG" },
          { label: "PDF" },
        ],
      },
    ],
  },
  play: async () => {
    await waitFor(async () => {
      return await expect(screen.getByRole("dialog")).toHaveAttribute(
        "data-state",
        "open",
      );
    });
    await userEvent.hover(screen.getByRole("option", { name: "Add to" }));
    await waitFor(
      async () =>
        await expect(
          screen.getByRole("option", { name: "Favorite" }),
        ).toBeVisible(),
    );
  },
};

export const NestedAndSearchable: Story = {
  args: {
    children: (
      <>
        <MenuTrigger />
        <MenuContent />
      </>
    ),
    inputVisible: "always",
    options: [
      { label: "Create Task" },
      { label: "Hidden item", visible: false },
      {
        label: "Add to",
        subOptions: [
          { label: "Favorite" },
          { label: "Collection" },
          { label: "Campaign" },
        ],
        subOptionsInputVisible: true,
      },
      {
        label: "Download as",
        subOptions: [
          {
            label: "PNG",
            subOptions: [{ label: "Original" }, { label: "Custom" }],
          },
          { label: "JPG" },
          { label: "PDF" },
        ],
      },
    ],
  },
  play: async () => {
    await waitFor(async () => {
      return await expect(screen.getByRole("dialog")).toHaveAttribute(
        "data-state",
        "open",
      );
    });
    await userEvent.hover(screen.getByRole("option", { name: "Add to" }));
    await waitFor(
      async () =>
        await expect(
          screen.getByRole("option", { name: "Favorite" }),
        ).toBeVisible(),
    );
    await userEvent.keyboard("c");
    await waitFor(
      async () =>
        await expect(
          screen.queryByRole("option", { name: "Favorite" }),
        ).not.toBeInTheDocument(),
    );
  },
};

export const Addons: Story = {
  render: (args) => {
    return (
      <Menu
        {...args}
        options={[
          {
            addon: <IconPencil size={16} />,
            label: "Edit",
          },
          {
            addon: <IconTrash size={16} />,
            intent: "danger",
            label: "Delete",
          },
        ]}
      >
        <MenuTrigger>Menu</MenuTrigger>
        <MenuContent />
      </Menu>
    );
  },
};

export const WithDialog: Story = {
  play: async () => {
    await waitFor(async () => {
      return await expect(screen.getByRole("dialog")).toHaveAttribute(
        "data-state",
        "open",
      );
    });
    await userEvent.click(screen.getByRole("option", { name: "Delete" }));
    await waitFor(
      async () =>
        await expect(
          screen.queryByRole("textbox", { name: "Label" }),
        ).toHaveFocus(),
    );
  },
  render: function WithDialog(args) {
    const [open, setOpen] = useState(false);

    return (
      <Flex>
        <Menu
          {...args}
          options={[
            {
              addon: <IconPencil size={16} />,
              label: "Edit",
            },
            {
              addon: <IconTrash size={16} />,
              execute: () => setOpen(true),
              intent: "danger",
              label: "Delete",
            },
          ]}
        >
          <MenuTrigger>Menu</MenuTrigger>
          <MenuContent />
        </Menu>

        <Dialog onOpenChange={setOpen} open={open}>
          <DialogContent>
            <DialogHeader>Testing input autoFocus</DialogHeader>
            <DialogBody>
              <Field label="Label">
                <Input autoFocus placeholder="Should be focused" />
              </Field>
            </DialogBody>
            <DialogFooter>
              <DialogClose appearance="primary">Close</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Flex>
    );
  },
};

export const SwitchItem: Story = {
  render: function SwitchItem(args) {
    const [enabled, setEnabled] = useState(true);

    return (
      <Menu
        {...args}
        options={[
          {
            addon: <IconUser size={16} />,
            label: "My Profile",
          },
          {
            addon: <IconSparkles size={16} />,
            execute: () => setEnabled(!enabled),
            label: "New UI (Beta)",
            selected: enabled,
            switch: true,
          },
        ]}
      >
        <MenuTrigger>Menu</MenuTrigger>
        <MenuContent />
      </Menu>
    );
  },
};
