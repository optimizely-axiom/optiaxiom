import type { RowData, TableFeatures } from "@tanstack/react-table";

export type RowHighlightingOptions = {
  /**
   * Called with an updater when the highlighted row changes. Pass it with
   * `state.highlightedRowId` to control the highlighted row.
   */
  onHighlightedRowIdChange?: (updater: Updater<null | string>) => void;
};

export type RowHighlightingRow = {
  /**
   * Whether this row is the table's highlighted row.
   */
  getIsHighlighted(): boolean;
};

export type RowHighlightingState = {
  /**
   * The id of the highlighted row, or `null` when no row is highlighted.
   */
  highlightedRowId: null | string;
};

export type RowHighlightingTable = {
  /**
   * Sets the highlighted row back to `initialState.highlightedRowId`, or to
   * none.
   */
  resetHighlightedRowId(): void;
  setHighlightedRowId(updater: Updater<null | string>): void;
};

type Updater<T> = ((old: T) => T) | T;

declare module "@tanstack/react-table" {
  interface Plugins {
    rowHighlightingFeature: typeof rowHighlightingFeature;
  }
  interface Row_FeatureMap<
    TFeatures extends TableFeatures,
    TData extends RowData,
  > {
    rowHighlightingFeature: RowHighlightingRow;
  }
  interface Table_FeatureMap<
    TFeatures extends TableFeatures,
    TData extends RowData,
  > {
    rowHighlightingFeature: RowHighlightingTable;
  }
  interface TableOptions_FeatureMap<
    TFeatures extends TableFeatures,
    TData extends RowData,
  > {
    rowHighlightingFeature: RowHighlightingOptions;
  }
  interface TableState_FeatureMap {
    rowHighlightingFeature: RowHighlightingState;
  }
}

/**
 * What the feature's hooks read from the table v9 hands them.
 */
type FeatureTable = RowHighlightingTable & {
  atoms: { highlightedRowId: { get(): null | string } };
  baseAtoms: {
    highlightedRowId: {
      set(updater: (old: null | string) => null | string): void;
    };
  };
  initialState: Partial<RowHighlightingState>;
  options: RowHighlightingOptions & {
    atoms?: {
      highlightedRowId?: {
        set(updater: (old: null | string) => null | string): void;
      };
    };
  };
};

const update = <T>(updater: Updater<T>, old: T) =>
  typeof updater === "function" ? (updater as (old: T) => T)(old) : updater;

/**
 * A TanStack Table v9 feature that puts `DataTable`'s highlighted row (the
 * row the keyboard is on, and where Tab lands) in table state, so the app can
 * read it, follow it, and set it.
 *
 * Register it with `tableFeatures({ rowHighlightingFeature })`. The table gets
 * a `highlightedRowId` state slice, an `onHighlightedRowIdChange` option and
 * `setHighlightedRowId()`/`resetHighlightedRowId()`; rows get
 * `getIsHighlighted()`. Focusing a row, clicking it and the arrow keys move
 * the highlight. Setting it moves the tab stop, not focus.
 *
 * It doesn't import TanStack Table at runtime. TanStack Table v8 has no
 * per-table features, so v8 tables keep the highlight internal.
 *
 * @category data-display
 * @group DataTable
 * @since 3.7.0
 */
export const rowHighlightingFeature = {
  assignRowPrototype: (prototype: object) => {
    (prototype as RowHighlightingRow).getIsHighlighted = function (this: {
      id: string;
      table: FeatureTable;
    }) {
      return this.table.atoms.highlightedRowId.get() === this.id;
    };
  },
  constructTableAPIs: (instance: unknown) => {
    const table = instance as FeatureTable;
    table.setHighlightedRowId = (updater) =>
      table.options.onHighlightedRowIdChange?.((old) => update(updater, old));
    table.resetHighlightedRowId = () =>
      table.setHighlightedRowId(table.initialState.highlightedRowId ?? null);
  },
  // Not TanStack's `makeStateUpdater`: that would import it at runtime.
  getDefaultTableOptions: (table: unknown): RowHighlightingOptions => ({
    onHighlightedRowIdChange: (updater) => {
      const { baseAtoms, options } = table as FeatureTable;
      (options.atoms?.highlightedRowId ?? baseAtoms.highlightedRowId).set(
        (old) => update(updater, old),
      );
    },
  }),
  getInitialState: <TState>(state: TState) => ({
    highlightedRowId: null,
    ...state,
  }),
};
