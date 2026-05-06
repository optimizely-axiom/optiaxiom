"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";
import { useMemo } from "react";

const widgetHtml = `<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: system-ui, sans-serif; margin: 0; padding: 16px; color: #1a1a1a; }
      h1 { font-size: 16px; margin: 0 0 8px; }
      p { color: #555; margin: 0 0 12px; font-size: 14px; }
      button { padding: 6px 12px; background: #0037ff; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; }
      button:hover { background: #0029cc; }
    </style>
  </head>
  <body>
    <h1>Embedded MCP App</h1>
    <p>This widget is rendered in a sandboxed iframe. Click below to call a tool on the host.</p>
    <button id="btn">Refresh data</button>
    <script>
      document.getElementById('btn').addEventListener('click', function() {
        if (window.openai && window.openai.callTool) {
          window.openai.callTool('refresh_data', { range: 'Q1' });
        }
      });
    </script>
  </body>
</html>`;

export function App() {
  const useResource = useMemo(
    () => () => ({
      data: { mimeType: "text/html+skybridge", text: widgetHtml },
      isError: false,
    }),
    [],
  );

  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        element={{
          $type: "Document",
          appName: "MCP App",
          body: [
            {
              $type: "Text",
              children: "Embedded widget loaded via the App Bridge:",
            },
            {
              $type: "Bridge",
              height: 220,
              resource: "ui://my-widget",
            },
          ],
          title: "Bridge Component",
        }}
        useResource={useResource}
      />
    </Box>
  );
}
