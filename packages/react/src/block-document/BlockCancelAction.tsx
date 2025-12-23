import { type ReactNode, useState } from "react";

import type { BlockCancelActionElement } from "./types";

import { Button } from "../button";
import { Flex } from "../flex";
import { Input } from "../input";

export type BlockCancelActionProps = Omit<
  BlockCancelActionElement,
  "$type" | "children"
> & {
  /**
   * Button label content
   */
  children: ReactNode;
  /**
   * Callback when the cancel action is submitted with user input
   */
  onSubmit?: (text: string) => void;
};

export function BlockCancelAction({
  children,
  onSubmit,
}: BlockCancelActionProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection="row" gap="8">
        <Input
          aria-label="Cancellation reason"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your response..."
          value={inputValue}
        />
        <Button type="submit">{children}</Button>
      </Flex>
    </form>
  );
}

BlockCancelAction.displayName = "@optiaxiom/react/BlockCancelAction";
