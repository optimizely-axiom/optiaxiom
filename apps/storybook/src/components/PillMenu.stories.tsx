import type { Meta, StoryObj } from "@storybook/react-vite";

import { Field, type MenuOption } from "@optiaxiom/react";
import {
  PillMenu,
  PillMenuContent,
  PillMenuTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo, useState } from "react";

type Story = StoryObj<typeof PillMenu>;

export default {
  args: {
    defaultOpen: true,
  },
  component: PillMenu,
} as Meta<typeof PillMenu>;

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
    const [value, setValue] = useState(
      languages.filter((_, index) => index % 6 === 0),
    );

    return (
      <Field label="Language" maxW="md" mb="80" style={{ width: "100vw" }}>
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
        >
          <PillMenuTrigger aria-label="Add language" />
          <PillMenuContent />
        </PillMenu>
      </Field>
    );
  },
};

export const Disabled: Story = {
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
    const [value, setValue] = useState(
      languages.filter((_, index) => index % 6 === 0),
    );

    return (
      <Field label="Language" maxW="md" mb="80" style={{ width: "100vw" }}>
        <PillMenu
          {...args}
          options={useMemo(
            () =>
              languages.map<MenuOption>((language) => ({
                disabledReason:
                  language === "Afrikaans" ? "Required" : undefined,
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
          <PillMenuTrigger aria-label="Add language" />
          <PillMenuContent />
        </PillMenu>
      </Field>
    );
  },
};
