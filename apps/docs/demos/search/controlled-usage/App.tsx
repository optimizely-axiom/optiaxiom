import { Button, Flex, Search } from "@optiaxiom/react";
import { useRef, useState } from "react";

export function App() {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Flex>
      <Search
        onChange={(event) => setValue(event.target.value)}
        ref={ref}
        value={value}
        w="240"
      />

      <Flex flexDirection="row">
        <Button
          onClick={() => {
            setValue("sample");
            ref.current?.focus();
          }}
        >
          Set Value
        </Button>

        <Button disabled={!value} onClick={() => setValue("")}>
          Reset
        </Button>
      </Flex>
    </Flex>
  );
}
