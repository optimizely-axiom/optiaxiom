import { type MenuOption } from "@optiaxiom/react";
import {
  PillMenu,
  PillMenuContent,
  PillMenuTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo } from "react";

import type { ProteusEventHandler } from "../proteus-document/schemas";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import { useProteusValue } from "../use-proteus-value";
import { useInputValueChangeInteraction } from "./useInputValueChangeInteraction";

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
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusPillMenu",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusPillMenu",
  );

  const { inputValue, loading } = useInputValueChangeInteraction({
    inputName,
    onInputValueChange,
  });

  const resolved = useProteusValue({ path: name ?? "" });
  const serialized = JSON.stringify(Array.isArray(resolved) ? resolved : []);
  const value = useMemo<Array<{ label: string; value: string }>>(
    () => JSON.parse(serialized),
    [serialized],
  );

  const menuOptions = useMemo(
    () =>
      options.map<MenuOption>((option) => ({
        ...option,
        execute: () => {
          if (readOnly || !name) {
            return;
          }
          const next = value.some((v) => v.value === option.value)
            ? value.filter((v) => v.value !== option.value)
            : [...value, option];
          onDataChange?.(`${parentPath}/${name}`, next);
        },
        multi: true,
        selected: () => value.some((v) => v.value === option.value),
      })),
    [name, onDataChange, options, parentPath, readOnly, value],
  );
  const menuValue = useMemo<MenuOption[]>(
    () =>
      value.map((item) => ({
        execute: () => {
          if (readOnly || !name) {
            return;
          }
          onDataChange?.(
            `${parentPath}/${name}`,
            value.filter((v) => v.value !== item.value),
          );
        },
        label: item.label,
        multi: true,
      })),
    [name, onDataChange, parentPath, readOnly, value],
  );

  return (
    <PillMenu
      inputValue={inputName ? inputValue : undefined}
      loading={loading}
      onInputValueChange={(inputValue) => {
        if (inputName) {
          onDataChange?.(`${parentPath}/${inputName}`, inputValue);
        }
      }}
      options={menuOptions}
      value={menuValue}
    >
      <PillMenuTrigger readOnly={readOnly} />
      <PillMenuContent />
    </PillMenu>
  );
}

ProteusPillMenu.displayName = "@optiaxiom/proteus/ProteusPillMenu";
