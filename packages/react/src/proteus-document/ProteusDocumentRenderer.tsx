import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { set } from "jsonpointer";
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
import { downloadFile } from "./downloadFile";
import { ProteusDocumentProvider } from "./ProteusDocumentContext";
import { ProteusElement } from "./ProteusElement";
import {
  type ProteusDocument,
  type ProteusEventHandler,
  safeParseDocument,
} from "./schemas";

export type ProteusDocumentRendererProps = Pick<
  ComponentPropsWithoutRef<typeof Disclosure>,
  "defaultOpen" | "onOpenChange" | "open"
> & {
  /**
   * Whether block is collapsible
   */
  collapsible?: boolean;
  /**
   * Current form data
   */
  data?: Record<string, unknown>;
  /**
   * The Proteus document to render
   */
  element: ProteusDocument;
  /**
   * Callback when form fields change
   */
  onDataChange?: (data: Record<string, unknown>) => void;
  /**
   * Callback when user sends a message action
   */
  onMessage?: (message: string) => Promise<void> | void;
  /**
   * Callback when user clicks a Action button with tool handler
   */
  onToolCall?: (toolName: string) => Promise<void> | void;
  /**
   * Whether form is readonly
   */
  readOnly?: boolean;
};

/**
 * @experimental
 */
export function ProteusDocumentRenderer({
  collapsible: collapsibleProp,
  data = {},
  defaultOpen = true,
  element: elementProp,
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

  const result = safeParseDocument(elementProp);
  if (!result.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        `[optiaxiom][react][ProteusElement] Invalid block element:`,
        result.error,
      );
    }
  }

  const collapsible = collapsibleProp && result.success && result.data.appName;
  const Trigger = collapsible ? DisclosureTrigger : Box;

  return (
    <ProteusDocumentProvider
      data={data}
      onDataChange={useEffectEvent((path: string, value: unknown) => {
        const next = structuredClone(data);
        set(next, path, value);
        onDataChange?.(next);
      })}
      onEvent={useEffectEvent(async (event: ProteusEventHandler) => {
        if ("tool" in event) {
          await onToolCall?.(event.tool);
        } else if ("message" in event) {
          await onMessage?.(event.message);
        } else if (event.action === "download") {
          if (typeof event.url === "string") {
            await downloadFile(event.url);
          } else {
            throw new Error("Invalid URL for download action");
          }
        }
      })}
      readOnly={readOnly}
    >
      <Disclosure
        bg="bg.default"
        border="1"
        borderColor="border.tertiary"
        onOpenChange={setOpen}
        open={open}
        p="16"
        rounded="xl"
      >
        {result.success && (
          <>
            {result.data.appName && (
              <Trigger
                py="0"
                {...(collapsible ? { chevronPosition: "end" } : {})}
              >
                <Group fontSize="sm" gap="8">
                  <Box
                    asChild
                    bg={result.data.appIcon ? undefined : "bg.accent.subtle"}
                    flex="none"
                    rounded="xs"
                    size="20"
                  >
                    {result.data.appIcon ? (
                      <img src={result.data.appIcon} />
                    ) : (
                      <div />
                    )}
                  </Box>
                  <Text fontWeight="500">{result.data.appName}</Text>
                  {!open && (
                    <Text color="fg.secondary" lineClamp="1">
                      <ProteusElement element={result.data.title} />
                    </Text>
                  )}
                </Group>
              </Trigger>
            )}
            <DisclosureContent
              alignItems="stretch"
              display="flex"
              flexDirection="column"
              gap="16"
              pb="0"
              pt={result.data.appName ? "16" : "0"}
            >
              <Group flexDirection="column" gap="4">
                <Heading fontSize="lg" fontWeight="600" level="2" lineClamp="2">
                  <ProteusElement element={result.data.title} />
                </Heading>
                {!!result.data.subtitle && (
                  <Text color="fg.secondary" fontSize="sm">
                    <ProteusElement element={result.data.subtitle} />
                  </Text>
                )}
              </Group>
              <ProteusElement element={result.data.body} />
              {!!result.data.actions && !readOnly && (
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
