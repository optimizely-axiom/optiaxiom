import {
  Heading,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@optiaxiom/react";

export function App() {
  return (
    <Popover>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverContent>
        <Heading level="6">Popover content</Heading>
        <Text>This is the popover content</Text>
      </PopoverContent>
    </Popover>
  );
}
