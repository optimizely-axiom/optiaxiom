import type { FocusBookmarks } from "@optiaxiom/globals";

import * as globals from "@optiaxiom/globals";

/**
 * The page-wide registry from `@optiaxiom/globals`, or `undefined` when an
 * older shared globals (module federation) predates it. Read off the namespace
 * so a missing export is undefined rather than a crash.
 */
export const focusBookmarks = (globals as { focusBookmarks?: FocusBookmarks })
  .focusBookmarks;
