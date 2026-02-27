import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef } from "react";

import { Box } from "../box";
import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from "../disclosure";
import { Group } from "../group";
import { Heading } from "../heading";
import { useEffectEvent } from "../hooks";
import { Text } from "../text";
import { ProteusDocumentProvider } from "./ProteusDocumentContext";
import { ProteusElement } from "./ProteusElement";
import { type ProteusDocument, ProteusDocumentSchema } from "./schemas";

export type ProteusDocumentRendererProps = Pick<
  ComponentPropsWithoutRef<typeof Disclosure>,
  "defaultOpen" | "onOpenChange" | "open"
> & {
  /**
   * Whether block is collapsible
   */
  collapsible?: boolean;
  /**
   * Current form data (flat object, FormData-like)
   */
  data?: Record<string, string>;
  /**
   * The Proteus document to render
   */
  element: ProteusDocument;
  /**
   * Callback when user submits the CancelAction input
   */
  onCancelAction?: (prompt: string) => void;
  /**
   * Callback when form fields change
   */
  onDataChange?: (data: Record<string, string>) => void;
  /**
   * Callback when user sends a message action
   */
  onMessage?: (message: string) => void;
  /**
   * Callback when user clicks a Proteus.Action button with tool handler
   */
  onToolCall?: (toolName: string) => void;
  /**
   * Whether form is readonly
   */
  readOnly?: boolean;
};

/**
 * @experimental
 */
export function ProteusDocumentRenderer({
  collapsible,
  data = {},
  defaultOpen = true,
  element: elementProp,
  onCancelAction,
  onDataChange,
  onMessage,
  onOpenChange,
  onToolCall,
  open: openProp,
  readOnly = false,
}: ProteusDocumentRendererProps) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  const result = ProteusDocumentSchema.safeParse(elementProp);
  if (!result.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        `[optiaxiom][react][ProteusElement] Invalid block element:`,
        result.error,
      );
    }
  }

  const Trigger = collapsible ? DisclosureTrigger : Box;

  return (
    <ProteusDocumentProvider
      data={data}
      onCancelAction={onCancelAction}
      onDataChange={useEffectEvent((name: string, value: string) => {
        onDataChange?.({ ...data, [name]: value });
      })}
      onEvent={useEffectEvent(
        (event: { message: string } | { tool: string }) => {
          if ("tool" in event) {
            onToolCall?.(event.tool);
          } else if ("message" in event) {
            onMessage?.(event.message);
          }
        },
      )}
      readOnly={readOnly}
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
            <Trigger
              py="0"
              {...(collapsible ? { chevronPosition: "end" } : {})}
            >
              <Group fontSize="sm" gap="8">
                <Box bg="bg.accent.subtle" rounded="xs" size="20" />
                <Text fontWeight="500">{result.data.appName}</Text>
                {!open && <Text color="fg.secondary">{result.data.title}</Text>}
              </Group>
            </Trigger>
            <DisclosureContent
              alignItems="stretch"
              display="flex"
              flexDirection="column"
              gap="16"
              pt="16"
            >
              <Group flexDirection="column" gap="4">
                <Heading fontSize="lg" fontWeight="600" level="2">
                  {result.data.title}
                </Heading>
                {result.data.subtitle && (
                  <Text color="fg.secondary" fontSize="sm">
                    {result.data.subtitle}
                  </Text>
                )}
              </Group>
              <ProteusElement element={result.data.body} />
              {result.data.actions &&
                result.data.actions.length > 0 &&
                !readOnly && (
                  <Group gap="16" justifyContent="end" w="full">
                    <ProteusElement element={result.data.actions} />
                  </Group>
                )}
            </DisclosureContent>
          </>
        )}
      </Disclosure>
    </ProteusDocumentProvider>
  );
}

ProteusDocumentRenderer.displayName =
  "@optiaxiom/react/ProteusDocumentRenderer";
