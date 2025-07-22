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
