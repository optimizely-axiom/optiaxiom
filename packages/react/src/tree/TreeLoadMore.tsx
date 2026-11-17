import {
  TreeItem as UiTreeItem,
  TreeItemLabel as UiTreeItemLabel,
} from "@ui-sdk/react/tree";

import { Box } from "../box";
import { Spinner } from "../spinner";
import { Text } from "../text";
import { moreValueOf, type TreeOption, useTreeContext } from "./TreeContext";
import * as styles from "./TreeItem.css";

export type TreeLoadMoreProps = {
  /**
   * The item whose next page of children it loads.
   */
  parent: TreeOption;
};

/**
 * Ends a level that has more pages, labelled with the `nextPageLabel` its
 * `children` returned. Pressing it, or Enter on it, loads the next page; the
 * tree's `onAction` runs it, and its value is never selected.
 */
export function TreeLoadMore({ parent }: TreeLoadMoreProps) {
  const { loaded, loadingMore } = useTreeContext(
    "@optiaxiom/react/TreeLoadMore",
  );
  const label = loaded[parent.value]?.nextPageLabel ?? "";

  return (
    <UiTreeItem
      label={label}
      render={<Box {...styles.item()} />}
      value={moreValueOf(parent.value)}
    >
      <Box {...styles.row({ editing: false })}>
        <Box
          alignItems="center"
          display="flex"
          flex="none"
          justifyContent="center"
          size="sm"
        >
          {loadingMore[parent.value] && <Spinner size="2xs" />}
        </Box>

        <UiTreeItemLabel
          render={
            <Text asChild color="fg.secondary" truncate>
              <span>{label}</span>
            </Text>
          }
        />
      </Box>
    </UiTreeItem>
  );
}

TreeLoadMore.displayName = "@optiaxiom/react/TreeLoadMore";
