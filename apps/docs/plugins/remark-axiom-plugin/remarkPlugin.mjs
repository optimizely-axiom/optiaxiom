import { transformColorTokens } from "./transformColorTokens.mjs";
import { transformDemos } from "./transformDemos.mjs";
import { transformPropsTable } from "./transformPropsTable.mjs";

export function remarkPlugin() {
  return (tree, file) => {
    transformColorTokens(tree, file);
    transformDemos(tree, file);
    transformPropsTable(tree, file);
  };
}
