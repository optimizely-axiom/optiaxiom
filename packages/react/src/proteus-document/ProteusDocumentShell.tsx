import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { set } from "jsonpointer";

import type { ProteusEventHandler } from "./schemas";

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

export type ProteusDocumentShellProps = Pick<
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

type ProteusDocument = {
  actions?: ReactNode;
  appIcon?: string;
  appName?: string;
  blocking?: boolean;
  body: ReactNode;
  subtitle?: ReactNode;
  title: ReactNode;
};

export function ProteusDocumentShell({
  collapsible: collapsibleProp,
  data = {},
  defaultOpen = true,
  element,
  onDataChange,
  onMessage,
  onOpenChange,
  onToolCall,
  open: openProp,
  readOnly = false,
}: ProteusDocumentShellProps) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  const collapsible = collapsibleProp && element.appName;
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
        {element.appName && (
          <Trigger py="0" {...(collapsible ? { chevronPosition: "end" } : {})}>
            <Group fontSize="sm" gap="8">
              <Box
                asChild
                bg={element.appIcon ? undefined : "bg.accent.subtle"}
                flex="none"
                rounded="xs"
                size="20"
              >
                {element.appIcon ? <img src={element.appIcon} /> : <div />}
              </Box>
              <Text fontWeight="500">{element.appName}</Text>
              {!open && (
                <Text color="fg.secondary" lineClamp="1">
                  {element.title}
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
          pt={element.appName ? "16" : "0"}
        >
          <Group flexDirection="column" gap="4">
            <Heading fontSize="lg" fontWeight="600" level="2" lineClamp="2">
              {element.title}
            </Heading>
            {!!element.subtitle && (
              <Text color="fg.secondary" fontSize="sm">
                {element.subtitle}
              </Text>
            )}
          </Group>
          {element.body}
          {!readOnly && (
            <Group gap="16" justifyContent="end" w="full">
              {element.actions}
            </Group>
          )}
        </DisclosureContent>
      </Disclosure>
    </ProteusDocumentProvider>
  );
}

ProteusDocumentShell.displayName = "@optiaxiom/react/ProteusDocumentShell";
