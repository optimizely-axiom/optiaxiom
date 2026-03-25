import {
  Box,
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
  Group,
  Heading,
  Text,
  Tooltip,
} from "@optiaxiom/react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { set } from "jsonpointer";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import type { ProteusEventHandler } from "./schemas";

import { useEffectEvent } from "../hooks";
import { downloadFile } from "../proteus-image/downloadFile";
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
  /**
   * If true, the renderer will throw an error if the provided document is invalid. Otherwise, it will fail silently and render nothing.
   */
  strict?: boolean;
};

type ProteusDocument = {
  actions?: ReactNode;
  appIcon?: string;
  appName?: string;
  blocking?: boolean;
  body: ReactNode;
  subtitle?: ReactNode;
  title?: ReactNode;
  titleIcon?: string;
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
  strict,
}: ProteusDocumentShellProps) {
  const [valid, setValid] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  useEffect(() => {
    if (formRef.current) {
      setValid(formRef.current.checkValidity());
    }
  }, []);

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
          } else if (Array.isArray(event.url)) {
            await Promise.all(
              event.url.map((u) => {
                if (typeof u !== "string") {
                  throw new Error("Invalid URL in download array");
                }
                return downloadFile(u);
              }),
            );
          } else {
            throw new Error("Invalid URL for download action");
          }
        }
      })}
      readOnly={readOnly}
      strict={strict}
      valid={valid}
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
                {element.appIcon ? (
                  <img alt="" src={element.appIcon} />
                ) : (
                  <div />
                )}
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
          {element.title && (
            <Group
              bg={element.titleIcon ? "bg.page" : "transparent"}
              gap="8"
              p={element.titleIcon ? "12" : undefined}
              rounded="lg"
            >
              {element.titleIcon && (
                <Group
                  bg="bg.avatar.purple"
                  flex="none"
                  justifyContent="center"
                  rounded="lg"
                  size="lg"
                >
                  <Box asChild>
                    <img alt="" src={element.titleIcon} />
                  </Box>
                </Group>
              )}
              <Group flex="1" flexDirection="column" gap="4">
                <Heading fontSize="lg" fontWeight="600" level="2" lineClamp="2">
                  {element.title}
                </Heading>
                {!!element.subtitle && (
                  <Tooltip auto content={element.subtitle}>
                    <Text color="fg.secondary" lineClamp="2">
                      {element.subtitle}
                    </Text>
                  </Tooltip>
                )}
              </Group>
            </Group>
          )}
          <Group asChild flexDirection="column" gap="16">
            <form
              onChange={(event) => {
                const form = event.currentTarget;
                setTimeout(() => {
                  setValid(form.checkValidity());
                });
              }}
              onSubmit={(event) => {
                event.preventDefault();
              }}
              ref={formRef}
            >
              {element.body}
              {element.actions && !readOnly && (
                <Group gap="16" justifyContent="end" w="full">
                  {element.actions}
                </Group>
              )}
            </form>
          </Group>
        </DisclosureContent>
      </Disclosure>
    </ProteusDocumentProvider>
  );
}

ProteusDocumentShell.displayName = "@optiaxiom/proteus/ProteusDocumentShell";
