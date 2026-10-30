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

export type Prop = Pick<
  PropItem,
  "defaultValue" | "description" | "name" | "required" | "type"
> & {
  sprinkle?: true;
};

export function getDocs(): ComponentDoc[];
