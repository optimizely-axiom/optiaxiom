import type { Meta, StoryObj } from "@storybook/react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

type Story = StoryObj<typeof Combobox>;

export default {
  component: Combobox,
  decorators: (Story) => (
    <Box w="320">
      <Story />
    </Box>
  ),
  parameters: {
    useOverlayDecorator: true,
  },
} as Meta<typeof Combobox>;

const languages = [
  "Afrikaans",
  "Arabic",
  "Bengali",
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
    const [items, setItems] = useState(languages);

    return (
      <Combobox
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
        <ComboboxTrigger>
          <ComboboxValue placeholder="Select a language" />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput placeholder="Languages..." />
          <ComboboxList>
            {(item) => (
              <ComboboxItem addonAfter={<ComboboxItemIndicator />}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
          <ComboboxEmpty>No result found</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    );
  },
};
