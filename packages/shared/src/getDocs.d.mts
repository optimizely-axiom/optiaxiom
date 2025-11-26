import type { PropItem } from "react-docgen-typescript";

export type ComponentDoc = {
  description?: string;
  displayName: string;
  props: Prop[];
  tags: {
    [key: string]: string | undefined;
    example?: string;
    extends?: string;
  };
};

export type Prop = Pick<
  PropItem,
  "defaultValue" | "description" | "name" | "required" | "type"
> & {
  sprinkle?: true;
};

export function getDocs(): ComponentDoc[];
