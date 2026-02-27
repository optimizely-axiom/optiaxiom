import { TreeNode } from "./TreeNode";
import { TreeRow } from "./TreeRow";

export function ElementNode({
  depth,
  element,
  onInsert,
  onRemove,
  onSelect,
  path,
  selectedPath,
}: {
  depth: number;
  element: unknown;
  onInsert: (path: string, element: object) => void;
  onRemove: (path: string) => void;
  onSelect: (path: string) => void;
  path: string;
  selectedPath: null | string;
}) {
  if (typeof element === "string") {
    const truncated =
      element.length > 30 ? `${element.slice(0, 30)}…` : element;
    return (
      <TreeRow
        depth={depth}
        isSelected={selectedPath === path}
        label={`"${truncated}"`}
        onClick={() => onSelect(path)}
        onRemove={() => onRemove(path)}
        textStyle="italic"
        type=""
      />
    );
  }

  if (typeof element !== "object" || element == null) return null;

  const el = element as Record<string, unknown>;
  const type = String(el.$type ?? "Unknown");

  let subtitle = "";
  if (typeof el.name === "string") {
    subtitle = `(name: ${el.name})`;
  } else if (typeof el.label === "string") {
    subtitle = `(label: ${el.label})`;
  } else if (typeof el.path === "string") {
    subtitle = `(path: ${el.path})`;
  }

  return (
    <TreeNode
      depth={depth}
      element={el}
      label={type}
      onInsert={onInsert}
      onRemove={onRemove}
      onSelect={onSelect}
      path={path}
      selectedPath={selectedPath}
      subtitle={subtitle}
    />
  );
}
