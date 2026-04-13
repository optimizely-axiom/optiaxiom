import { type ReactNode, useEffect, useRef, useState } from "react";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";

export type ProteusBridgeProps = {
  /**
   * Content rendered on platforms without iframe support
   */
  fallback?: ReactNode;
  /**
   * Height of the iframe in pixels
   */
  height?: number;
  /**
   * Resource URI identifying the MCP app to render
   */
  resource: string;
};

type BridgeCallbacks = {
  data: Record<string, unknown>;
  onInteraction?: (event: {
    data: Record<string, unknown>;
    toolName: string;
    type: string;
  }) => Promise<unknown>;
  onMessage?: (event: { prompt: string; type: string }) => Promise<void>;
  setWidgetState: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  widgetStateRef: React.RefObject<Record<string, unknown>>;
};

export function ProteusBridge({ height = 400, resource }: ProteusBridgeProps) {
  const { data, onEvent, useResource } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusBridge",
  );

  const result = useResource?.(resource);
  const html = result?.data.html ?? "";
  const mimeType = result?.data.mimeType ?? "text/html";

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [widgetState, setWidgetState] = useState<Record<string, unknown>>({});
  const widgetStateRef = useRef(widgetState);
  widgetStateRef.current = widgetState;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const callbacks: BridgeCallbacks = {
      data,
      onInteraction: async (event) => {
        await onEvent({ interaction: event.toolName });
      },
      onMessage: async (event) => {
        await onEvent({ message: event.prompt });
      },
      setWidgetState,
      widgetStateRef,
    };

    if (mimeType === "text/html;profile=openai-app") {
      return initMcpAppHostWithOpenAiShim(iframe, callbacks) ?? undefined;
    } else {
      return initMcpAppHost(iframe, callbacks) ?? undefined;
    }
  }, [data, html, mimeType, onEvent, resource]);

  return (
    <iframe
      ref={iframeRef}
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
      srcDoc={html}
      style={{ border: "none", height, width: "100%" }}
      title={resource}
    />
  );
}

function initMcpAppHost(
  _iframe: HTMLIFrameElement,
  _callbacks: BridgeCallbacks,
) {
  return () => {};
}

function initMcpAppHostWithOpenAiShim(
  _iframe: HTMLIFrameElement,
  _callbacks: BridgeCallbacks,
) {
  return () => {};
}

ProteusBridge.displayName = "@optiaxiom/proteus/ProteusBridge";
