"use client";

import Editor, { loader, type OnMount } from "@monaco-editor/react";
import { Box, Group, Heading } from "@optiaxiom/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { safeParseDocument } from "./schemaUtils";

// Allow trailing commas in Monaco JSON validation
if (typeof window !== "undefined") {
  void loader.init().then((monaco) => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      allowComments: true,
      trailingCommas: "ignore",
    });
  });
}

interface JsonEditorProps {
  data: Record<string, unknown>;
  document: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
  onDocumentChange: (doc: Record<string, unknown>) => void;
  onDocumentError: (error: null | string) => void;
}

export function JsonEditor({
  data,
  document,
  onDataChange,
  onDocumentChange,
  onDocumentError,
}: JsonEditorProps) {
  const [docText, setDocText] = useState(() =>
    JSON.stringify(document, null, 2),
  );
  const [dataText] = useState(() => JSON.stringify(data, null, 2));

  const docEditorRef = useRef<null | Parameters<OnMount>[0]>(null);
  const dataEditorRef = useRef<null | Parameters<OnMount>[0]>(null);
  const editorIsSourceRef = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Update editor when document changes externally (from tree/inspector)
  useEffect(() => {
    if (editorIsSourceRef.current) {
      editorIsSourceRef.current = false;
      return;
    }
    const newDocText = JSON.stringify(document, null, 2);
    setDocText(newDocText);
    docEditorRef.current?.setValue(newDocText);
  }, [document]);

  useEffect(() => {
    const newText = JSON.stringify(data, null, 2);
    dataEditorRef.current?.setValue(newText);
  }, [data]);

  const handleDocChange = useCallback(
    (value: string | undefined) => {
      if (!value) return;

      setDocText(value);

      try {
        const parsed = JSON.parse(value);
        const result = safeParseDocument(parsed);
        if (result.success) {
          editorIsSourceRef.current = true;
          onDocumentChange(parsed);
          onDocumentError(null);
        } else {
          onDocumentError(
            (result.error as Array<{ error: string; keywordLocation: string }>)
              .map(
                (i: { error: string; keywordLocation: string }) =>
                  `${i.keywordLocation}: ${i.error}`,
              )
              .join(", "),
          );
        }
      } catch (e) {
        onDocumentError(e instanceof Error ? e.message : "Invalid JSON");
      }
    },
    [onDocumentChange, onDocumentError],
  );

  const handleDataChange = useCallback(
    (value: string | undefined) => {
      if (!value) return;
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        try {
          const parsed = JSON.parse(value);
          if (typeof parsed === "object" && parsed !== null) {
            onDataChange(parsed);
          }
        } catch {
          // ignore parse errors for data
        }
      }, 300);
    },
    [onDataChange],
  );

  const handleDocMount: OnMount = useCallback((editor) => {
    docEditorRef.current = editor;
  }, []);

  const handleDataMount: OnMount = useCallback((editor) => {
    dataEditorRef.current = editor;
  }, []);

  return (
    <Box display="flex" h="full" overflow="hidden">
      <Group
        borderColor="border.secondary"
        borderR="1"
        flexDirection="column"
        gap="4"
        p="8"
        w="2/3"
      >
        <Heading flex="none" fontSize="sm" level="3">
          Document Editor
        </Heading>
        <Box flex="1" overflow="hidden">
          <Editor
            defaultLanguage="json"
            defaultValue={docText}
            onChange={handleDocChange}
            onMount={handleDocMount}
            options={{
              automaticLayout: true,
              fontSize: 12,
              minimap: { enabled: false },
            }}
          />
        </Box>
      </Group>
      <Group flexDirection="column" p="8" w="1/3">
        <Heading flex="none" fontSize="sm" level="3">
          Sample Data
        </Heading>
        <Box flex="1">
          <Editor
            defaultLanguage="json"
            defaultValue={dataText}
            onChange={handleDataChange}
            onMount={handleDataMount}
            options={{
              fontSize: 12,
              minimap: { enabled: false },
            }}
          />
        </Box>
      </Group>
    </Box>
  );
}
