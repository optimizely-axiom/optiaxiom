import { Autocomplete } from "@optiaxiom/react/unstable";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  argTypes: {
    onSelect: { action: "selected" },
  },
  component: Autocomplete,
} as Meta;

type Story = StoryObj<typeof Autocomplete>;

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
export const Basic: Story = {
  args: {
    items: items,
  },
};
