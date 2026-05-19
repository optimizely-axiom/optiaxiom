import { IconArrowDown } from "@optiaxiom/icons";
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

import type { ProteusEventHandler, StructuredMessage } from "./schemas";

import { useEffectEvent } from "../hooks";
import { downloadFile } from "../proteus-image/downloadFile";
import {
  ProteusDocumentProvider,
  type UploadFile,
  type UseResource,
} from "./ProteusDocumentContext";
import * as styles from "./ProteusDocumentShell.css";
import { resolveProteusValue } from "./resolveProteusValue";

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
   * Callback when user triggers a download action; receives the resolved URL(s).
   * When provided, the host is responsible for the actual download/zip.
   * Falls back to built-in window.open behaviour when absent.
   */
  onDownload?: (urls: string[]) => Promise<void> | void;
  /**
   * Callback when user clicks a Action button with interaction handler
   */
  onInteraction?: (
    name: string,
    params?: Record<string, unknown>,
  ) => Promise<unknown> | unknown;
  /**
   * Callback when user sends a message action. The payload may be a plain
   * string or a structured object (parts + optional files), depending on
   * what the document declares for `Action.onClick.message`.
   */
  onMessage?: (message: string | StructuredMessage) => Promise<void> | void;
  /**
   * Callback when user triggers a preview action.
   * Receives the file object to preview.
   */
  onPreview?: (file: unknown) => Promise<void> | void;
  /**
   * Callback when an analytics event is fired
   */
  onTrack?: (event: string, properties: Record<string, string>) => void;
  /**
   * Async upload callback used by FileUpload elements. Receives a File and
   * resolves to a metadata object the document writes into form data.
   */
  onUpload?: UploadFile;
  /**
   * Whether form is readonly
   */
  readOnly?: boolean;
  /**
   * If true, the renderer will throw an error if the provided document is invalid. Otherwise, it will fail silently and render nothing.
   */
  strict?: boolean;
  /**
   * Hook to resolve a resource URI to HTML content for Bridge elements
   */
  useResource?: UseResource;
};

type ProteusDocument = {
  actions?: ReactNode;
  appearance?: "default" | "inline" | Record<string, unknown>;
  appIcon?: string;
  appName?: string;
  blocking?: boolean;
  body: ReactNode;
  compact?: boolean;
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
  onDownload,
  onInteraction,
  onMessage,
  onOpenChange,
  onPreview,
  onTrack,
  onUpload,
  open: openProp,
  readOnly = false,
  strict,
  useResource,
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

  const bodyRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = bodyRef.current;
    if (!node) return;

    const update = () => {
      if (node.scrollHeight - node.scrollTop - node.clientHeight > 1) {
        node.dataset.canScroll = "";
      } else {
        delete node.dataset.canScroll;
      }
    };

    const observer = new ResizeObserver(update);
    observer.observe(node);
    node.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      node.removeEventListener("scroll", update);
    };
  }, []);

  const collapsible = collapsibleProp && element.appName;
  const Trigger = collapsible ? DisclosureTrigger : Box;
  const appearance = resolveProteusValue(element.appearance, data, "", []);
  const inline = appearance === "inline";

  return (
    <ProteusDocumentProvider
      data={data}
      onDataChange={useEffectEvent((path: string, value: unknown) => {
        const next = structuredClone(data);
        set(next, path, value);
        onDataChange?.(next);
      })}
      onEvent={useEffectEvent(async (event: ProteusEventHandler) => {
        if ("interaction" in event) {
          return await onInteraction?.(event.interaction, event.params);
        } else if ("message" in event) {
          await onMessage?.(event.message);
        } else if (event.action === "download") {
          const urls: string[] = [];
          if (typeof event.url === "string") {
            urls.push(event.url);
          } else if (Array.isArray(event.url)) {
            for (const u of event.url) {
              if (typeof u !== "string") {
                throw new Error("Invalid URL in download array");
              }
              urls.push(u);
            }
          } else {
            throw new Error("Invalid URL for download action");
          }
          if (onDownload) {
            await onDownload(urls);
          } else {
            await Promise.all(urls.map((u) => downloadFile(u)));
          }
        } else if (event.action === "openLink") {
          if (typeof event.url === "string") {
            window.open(event.url, "_blank", "noopener,noreferrer");
          }
        } else if (event.action === "preview") {
          await onPreview?.(event.file);
        }
        return;
      })}
      onTrack={useEffectEvent(
        (event: string, properties: Record<string, string>) => {
          onTrack?.(event, properties);
        },
      )}
      onUpload={onUpload}
      readOnly={readOnly}
      strict={strict}
      useResource={useResource}
      valid={valid}
    >
      <Disclosure
        bg={inline ? undefined : "bg.default"}
        border={inline ? undefined : "1"}
        borderColor={inline ? undefined : "border.tertiary"}
        onOpenChange={setOpen}
        open={open}
        p={inline ? undefined : "20"}
        rounded={inline ? undefined : "xl"}
      >
        {!inline && element.appName && (
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
          {!inline && element.title && (
            <Group
              alignItems={element.titleIcon ? "start" : undefined}
              bg={element.titleIcon ? "bg.page" : "transparent"}
              gap="12"
              p={element.titleIcon ? "12" : undefined}
              rounded="lg"
            >
              {element.titleIcon && (
                <Group
                  bg="bg.avatar.purple"
                  flex="none"
                  justifyContent="center"
                  rounded="lg"
                  size="md"
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
              <Group
                ref={element.compact ? bodyRef : undefined}
                {...styles.body({ truncate: element.compact })}
              >
                {element.body}
                {element.compact && (
                  <Box {...styles.scrollIndicator()}>
                    <IconArrowDown />
                  </Box>
                )}
              </Group>
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
