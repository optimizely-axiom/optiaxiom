import type { CommandOption } from "../command/internals";

import { resolveItemProperty } from "../command/internals";
import { useSurface } from "../surface";
import { filterSuggestionsBySurface } from "../surface/internals";

/**
 * Hook to track menu item interactions with surface context.
 * Handles property changes/toggles and accepts matching suggestions.
 */
export function useMenuSurface() {
  const surface = useSurface();

  return (item: CommandOption) => {
    if (!item.surface || !surface) {
      return;
    }

    const allSuggestions = surface.suggestions?.filter(
      (s) => s.type === "value",
    );
    const itemSurface = item.surface;

    if (itemSurface.type === "property") {
      // Check if this selection matches a suggestion
      const itemSuggestions = filterSuggestionsBySurface(
        allSuggestions,
        surface.path,
        [
          {
            name: itemSurface.name,
            type: "property",
          },
        ],
      );
      const matchingSuggestion = itemSuggestions?.find(
        (s) => s.value === itemSurface.value,
      );

      if (item.multi || item.switch) {
        // Toggle
        surface.track(
          {
            checked: !resolveItemProperty(item.selected),
            name: "toggled",
          },
          {
            [itemSurface.name]: {
              data: itemSurface.data,
              type: "property",
            },
          },
        );
      } else if ("selected" in item) {
        // Selection
        surface.track(
          {
            name: "changed",
            value: itemSurface.value,
          },
          {
            [itemSurface.name]: {
              data: itemSurface.data,
              type: "property",
            },
          },
        );
      }

      // Accept suggestion if this selection matches
      if (matchingSuggestion) {
        surface.accept(matchingSuggestion.id);
      }
    } else if (itemSurface.type === "action") {
      // Custom interaction on parent surface
      surface.track(
        { name: "invoked" },
        {
          [itemSurface.name]: {
            type: "action",
          },
        },
      );
    }
  };
}
