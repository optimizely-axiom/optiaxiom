import { Button, Flex, Text } from "@optiaxiom/react";
import { Autocomplete, type Option } from "@optiaxiom/react/unstable";
import { type Meta, type StoryObj } from "@storybook/react";
import { useState } from "react";

export default {
  argTypes: {
    onSelect: { action: "selected" },
  },
  component: Autocomplete,
} as Meta;

type Story = StoryObj<typeof Autocomplete>;

const fruitOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
  { label: "Elderberry", value: "elderberry" },
];

export const Basic: Story = {
  // args: {
  //   items: fruitOptions,
  // },
  render: function Basic() {
    const [isLoading, setLoading] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const [value, setValue] = useState<Option>();
    return (
      <Flex>
        <Button onClick={() => setLoading((prev) => !prev)}>
          Toggle loading
        </Button>
        <Button onClick={() => setDisabled((prev) => !prev)}>
          Toggle disabled
        </Button>
        <Autocomplete
          disabled={isDisabled}
          emptyMessage="No resulsts."
          isLoading={isLoading}
          onValueChange={setValue}
          options={fruitOptions}
          placeholder="Find something"
          value={value}
        />
        <Text>Current value: {value ? value?.label : "No value selected"}</Text>
        <Text>Loading state: {isLoading ? "true" : "false"}</Text>
        <Text>Disabled: {isDisabled ? "true" : "false"}</Text>
      </Flex>
    );
  },
};

// export const WithManyOptions: Story = {
//   args: {
//     onSelect: (option) => console.log("Selected:", option),
//     options: [
//       ...fruitOptions,
//       { label: "Fig", value: "fig" },
//       { label: "Grape", value: "grape" },
//       { label: "Honeydew", value: "honeydew" },
//       { label: "Kiwi", value: "kiwi" },
//       { label: "Lemon", value: "lemon" },
//       { label: "Mango", value: "mango" },
//       { label: "Nectarine", value: "nectarine" },
//       { label: "Orange", value: "orange" },
//     ],
//     placeholder: "Select a fruit",
//   },
// };

// export const CustomPlaceholder: Story = {
//   args: {
//     onSelect: (option) => console.log("Selected:", option),
//     options: fruitOptions,
//     placeholder: "Type to search fruits...",
//   },
// };

// export const NoOptions: Story = {
//   args: {
//     options: [],
//     placeholder: "No fruits available",
//   },
// };

// export const WithInitialInputValue: Story = {
//   render: function WithInitialInputValue(args) {
//     return (
//       <Autocomplete
//         {...args}
//         items={fruitOptions}
//         placeholder="Select a fruit"
//       />
//     );
//   },
// };

// export const AsyncOptions: Story = {
//   render: function AsyncOptions(args) {
//     const [options, setOptions] = useState<{ label: string; value: string }[]>(
//       [],
//     );
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//       setLoading(true);
//       // Simulate an API call
//       setTimeout(() => {
//         setOptions(fruitOptions);
//         setLoading(false);
//       }, 1500);
//     }, []);

//     return (
//       <Autocomplete
//         {...args}
//         onSelect={(option) => console.log("Selected:", option)}
//         options={options}
//         placeholder={loading ? "Loading fruits..." : "Select a fruit"}
//       />
//     );
//   },
// };
