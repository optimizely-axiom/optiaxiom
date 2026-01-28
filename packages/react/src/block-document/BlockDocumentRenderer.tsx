import { useState } from "react";

import { Card } from "../card";
import { Flex } from "../flex";
import { useEffectEvent } from "../hooks";
import { BlockDocumentProvider } from "./BlockDocumentContext";
import { BlockElement } from "./BlockElement";
import { type BlockDocument, BlockDocumentSchema } from "./schemas";

export type BlockDocumentRendererProps = {
  /**
   * Current form data (flat object, FormData-like)
   */
  data?: Record<string, string>;
  /**
   * The Block document to render
   */
  element: BlockDocument;
  /**
   * Callback when user submits the CancelAction input
   */
  onCancelAction?: (prompt: string) => void;
  /**
   * Callback when form fields change
   */
  onDataChange?: (data: Record<string, string>) => void;
  /**
   * Callback when user clicks a Block.Action button
   */
  onToolCall?: (toolName: string) => void;
  /**
   * Whether form is readonly
   */
  readOnly?: boolean;
};

export function BlockDocumentRenderer({
  data = {},
  element: elementProp,
  onCancelAction,
  onDataChange,
  onToolCall,
  readOnly = false,
}: BlockDocumentRendererProps) {
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});

  const result = BlockDocumentSchema.safeParse(elementProp);
  if (!result.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        `[optiaxiom][react][BlockElement] Invalid block element:`,
        result.error,
      );
    }
  }

  return (
    <BlockDocumentProvider
      data={data}
      onCancelAction={onCancelAction}
      onDataChange={useEffectEvent((name: string, value: string) => {
        onDataChange?.({ ...data, [name]: value });
      })}
      onEvent={useEffectEvent(
        (
          event:
            | {
                action: "setVisibility";
                params: Record<string, boolean>;
                when?: string;
              }
            | {
                tool: string;
              },
          value?: string,
        ) => {
          if ("tool" in event) {
            onToolCall?.(event.tool);
          } else if (event.action === "setVisibility") {
            if (event.when && !(value || "").match(new RegExp(event.when))) {
              return;
            }
            setVisibility(event.params);
          }
        },
      )}
      readOnly={readOnly}
      visibility={visibility}
    >
      <Card alignItems="stretch" flexDirection="column" gap="16" w="full">
        {result.success && (
          <>
            <BlockElement element={result.data.children} />
            {result.data.actions &&
              result.data.actions.length > 0 &&
              !readOnly && (
                <Flex gap="16" w="full">
                  <BlockElement element={result.data.actions} />
                </Flex>
              )}
          </>
        )}
      </Card>
    </BlockDocumentProvider>
  );
}

BlockDocumentRenderer.displayName = "@optiaxiom/react/BlockDocumentRenderer";
