import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxListbox,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  return (
    <Combobox defaultItems={colors}>
      <ComboboxTrigger>Select color</ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search..." />
        <ComboboxListbox />
      </ComboboxContent>
    </Combobox>
  );
}
