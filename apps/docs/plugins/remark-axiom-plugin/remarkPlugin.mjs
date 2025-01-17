import { transformDesignTokens } from "./transformDesignTokens.mjs";

export function remarkPlugin() {
  return (tree, file) => {
    transformDesignTokens(tree, file);
  };
}
