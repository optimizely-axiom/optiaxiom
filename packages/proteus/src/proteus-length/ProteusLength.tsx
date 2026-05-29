import { useProteusValue } from "../use-proteus-value";

export type ProteusLengthProps = {
  /**
   * JSON pointer path to the array whose length should be returned (e.g.
   * '/urls'). Resolves to 0 when the value is missing or not an array.
   */
  path: string;
};

export function ProteusLength({ path }: ProteusLengthProps) {
  const value = useProteusValue({ path });
  return Array.isArray(value) ? value.length : 0;
}

ProteusLength.displayName = "@optiaxiom/proteus/ProteusLength";
