import { useState } from "react";

import type { BlockCancelActionProps } from "./schemas";

import { Button } from "../button";
import { Flex } from "../flex";
import { Input } from "../input";
import { useBlockDocumentContext } from "./BlockDocumentContext";
import { BlockElement } from "./BlockElement";

export function BlockCancelAction({
  children,
  placeholder = "Tell Opal what to do instead",
}: BlockCancelActionProps) {
  const { onCancelAction } = useBlockDocumentContext(
    "@optiaxiom/react/BlockCancelAction",
  );

  const [inputValue, setInputValue] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onCancelAction?.(inputValue);
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
          {children && <BlockElement element={children} />}
        </Button>
      </Flex>
    </form>
  );
}

BlockCancelAction.displayName = "@optiaxiom/react/BlockCancelAction";
