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
  Pick<PropItem, "type">;

export type Prop = Pick<
  PropItem,
  "defaultValue" | "description" | "name" | "required" | "type"
> & {
  /** Fields of an object-typed prop, one level deep */
  properties?: Properties;
  sprinkle?: true;
};

export type Properties = {
  /** The prop holds an array of this object type */
  array?: true;
  fields: Record<string, Field>;
  /** Name of the object type, when it has one */
  name?: string;
  /** The prop also accepts primitives or `null` */
  union?: true;
};

export function getDocs(): ComponentDoc[];
