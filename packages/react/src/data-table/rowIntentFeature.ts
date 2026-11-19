import type { Row, RowData, TableFeatures } from "@tanstack/react-table";

export type RowIntent = "primary";

export type RowIntentOptions<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = {
  /**
   * The row's background color. `primary` is the selected rows' color, so a
   * row can look selected without being in the selection. Leave it unset for
   * the default background.
   */
  getRowIntent?: (row: Row<TFeatures, TData>) => RowIntent | undefined;
};

export type RowIntentRow = {
  /**
   * The row's intent from `getRowIntent`.
   */
  getIntent(): RowIntent | undefined;
};

declare module "@tanstack/react-table" {
  interface Plugins {
    rowIntentFeature: typeof rowIntentFeature;
  }
  interface Row_FeatureMap<
    TFeatures extends TableFeatures,
    TData extends RowData,
  > {
    rowIntentFeature: RowIntentRow;
  }
  interface TableOptions_FeatureMap<
    TFeatures extends TableFeatures,
    TData extends RowData,
  > {
    rowIntentFeature: RowIntentOptions<TFeatures, TData>;
  }
}

/**
 * The row the prototype method runs on.
 */
type FeatureRow = {
  table: {
    options: { getRowIntent?: (row: FeatureRow) => RowIntent | undefined };
  };
};

/**
 * A TanStack Table v9 feature that colors `DataTable` rows. `getRowIntent`
 * reads each row, so the app keeps the state the color describes, such as
 * the row a details pane shows.
 *
 * Register it with `tableFeatures({ rowIntentFeature })` and pass
 * `getRowIntent`; rows get `getIntent()`.
 *
 * It doesn't import TanStack Table at runtime. TanStack Table v8 has no
 * per-table features, so v8 rows keep the default background.
 *
 * @category data-display
 * @group DataTable
 * @since 3.7.0
 */
export const rowIntentFeature = {
  assignRowPrototype: (prototype: object) => {
    Object.assign(prototype, {
      getIntent(this: FeatureRow) {
        return this.table.options.getRowIntent?.(this);
      },
    });
  },
};
