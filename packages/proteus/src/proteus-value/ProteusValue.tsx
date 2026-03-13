import { useProteusValue } from "../proteus-document/useProteusValue";

export type ProteusValueProps = {
  /**
   * Format to apply to cell values (e.g. 'Number', 'DateTime')
   */
  formatter?:
    | "DateTime"
    | "Number"
    | {
        /**
         * Options passed to the Intl formatter constructor (e.g.,
         * Intl.DateTimeFormatOptions or Intl.NumberFormatOptions)
         */
        options?: Record<string, unknown>;
        /**
         * Formatter type
         */
        type: "DateTime" | "Number";
      };
  /**
   * Path to a value in the data. Absolute paths start with '/' and resolve from
   * the root (e.g., '/title', '/options/0/label'). Inside a Map template, paths
   * without a leading '/' are relative to the current item (e.g., 'title'
   * resolves to each item's 'title' field).
   */
  path: string;
};

export function ProteusValue(props: ProteusValueProps) {
  return useProteusValue(props);
}

ProteusValue.displayName = "@optiaxiom/proteus/ProteusValue";
