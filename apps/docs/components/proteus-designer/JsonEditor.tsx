"use client";

import Editor, { loader, type OnMount } from "@monaco-editor/react";
import { Box, Group, Heading } from "@optiaxiom/react";
import { findNodeAtLocation, type Node, parseTree } from "jsonc-parser";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

import { validateDocument, type ValidationIssue } from "./schemaUtils";

const MARKER_OWNER = "proteus-document";

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
  onDocumentError: (error: null | string | ValidationIssue[]) => void;
}

export function JsonEditor({
  data,
  document,
  onDataChange,
  onDocumentChange,
  onDocumentError,
}: JsonEditorProps) {
  const { resolvedTheme } = useTheme();
  const monacoTheme = resolvedTheme === "dark" ? "vs-dark" : "light";

  const [docText, setDocText] = useState(() =>
    JSON.stringify(document, null, 2),
  );
  const [dataText] = useState(() => JSON.stringify(data, null, 2));

  const docEditorRef = useRef<null | Parameters<OnMount>[0]>(null);
  const monacoRef = useRef<null | Parameters<OnMount>[1]>(null);
  const dataEditorRef = useRef<null | Parameters<OnMount>[0]>(null);
  const editorIsSourceRef = useRef(false);
  const dataEditorIsSourceRef = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const lastIssuesRef = useRef<ValidationIssue[]>([]);

  /**
   * Translates each validation issue's JSON pointer path into a line/column
   * range in the Monaco editor and publishes them as model markers, which
   * render as the familiar red squiggles + hover tooltip with the issue
   * message. Passing an empty array clears any previously published markers.
   */
  const applyMarkers = useCallback(
    (text: string, issues: ValidationIssue[]) => {
      const editor = docEditorRef.current;
      const monaco = monacoRef.current;
      if (!editor || !monaco) return;
      const model = editor.getModel();
      if (!model) return;

      const root = parseTree(text);
      const markers = issues.flatMap((issue) => {
        if (!root) return [];
        const node = resolveNode(root, issue.path);
        if (!node) return [];
        const start = model.getPositionAt(node.offset);
        const end = model.getPositionAt(node.offset + node.length);
        return [
          {
            endColumn: end.column,
            endLineNumber: end.lineNumber,
            message: issue.message,
            severity: monaco.MarkerSeverity.Error,
            source: "Proteus",
            startColumn: start.column,
            startLineNumber: start.lineNumber,
          },
        ];
      });
      monaco.editor.setModelMarkers(model, MARKER_OWNER, markers);
    },
    [],
  );

  // Update editor when document changes externally (from tree/inspector)
  useEffect(() => {
    if (editorIsSourceRef.current) {
      editorIsSourceRef.current = false;
      return;
    }
    const newDocText = JSON.stringify(document, null, 2);
    setDocText(newDocText);
    docEditorRef.current?.setValue(newDocText);
    const issues = validateDocument(document);
    lastIssuesRef.current = issues;
    applyMarkers(newDocText, issues);
  }, [applyMarkers, document]);

  useEffect(() => {
    if (dataEditorIsSourceRef.current) {
      dataEditorIsSourceRef.current = false;
      return;
    }
    const newText = JSON.stringify(data, null, 2);
    dataEditorRef.current?.setValue(newText);
  }, [data]);

  const handleDocChange = useCallback(
    (value: string | undefined) => {
      if (!value) return;

      setDocText(value);

      try {
        const parsed = JSON.parse(value);
        const issues = validateDocument(parsed);
        // Always propagate the parsed document so the preview can render
        // whatever is valid; surface the issues alongside.
        editorIsSourceRef.current = true;
        onDocumentChange(parsed);
        onDocumentError(issues.length > 0 ? issues : null);
        lastIssuesRef.current = issues;
        applyMarkers(value, issues);
      } catch (e) {
        onDocumentError(e instanceof Error ? e.message : "Invalid JSON");
        lastIssuesRef.current = [];
        applyMarkers(value, []);
      }
    },
    [applyMarkers, onDocumentChange, onDocumentError],
  );

  const handleDataChange = useCallback(
    (value: string | undefined) => {
      if (!value) return;
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        try {
          const parsed = JSON.parse(value);
          if (typeof parsed === "object" && parsed !== null) {
            dataEditorIsSourceRef.current = true;
            onDataChange(parsed);
          }
        } catch {
          // ignore parse errors for data
        }
      }, 300);
    },
    [onDataChange],
  );

  const handleDocMount: OnMount = useCallback(
    (editor, monaco) => {
      docEditorRef.current = editor;
      monacoRef.current = monaco;
      // Apply markers for the initial document text.
      const model = editor.getModel();
      if (model) applyMarkers(model.getValue(), lastIssuesRef.current);
    },
    [applyMarkers],
  );

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
            theme={monacoTheme}
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
            theme={monacoTheme}
          />
        </Box>
      </Group>
    </Box>
  );
}

/**
 * Splits a JSON pointer string (e.g. `#/body/0/children/gap`) into the segment
 * array expected by jsonc-parser's `findNodeAtLocation`, coercing numeric
 * segments to numbers so they're treated as array indices rather than keys.
 */
function pathToSegments(path: string): Array<number | string> {
  return path
    .replace(/^#?\//, "")
    .split("/")
    .filter(Boolean)
    .map((seg) => (/^\d+$/.test(seg) ? Number(seg) : seg));
}

/**
 * Resolves a JSON pointer path to the jsonc-parser AST node we want Monaco to
 * underline. When the leaf segment is a property name, returns the property
 * *key* node so the squiggle lands on (e.g.) `"gap"` rather than its value —
 * a stable anchor that doesn't shift across multi-line object values. Falls
 * back to the value node for array indices or when the property key can't be
 * located.
 */
function resolveNode(root: Node, path: string): Node | undefined {
  const segments = pathToSegments(path);
  if (segments.length === 0) return root;

  const last = segments[segments.length - 1];
  if (typeof last === "number") {
    return findNodeAtLocation(root, segments);
  }

  const parent = findNodeAtLocation(root, segments.slice(0, -1));
  if (parent?.type !== "object" || !parent.children) {
    return findNodeAtLocation(root, segments);
  }
  for (const prop of parent.children) {
    // prop is type "property"; children[0] is the key, children[1] is the value
    const keyNode = prop.children?.[0];
    if (keyNode?.value === last) return keyNode;
  }
  return findNodeAtLocation(root, segments);
}
