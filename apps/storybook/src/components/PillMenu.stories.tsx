import type { Meta, StoryObj } from "@storybook/react-vite";

import { Field, Flex, type MenuOption } from "@optiaxiom/react";
import {
  PillMenu,
  PillMenuContent,
  PillMenuTrigger,
} from "@optiaxiom/react/unstable";
import { type ComponentPropsWithoutRef, useMemo, useState } from "react";

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
    const [value, setValue] = useState(args.defaultValue);

    return (
      <PillMenu
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
      />
    );
  },
} as Meta<PillMenuStoryProps>;

export const Basic: Story = {};

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
    const [value, setValue] = useState(args.defaultValue);

    return (
      <PillMenu
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
      />
    );
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
    const [value, setValue] = useState(args.defaultValue);

    return (
      <PillMenu
        {...args}
        options={useMemo(
          () =>
            languages.map<MenuOption>((language) => ({
              disabledReason: language === "Afrikaans" ? "Required" : undefined,
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
      />
    );
  },
};
