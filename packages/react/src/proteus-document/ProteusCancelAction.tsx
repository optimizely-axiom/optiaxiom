import { useState } from "react";

import { Button } from "../button";
import { Flex } from "../flex";
import { Input } from "../input";
import { useProteusDocumentContext } from "./ProteusDocumentContext";

export function ProteusCancelAction({
  children,
  placeholder = "Tell Opal what to do instead",
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  placeholder?: string;
}) {
  const { onEvent } = useProteusDocumentContext(
    "@optiaxiom/react/ProteusCancelAction",
  );

  const [inputValue, setInputValue] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void onEvent?.({ message: inputValue });
      }}
    >
      <Flex flexDirection="row" gap="16" w="full">
        <Input
          aria-label="Cancellation reason"
          onChange={(event) => setInputValue(event.target.value)}
          placeholder={placeholder}
          size="lg"
          value={inputValue}
          w="full"
        />
        <Button size="lg" type="submit">
          {children}
        </Button>
      </Flex>
    </form>
  );
}

ProteusCancelAction.displayName = "@optiaxiom/react/ProteusCancelAction";
