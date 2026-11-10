import type { PropItem } from "react-docgen-typescript";

export type ComponentDoc = {
  description?: string;
  displayName: string;
  entryPoint?: string;
  props: Prop[];
  source: string;
  tags: {
    [key: string]: string | undefined;
    example?: string;
    extends?: string;
  };
};

export type Field = Partial<
  Pick<PropItem, "defaultValue" | "description" | "required">
> &
  Pick<PropItem, "type"> & {
    /** Structure of a field holding the library's own object types */
    shape?: Shape;
  };

export type Prop = Pick<
  PropItem,
  "defaultValue" | "description" | "name" | "required" | "type"
> & {
  /** Structure of a prop holding the library's own object types */
  shape?: Shape;
  sprinkle?: true;
};

/**
 * A type's structure: a union, a literal, an object's fields (and its type
 * name), an array's elements, a primitive, or a string-keyed record's values
 */
export type Shape =
  | { anyOf: Shape[] }
  | { const: boolean | number | string }
  | { fields: Record<string, Field>; name?: string }
  | { items: Shape }
  | { type: "boolean" | "null" | "number" | "string" }
  | { values: Shape };

export function getDocs(): ComponentDoc[];
