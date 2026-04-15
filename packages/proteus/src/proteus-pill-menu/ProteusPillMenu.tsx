import { type MenuOption } from "@optiaxiom/react";
import {
  PillMenu,
  PillMenuContent,
  PillMenuTrigger,
} from "@optiaxiom/react/unstable";
import { useEffect, useMemo, useRef } from "react";

import type { ProteusEventHandler } from "../proteus-document/schemas";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import { useResolveProteusValues } from "../proteus-document/useResolveProteusValues";
import { useProteusValue } from "../use-proteus-value";

export type ProteusPillMenuProps = {
  /**
   * The data binding name for the search input value.
   */
  inputName?: string;
  /**
   * The data binding name for this pill menu's selected values.
   */
  name?: string;
  /**
   * Event handler triggered when the search input value changes.
   */
  onInputValueChange?: ProteusEventHandler;
  /**
   * The available options to select from.
   */
  options?: Array<{
    /**
     * Display label for the option
     */
    label: string;
    /**
     * Unique value for the option
     */
    value: string;
  }>;
};

export function ProteusPillMenu({
  inputName,
  name,
  onInputValueChange,
  options = [],
}: ProteusPillMenuProps) {
  const { onDataChange, onEvent, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusPillMenu",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusPillMenu",
  );

  const inputValue = useProteusValue({ path: inputName ?? "" });
  const resolvedOnInputValueChange = useResolveProteusValues(
    (onInputValueChange ?? {}) as Record<string, unknown>,
  ) as ProteusEventHandler;
  const resolvedRef = useRef(resolvedOnInputValueChange);
  resolvedRef.current = resolvedOnInputValueChange;
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;
  useEffect(() => {
    if (inputName && onInputValueChange) {
      void onEventRef.current(resolvedRef.current);
    }
  }, [inputName, inputValue, onInputValueChange]);

  const resolved = useProteusValue({ path: name ?? "" });
  const serialized = JSON.stringify(Array.isArray(resolved) ? resolved : []);
  const value = useMemo<string[]>(() => JSON.parse(serialized), [serialized]);

  const menuOptions = useMemo(
    () =>
      options.map<MenuOption>((option) => ({
        execute: () => {
          if (readOnly || !name) {
            return;
          }
          const next = value.includes(option.value)
            ? value.filter((v) => v !== option.value)
            : [...value, option.value];
          onDataChange?.(`${parentPath}/${name}`, next);
        },
        label: option.label,
        multi: true,
        selected: () => value.includes(option.value),
      })),
    [name, onDataChange, options, parentPath, readOnly, value],
  );

  return (
    <PillMenu
      inputValue={inputName ? inputValue : undefined}
      onInputValueChange={(inputValue) => {
        if (inputName) {
          onDataChange?.(`${parentPath}/${inputName}`, inputValue);
        }
      }}
      options={menuOptions}
    >
      <PillMenuTrigger readOnly={readOnly} />
      <PillMenuContent />
    </PillMenu>
  );
}

ProteusPillMenu.displayName = "@optiaxiom/proteus/ProteusPillMenu";
