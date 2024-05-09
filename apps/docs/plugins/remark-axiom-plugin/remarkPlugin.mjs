import { transformCode } from "./transformCode.mjs";
import { transformDemos } from "./transformDemos.mjs";
import { transformLayout } from "./transformLayout.mjs";
import { transformPropsTable } from "./transformPropsTable.mjs";

export function remarkPlugin() {
  return (tree, file) => {
    transformCode(tree, file);
    transformDemos(tree, file);
    transformLayout(tree, file);
    transformPropsTable(tree, file);
  };
}
