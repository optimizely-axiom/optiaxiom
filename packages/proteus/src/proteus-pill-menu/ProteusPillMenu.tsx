import { type MenuOption } from "@optiaxiom/react";
import {
  PillMenu,
  PillMenuContent,
  PillMenuTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo } from "react";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import { useProteusValue } from "../use-proteus-value";

export type ProteusPillMenuProps = {
  /**
   * The data binding name for this pill menu's selected values.
   */
  name?: string;
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

export function ProteusPillMenu({ name, options = [] }: ProteusPillMenuProps) {
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusPillMenu",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusPillMenu",
  );

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
    <PillMenu options={menuOptions}>
      <PillMenuTrigger readOnly={readOnly} />
      <PillMenuContent />
    </PillMenu>
  );
}

ProteusPillMenu.displayName = "@optiaxiom/proteus/ProteusPillMenu";
