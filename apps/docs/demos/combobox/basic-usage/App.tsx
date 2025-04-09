import {
  Combobox,
  ComboboxContent,
  type ComboboxOption,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";

const colors: ComboboxOption[] = [
  { label: "Ocean" },
  { label: "Blue" },
  { label: "Purple" },
  { label: "Red" },
  { label: "Orange" },
  { label: "Yellow" },
];

export function App() {
  return (
    <Combobox items={colors}>
      <ComboboxTrigger>Select color</ComboboxTrigger>
      <ComboboxContent />
    </Combobox>
  );
}
