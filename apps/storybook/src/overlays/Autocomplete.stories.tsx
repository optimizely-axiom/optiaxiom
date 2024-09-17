import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "@optiaxiom/react";
import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteOption,
  AutocompleteOptions,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

type Story = StoryObj<typeof Autocomplete>;

export default {
  component: Autocomplete,
} as Meta<typeof Autocomplete>;

type People = {
  id: number;
  name: string;
};

const people: People[] = [
  { id: 1, name: "Tom Cook" },
  { id: 2, name: "Wade Cooper" },
  { id: 3, name: "Tanya Fox" },
  { id: 4, name: "Arlene Mccoy" },
  { id: 5, name: "Devon Webb" },
];

export const Basic: Story = {
  render: function Basic() {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(people[1]);

    const filteredPeople =
      query === ""
        ? people
        : people.filter((person) => {
            return person.name.toLowerCase().includes(query.toLowerCase());
          });
    return (
      <Autocomplete
        onChange={(value: People) => setSelected(value)}
        onClose={() => setQuery("")}
        value={selected}
      >
        <AutocompleteInput />
        <AutocompleteOptions>
          {filteredPeople.map((person) => (
            <AutocompleteOption key={person.id} value={person}>
              <Box>{person.name}</Box>
            </AutocompleteOption>
          ))}
        </AutocompleteOptions>
      </Autocomplete>
    );
  },
};
