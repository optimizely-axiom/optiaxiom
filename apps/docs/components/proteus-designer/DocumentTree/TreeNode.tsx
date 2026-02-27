import { type MenuOption } from "@optiaxiom/react";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { useMemo, useState } from "react";

import { ElementNode } from "./ElementNode";
import { getContainerOptions, getDocumentOptions, TreeRow } from "./TreeRow";

export function TreeNode({
  depth,
  element,
  label,
  onInsert,
  onRemove,
  onSelect,
  path,
  selectedPath,
  subtitle,
}: {
  depth: number;
  element: Record<string, unknown>;
  label: string;
  onInsert: (path: string, element: object) => void;
  onRemove: (path: string) => void;
  onSelect: (path: string) => void;
  path: string;
  selectedPath: null | string;
  subtitle?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const type = String(element.$type ?? "");
  const isDocument = type === "Document";

  const children = isDocument ? null : element.children;
  const body = isDocument ? element.body : null;
  const actions = isDocument ? element.actions : null;
  const hasChildren = isDocument
    ? toArray(body).length > 0 || toArray(actions).length > 0
    : toArray(children).length > 0;

  const menuOptions: MenuOption[] = useMemo(() => {
    if (isDocument) {
      const bodyLength = Array.isArray(body) ? body.length : 0;
      const actionsLength = Array.isArray(actions) ? actions.length : 0;
      return getDocumentOptions(
        (el) => onInsert(`${path}/body/${bodyLength}`, el),
        (el) => onInsert(`${path}/actions/${actionsLength}`, el),
      );
    }

    const childArr = toArray(children);
    const parts = path.split("/");
    const index = Number(parts[parts.length - 1]);
    const parentPath = parts.slice(0, -1).join("/");
    return getContainerOptions(
      (el) => onInsert(`${path}/children/${childArr.length}`, el),
      (el) => onInsert(`${parentPath}/${index + 1}`, el),
    );
  }, [isDocument, body, actions, children, path, onInsert]);

  return (
    <>
      <TreeRow
        depth={depth}
        icon={
          hasChildren &&
          (collapsed ? (
            <IconChevronRight size={14} />
          ) : (
            <IconChevronDown size={14} />
          ))
        }
        isSelected={selectedPath === path}
        label={label}
        menuOptions={menuOptions}
        onClick={() => onSelect(path)}
        onIconClick={() => {
          setCollapsed((c) => !c);
        }}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Delete" || e.key === "Backspace") {
            if (path !== "" && selectedPath === path) {
              e.preventDefault();
              onRemove(path);
            }
          }
        }}
        onRemove={path !== "" ? () => onRemove(path) : undefined}
        subtitle={subtitle}
        textStyle="normal"
        type={type}
      />
      {!collapsed && (
        <>
          {toArray(children).map((child: unknown, index: number) => (
            <ElementNode
              depth={depth + 1}
              element={child}
              key={`${path}/children/${index}`}
              onInsert={onInsert}
              onRemove={onRemove}
              onSelect={onSelect}
              path={`${path}/children/${index}`}
              selectedPath={selectedPath}
            />
          ))}
          {toArray(body).map((child: unknown, index: number) => (
            <ElementNode
              depth={depth + 1}
              element={child}
              key={`${path}/body/${index}`}
              onInsert={onInsert}
              onRemove={onRemove}
              onSelect={onSelect}
              path={`${path}/body/${index}`}
              selectedPath={selectedPath}
            />
          ))}
          {toArray(actions).map((child: unknown, index: number) => (
            <ElementNode
              depth={depth + 1}
              element={child}
              key={`${path}/actions/${index}`}
              onInsert={onInsert}
              onRemove={onRemove}
              onSelect={onSelect}
              path={`${path}/actions/${index}`}
              selectedPath={selectedPath}
            />
          ))}
        </>
      )}
    </>
  );
}

function toArray(children: unknown) {
  return Array.isArray(children)
    ? children
    : children != null
      ? [children]
      : [];
}
