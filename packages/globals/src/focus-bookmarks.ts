type Layer = { bookmarks: HTMLElement[]; depth: number; order: number };

const BOOKMARK_LIMIT = 5;

export type FocusBookmarks = ReturnType<typeof createFocusBookmarks>;

/**
 * Tracks recently focused elements per overlay layer (the app root, each open
 * dialog or popover). Lives in this package so every copy of
 * `@optiaxiom/react` on the page shares one registry.
 */
const createFocusBookmarks = () => {
  const layers = new Set<Layer>();
  let mounts = 0;

  return {
    /**
     * Register a layer nested `depth` levels below the root. Call `remove` when
     * the layer unmounts.
     */
    add: (depth: number) => {
      const layer: Layer = { bookmarks: [], depth, order: ++mounts };
      layers.add(layer);

      return {
        record: (element: HTMLElement) => {
          layer.bookmarks = layer.bookmarks.filter((item) => item !== element);
          layer.bookmarks.push(element);
          if (layer.bookmarks.length > BOOKMARK_LIMIT) {
            layer.bookmarks.shift();
          }
        },
        remove: () => {
          layers.delete(layer);
        },
      };
    },
    /**
     * Focus the most recent bookmark that can take focus, starting from the
     * innermost open layer. Ordered by depth rather than mount order: a remote
     * rendered inside a host dialog mounts its root layer after that dialog.
     */
    restore: () => {
      const ordered = [...layers].sort(
        (a, b) => b.depth - a.depth || b.order - a.order,
      );
      for (const layer of ordered) {
        layer.bookmarks = layer.bookmarks.filter(
          (element) => element.isConnected,
        );
        // Keep elements that refuse focus: an open dialog's focus trap can
        // redirect it, and they're still valid targets once that dialog closes.
        for (const element of [...layer.bookmarks].reverse()) {
          element.focus();
          if (document.activeElement === element) {
            return;
          }
        }
      }
    },
  };
};

export const focusBookmarks = createFocusBookmarks();
