import { Button, Flex, Input } from "@optiaxiom/react";
import { type ReactNode, useState } from "react";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";

export type ProteusCancelActionProps = {
  children?: ReactNode;
  /**
   * Placeholder text for the text input field
   */
  placeholder?: string;
};

export function ProteusCancelAction({
  children,
  placeholder = "Tell Opal what to do instead",
}: ProteusCancelActionProps) {
  const { onEvent } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusCancelAction",
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

ProteusCancelAction.displayName = "@optiaxiom/proteus/ProteusCancelAction";
