"use client";

import { Alert, Box, Button, Group, Separator, Text } from "@optiaxiom/react";
import { ProteusDocumentRenderer } from "@optiaxiom/react/unstable";
import { useState } from "react";

import { DocumentTree } from "./DocumentTree";
import { JsonEditor } from "./JsonEditor";
import { PropertyInspector } from "./PropertyInspector/PropertyInspector";
import { documentExamples } from "./schemaUtils";
import { useDesignerState } from "./useDesignerState";

const templates = Object.fromEntries(
  documentExamples.map((example) => [
    String(example.title ?? "Untitled"),
    example as unknown as Record<string, unknown>,
  ]),
);

export function ProteusDesigner() {
  const {
    getNodeAtPath,
    insertNode,
    removeNode,
    selectNode,
    setData,
    setDocument,
    setNodeValue,
    state,
    updateNode,
  } = useDesignerState();

  const [docError, setDocError] = useState<null | string>(null);

  const selectedNode =
    state.selectedPath !== null ? getNodeAtPath(state.selectedPath) : null;

  return (
    <Box
      bg="bg.default"
      border="1"
      borderColor="border.secondary"
      display="flex"
      flexDirection="column"
      overflow="hidden"
      rounded="md"
      style={{
        height: "calc(100vh - var(--nextra-navbar-height) - 16px - 32px)",
        overscrollBehavior: "contain",
      }}
    >
      {/* Toolbar */}
      <Group gap="4" px="12" py="4">
        <Text color="fg.tertiary" fontSize="sm">
          Templates:
        </Text>
        {Object.entries(templates).map(([name, doc]) => (
          <Button
            appearance="subtle"
            key={name}
            onClick={() => setDocument(structuredClone(doc))}
            size="sm"
          >
            {name}
          </Button>
        ))}
      </Group>

      <Separator />

      {/* Main 3-column layout */}
      <Box display="flex" flex="1" overflow="hidden">
        {/* Left panel: Document Tree */}
        <Box
          borderColor="border.secondary"
          borderR="1"
          flex="none"
          overflow="hidden"
          w="1/4"
        >
          <DocumentTree
            document={state.document}
            h="full"
            onElementSelect={selectNode}
            onInsert={insertNode}
            onRemove={removeNode}
            selectedPath={state.selectedPath}
          />
        </Box>

        {/* Center: Live preview */}
        <Box
          bg="bg.page"
          flex="1"
          overflow="auto"
          style={{ position: "relative" }}
        >
          <Box overflow="auto" p="40">
            <ProteusDocumentRenderer
              data={state.data}
              element={
                state.document as unknown as Parameters<
                  typeof ProteusDocumentRenderer
                >[0]["element"]
              }
              onDataChange={setData}
            />
          </Box>
          {docError && (
            <Alert
              intent="danger"
              style={{ bottom: 8, insetInline: 8, position: "absolute" }}
            >
              {docError}
            </Alert>
          )}
        </Box>

        {/* Right panel: Property Inspector */}
        <Box
          borderColor="border.secondary"
          borderL="1"
          flex="none"
          overflow="auto"
          w="1/4"
        >
          <PropertyInspector
            dataKeys={Object.keys(state.data)}
            node={selectedNode}
            onSetValue={setNodeValue}
            onUpdate={updateNode}
            path={state.selectedPath}
          />
        </Box>
      </Box>

      {/* Bottom: JSON Editor */}
      <Box borderColor="border.secondary" borderT="1" h="1/3">
        <JsonEditor
          data={state.data}
          document={state.document}
          onDataChange={setData}
          onDocumentChange={setDocument}
          onDocumentError={setDocError}
        />
      </Box>
    </Box>
  );
}
