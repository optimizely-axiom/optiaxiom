import { useEffect, useRef, useState } from "react";

import { InlineInput } from "../inline-input";

export type TreeItemEditorProps = {
  /**
   * The label being edited.
   */
  label: string;
  /**
   * Called once editing ends, with the new label, or `undefined` when
   * cancelled. `refocus` is false when editing ended because focus left the
   * field, which keeps focus where the user sent it.
   */
  onDone: (label: string | undefined, refocus: boolean) => void;
};

/**
 * Edits an item's label in place of it.
 */
export function TreeItemEditor({ label, onDone }: TreeItemEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState(label);
  const doneRef = useRef(false);
  const finish = (value: string | undefined, refocus: boolean) => {
    if (doneRef.current) {
      return;
    }
    doneRef.current = true;
    onDone(value?.trim() ? value.trim() : undefined, refocus);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    // Start with the whole label selected, as renaming a file does.
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }, []);

  return (
    <InlineInput
      flex="1"
      label={label}
      minW="0"
      onBlur={() => finish(draft, false)}
      // The field's clicks and keys aren't the tree's: no selecting, arrow
      // keys or typeahead from in here.
      onClick={(event) => event.stopPropagation()}
      onDoubleClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => {
        event.stopPropagation();
        if (event.nativeEvent.isComposing) {
          return;
        }
        if (event.key === "Enter") {
          event.preventDefault();
          finish(draft, true);
        } else if (event.key === "Escape") {
          event.preventDefault();
          finish(undefined, true);
        }
      }}
      onPointerDown={(event) => event.stopPropagation()}
      onValueChange={setDraft}
      ref={ref}
      value={draft}
    />
  );
}

TreeItemEditor.displayName = "@optiaxiom/react/TreeItemEditor";
