import * as installed from "@tanstack/react-table";

/**
 * Stands in for `@tanstack/react-table` in the React 17 run, which installs
 * TanStack Table v8 (v9 requires React 18). Maps the v9 API the specs use onto
 * v8: feature slots become `get*RowModel()` options. A v8 table always has
 * every feature, so the feature objects are placeholders.
 */
export * from "@tanstack/react-table";

// Typed as v9 here; the React 17 run resolves the module to v8.
const v8 = installed as unknown as {
  getCoreRowModel(): unknown;
  getSortedRowModel(): unknown;
  useReactTable(options: object): unknown;
};

export const rowSortingFeature = {};
export const sortFns = {};
export const tableFeatures = <T extends object>(features: T) => features;

export const createSortedRowModel = () => v8.getSortedRowModel();

export function useTable({
  features,
  ...options
}: {
  features: { sortedRowModel?: unknown };
}) {
  return v8.useReactTable({
    ...options,
    getCoreRowModel: v8.getCoreRowModel(),
    getSortedRowModel: features.sortedRowModel,
  });
}
