import type { UniqueIdentifier } from "@dnd-kit/abstract";

import { move } from "@dnd-kit/helpers";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { type ReactNode, useState } from "react";

import { Box } from "../box";
import { Portal } from "../portal";
import * as styles from "./Sortable.css";

export type SortableProps<Item extends BaseItem> = {
  children?: ReactNode;
  onChange?: (data: { source: Item; value: Item[] }) => void;
  onValueChange?: (value: Item[]) => void;
  value?: Item[];
};

type BaseItem = { id: UniqueIdentifier };

export function Sortable<Item extends BaseItem>({
  children,
  onChange,
  onValueChange,
  value,
  ...props
}: SortableProps<Item>) {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        const { source } = event.operation;
        if (!source || !value) {
          return;
        }
        const nextValue = move(value, event);
        if (value === nextValue) {
          return;
        }

        onChange?.({
          source: source.data as Item,
          value: nextValue,
        });
        onValueChange?.(nextValue);
      }}
      onDragStart={(event) => {
        setShowOverlay(event.nativeEvent instanceof PointerEvent);
      }}
      {...props}
    >
      {children}

      <Portal asChild {...styles.overlay()}>
        <DragOverlay>
          {showOverlay && <Box bg="bg.overlay" rounded="sm" size="full" />}
        </DragOverlay>
      </Portal>
    </DragDropProvider>
  );
}

Sortable.displayName = "@optiaxiom/react/Sortable";
