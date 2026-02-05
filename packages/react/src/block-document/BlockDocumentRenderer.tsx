import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef, useState } from "react";

import { Box } from "../box";
import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from "../disclosure";
import { Flex } from "../flex";
import { Group } from "../group";
import { useEffectEvent } from "../hooks";
import { Text } from "../text";
import { BlockDocumentProvider } from "./BlockDocumentContext";
import { BlockElement } from "./BlockElement";
import { type BlockDocument, BlockDocumentSchema } from "./schemas";

export type BlockDocumentRendererProps = Pick<
  ComponentPropsWithoutRef<typeof Disclosure>,
  "defaultOpen" | "onOpenChange" | "open"
> & {
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
  defaultOpen = true,
  element: elementProp,
  onCancelAction,
  onDataChange,
  onOpenChange,
  onToolCall,
  open: openProp,
  readOnly = false,
}: BlockDocumentRendererProps) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });
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
      <Disclosure
        bg="bg.default"
        border="1"
        borderColor="border.tertiary"
        onOpenChange={setOpen}
        open={open}
        p="16"
        rounded="lg"
      >
        {result.success && (
          <>
            <DisclosureTrigger chevronPosition="end" py="0">
              <Group fontSize="sm" gap="8">
                <Box bg="bg.accent.subtle" rounded="xs" size="20" />
                <Text fontWeight="500">{result.data.appName}</Text>
                <Text color="fg.secondary">{result.data.title}</Text>
              </Group>
            </DisclosureTrigger>
            <DisclosureContent
              alignItems="stretch"
              display="flex"
              flexDirection="column"
              gap="16"
              pt="16"
            >
              <BlockElement element={result.data.body} />
              {result.data.actions &&
                result.data.actions.length > 0 &&
                !readOnly && (
                  <Flex gap="16" w="full">
                    <BlockElement element={result.data.actions} />
                  </Flex>
                )}
            </DisclosureContent>
          </>
        )}
      </Disclosure>
    </BlockDocumentProvider>
  );
}

BlockDocumentRenderer.displayName = "@optiaxiom/react/BlockDocumentRenderer";
