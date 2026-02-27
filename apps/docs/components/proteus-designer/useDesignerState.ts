import { useCallback, useEffect, useState } from "react";

type ProteusDoc = Record<string, unknown>;

const STORAGE_KEY = "proteus-designer-document";

const initialDocument: ProteusDoc = {
  $type: "Document",
  appName: "Opal",
  body: [{ $type: "Text", children: "Hello world" }],
  title: "New Document",
};

export interface DesignerState {
  data: Record<string, unknown>;
  document: ProteusDoc;
  selectedPath: null | string;
}

export function useDesignerState() {
  const [state, setState] = useState<DesignerState>(() => ({
    data: {},
    document: loadDocument(),
    selectedPath: null,
  }));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.document));
    } catch {
      // ignore quota errors
    }
  }, [state.document]);

  const setDocument = useCallback((doc: ProteusDoc) => {
    setState((s) => {
      return { ...s, document: doc };
    });
  }, []);

  const selectNode = useCallback((path: null | string) => {
    setState((s) => ({ ...s, selectedPath: path }));
  }, []);

  const updateNode = useCallback(
    (path: string, props: Record<string, unknown>) => {
      setState((s) => {
        const node = getAtPath(s.document, path);
        if (node == null || typeof node !== "object") return s;
        const updated = { ...(node as Record<string, unknown>), ...props };
        // Remove undefined/null props
        for (const [k, v] of Object.entries(props)) {
          if (v === undefined || v === "") {
            delete updated[k];
          }
        }
        return { ...s, document: setAtPath(s.document, path, updated) };
      });
    },
    [],
  );

  const insertNode = useCallback((path: string, element: unknown) => {
    setState((s) => {
      return { ...s, document: insertAtPath(s.document, path, element) };
    });
  }, []);

  const removeNode = useCallback((path: string) => {
    setState((s) => {
      return {
        ...s,
        document: removeAtPath(s.document, path),
        selectedPath: s.selectedPath === path ? null : s.selectedPath,
      };
    });
  }, []);

  const setNodeValue = useCallback((path: string, value: unknown) => {
    setState((s) => {
      return { ...s, document: setAtPath(s.document, path, value) };
    });
  }, []);

  const setData = useCallback((data: Record<string, unknown>) => {
    setState((s) => ({ ...s, data }));
  }, []);

  const getNodeAtPath = useCallback(
    (path: string) => {
      return getAtPath(state.document, path);
    },
    [state.document],
  );

  return {
    getNodeAtPath,
    insertNode,
    removeNode,
    selectNode,
    setData,
    setDocument,
    setNodeValue,
    state,
    updateNode,
  };
}

function getAtPath(obj: ProteusDoc, path: string): unknown {
  if (path === "") return obj;
  const parts = path.replace(/^\//, "").split("/");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = obj;
  for (const part of parts) {
    if (current == null) return undefined;
    const index = Number(part);
    if (!isNaN(index)) {
      current = toArray(current)[index];
    } else {
      current = current[part];
    }
  }
  return current;
}

function insertAtPath(
  obj: ProteusDoc,
  path: string,
  element: unknown,
): ProteusDoc {
  const clone = structuredClone(obj);
  const parts = path.replace(/^\//, "").split("/");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = clone;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const index = Number(part);
    if (!isNaN(index)) {
      current = current[index];
    } else {
      // If the next segment is numeric, normalize the property to an array
      const nextIndex = Number(parts[i + 1]);
      if (!isNaN(nextIndex) && !Array.isArray(current[part])) {
        current[part] = current[part] != null ? [current[part]] : [];
      }
      current = current[part];
    }
  }
  const lastPart = parts[parts.length - 1];
  const lastIndex = Number(lastPart);
  if (Array.isArray(current)) {
    if (!isNaN(lastIndex)) {
      current.splice(lastIndex, 0, element);
    } else {
      current.push(element);
    }
  } else if (current[lastPart] === undefined) {
    current[lastPart] = element;
  } else if (Array.isArray(current[lastPart])) {
    current[lastPart].push(element);
  } else {
    current[lastPart] = [current[lastPart], element];
  }
  return clone;
}

function loadDocument(): ProteusDoc {
  if (typeof window === "undefined") return initialDocument;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore corrupt data
  }
  return initialDocument;
}

function removeAtPath(obj: ProteusDoc, path: string): ProteusDoc {
  const clone = structuredClone(obj);
  const parts = path.replace(/^\//, "").split("/");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = clone;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const index = Number(part);
    if (!isNaN(index)) {
      current = current[index];
    } else {
      // If the next segment is numeric, normalize the property to an array
      const nextIndex = Number(parts[i + 1]);
      if (!isNaN(nextIndex) && !Array.isArray(current[part])) {
        current[part] = current[part] != null ? [current[part]] : [];
      }
      current = current[part];
    }
  }
  const lastPart = parts[parts.length - 1];
  const lastIndex = Number(lastPart);
  if (Array.isArray(current) && !isNaN(lastIndex)) {
    current.splice(lastIndex, 1);
  } else {
    delete current[lastPart];
  }
  return clone;
}

function setAtPath(obj: ProteusDoc, path: string, value: unknown): ProteusDoc {
  const clone = structuredClone(obj);
  if (path === "") return value as ProteusDoc;
  const parts = path.replace(/^\//, "").split("/");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = clone;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let normalizedParent: any = null;
  let normalizedKey: string = "";
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const index = Number(part);
    if (Array.isArray(current) && !isNaN(index)) {
      current = current[index];
    } else {
      // If the next segment is numeric, normalize the property to an array
      const nextIndex = Number(parts[i + 1]);
      if (!isNaN(nextIndex) && !Array.isArray(current[part])) {
        current[part] = current[part] != null ? [current[part]] : [];
        normalizedParent = current;
        normalizedKey = part;
      }
      current = current[part];
    }
  }
  const lastPart = parts[parts.length - 1];
  const lastIndex = Number(lastPart);
  if (Array.isArray(current) && !isNaN(lastIndex)) {
    current[lastIndex] = value;
    // Unwrap back to scalar if we temporarily wrapped a single value
    if (normalizedParent && current.length === 1) {
      normalizedParent[normalizedKey] = current[0];
    }
  } else {
    current[lastPart] = value;
  }
  return clone;
}

function toArray(children: unknown) {
  return Array.isArray(children)
    ? children
    : children != null
      ? [children]
      : [];
}
