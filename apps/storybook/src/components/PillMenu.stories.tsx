import type { Meta, StoryObj } from "@storybook/react-vite";

import { Field, Flex, type MenuOption } from "@optiaxiom/react";
import {
  PillMenu,
  PillMenuContent,
  PillMenuTrigger,
} from "@optiaxiom/react/unstable";
import {
  type ComponentPropsWithoutRef,
  useMemo,
  useRef,
  useState,
} from "react";

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

type PillMenuStoryProps = Omit<
  ComponentPropsWithoutRef<typeof PillMenu>,
  "defaultValue"
> & {
  defaultValue: string[];
};

type Story = StoryObj<PillMenuStoryProps>;

export default {
  args: {
    children: (
      <>
        <PillMenuTrigger aria-label="Add language" />
        <PillMenuContent />
      </>
    ),
    defaultOpen: true,
    defaultValue: languages.filter((_, index) => index % 6 === 0),
  },
  component: PillMenu,
  decorators: (Story, { parameters }) =>
    parameters.axiom.includeField ? (
      <Field label="Language" maxW="md" mb="80" style={{ width: "100vw" }}>
        <Story />
      </Field>
    ) : (
      <Story />
    ),
  parameters: {
    axiom: {
      includeField: true,
    },
  },
  render: function Render(args) {
    const [selected, setSelected] = useState(args.defaultValue);
    const options = useMemo(
      () =>
        languages.map<MenuOption>((language) => ({
          execute: () =>
            setSelected((values) =>
              values.includes(language)
                ? values.filter((v) => v !== language)
                : [...values, language],
            ),
          label: language,
          multi: true,
          selected: () => selected.includes(language),
        })),
      [selected],
    );
    const value = useMemo(
      () =>
        options.filter((option) => selected.includes(option.label as string)),
      [options, selected],
    );

    return <PillMenu {...args} options={options} value={value} />;
  },
} as Meta<PillMenuStoryProps>;

export const Basic: Story = {};

export const AsyncLoading: Story = {
  args: {
    defaultValue: ["Bangla"],
  },
  render: function Render(args) {
    const [items, setItems] = useState<string[]>();
    const [selected, setSelected] = useState(args.defaultValue);

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

    const options = useMemo(
      () =>
        (items ?? []).map<MenuOption>((language) => ({
          execute: () =>
            setSelected((values) =>
              values.includes(language)
                ? values.filter((v) => v !== language)
                : [...values, language],
            ),
          label: language,
          multi: true,
          selected: () => selected.includes(language),
          skipFilterScoring: true,
          visible: true,
        })),
      [items, selected],
    );
    const value = useMemo<MenuOption[]>(
      () =>
        selected.map((language) => ({
          execute: () =>
            setSelected((values) => values.filter((v) => v !== language)),
          label: language,
          multi: true,
          skipFilterScoring: true,
        })),
      [selected],
    );

    return (
      <PillMenu
        {...args}
        empty={items ? undefined : "Start typing to search..."}
        inputVisible="always"
        loading={isLoading}
        onInputValueChange={fetchData}
        options={options}
        value={value}
      />
    );
  },
};

export const Sizes: Story = {
  parameters: {
    axiom: {
      includeField: false,
    },
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.defaultValue);
    const options = useMemo(
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
    );

    return (
      <Flex>
        <Field label="Language" maxW="md" mb="80" style={{ width: "100vw" }}>
          <PillMenu {...args} options={options}>
            <PillMenuTrigger aria-label="Add language" size="lg" />
            <PillMenuContent />
          </PillMenu>
        </Field>

        <Field label="Language" maxW="md" mb="80" style={{ width: "100vw" }}>
          <PillMenu {...args} options={options}>
            <PillMenuTrigger aria-label="Add language" size="md" />
            <PillMenuContent />
          </PillMenu>
        </Field>
      </Flex>
    );
  },
};

export const Empty: Story = {
  args: {
    defaultOpen: false,
    defaultValue: [],
  },
};

export const Readonly: Story = {
  args: {
    children: (
      <>
        <PillMenuTrigger aria-label="Add language" readOnly />
        <PillMenuContent />
      </>
    ),
    defaultOpen: false,
  },
  render: function Render(args) {
    const [selected, setSelected] = useState(args.defaultValue);
    const options = useMemo(
      () =>
        languages.map<MenuOption>((language) => ({
          execute: () =>
            setSelected((values) =>
              values.includes(language)
                ? values.filter((v) => v !== language)
                : [...values, language],
            ),
          label: language,
          multi: true,
          selected: () => selected.includes(language),
        })),
      [selected],
    );
    const value = useMemo(
      () =>
        options.filter((option) => selected.includes(option.label as string)),
      [options, selected],
    );

    return <PillMenu {...args} options={options} value={value} />;
  },
};

export const DisabledItems: Story = {
  // play: async () => {
  //   const disabledPill = screen.getByRole("button", { name: "Afrikaans" });
  //   await userEvent.hover(disabledPill);
  //   await expect(
  //     await screen.findByRole("tooltip", { name: "Required" }),
  //   ).toBeInTheDocument();
  //   await userEvent.click(disabledPill);
  //   await expect(screen.getByRole("dialog")).toHaveAttribute(
  //     "data-state",
  //     "open",
  //   );
  //   await expect(
  //     screen.getByRole("option", { name: "Afrikaans" }),
  //   ).toHaveAttribute("aria-disabled", "true");

  //   await userEvent.keyboard("{Escape}");

  //   await expect(disabledPill).toHaveFocus();
  //   await userEvent.keyboard("{Backspace}");
  //   await expect(disabledPill).toBeInTheDocument();

  //   await userEvent.keyboard("{ArrowRight}");
  //   const normalPill = screen.getByRole("button", { name: "Croatian" });
  //   await expect(normalPill).toHaveFocus();
  //   await userEvent.keyboard("{Backspace}");

  //   await expect(
  //     screen.queryByRole("button", { name: "Croatian" }),
  //   ).not.toBeInTheDocument();
  // },

  render: function Disabled(args) {
    const [selected, setSelected] = useState(args.defaultValue);
    const options = useMemo(
      () =>
        languages.map<MenuOption>((language) => ({
          disabledReason: language === "Afrikaans" ? "Required" : undefined,
          execute: () =>
            setSelected((values) =>
              values.includes(language)
                ? values.filter((v) => v !== language)
                : [...values, language],
            ),
          label: language,
          multi: true,
          selected: () => selected.includes(language),
        })),
      [selected],
    );
    const value = useMemo(
      () =>
        options.filter((option) => selected.includes(option.label as string)),
      [options, selected],
    );

    return <PillMenu {...args} options={options} value={value} />;
  },
};
