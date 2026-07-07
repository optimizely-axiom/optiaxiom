import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" p="24" style={{ background: "#008080" }} w="full">
      <ProteusDocumentRenderer
        element={{
          $type: "Document",
          actions: [
            { $type: "Action", appearance: "primary", children: "OK" },
            { $type: "Button", children: "Cancel" },
          ],
          appName: "System Properties",
          body: [
            {
              $type: "Text",
              children:
                "The same document, re-skinned into a Windows 98 dialog purely through the themeOverride prop — the element tree is unchanged.",
              fontSize: "sm",
            },
            {
              $type: "Group",
              children: [
                { $type: "Badge", children: "Ready", intent: "success" },
                { $type: "Badge", children: "Error", intent: "danger" },
              ],
              flexDirection: "row",
              gap: "8",
            },
          ],
          subtitle: "General · Device Manager · Hardware Profiles",
          title: "Display Properties",
        }}
        // A partial of the `theme` contract. Only the tokens listed here are
        // overridden — everything else inherits the ambient theme, and the
        // overrides are scoped to this document. Note the primary button face
        // (`bg.accent`) stays light: its label uses a dark `fg.*` token, so a
        // dark face would be unreadable.
        themeOverride={{
          borderRadius: {
            xs: "0",
            sm: "0",
            md: "0",
            lg: "0",
            xl: "0",
            full: "0",
          },
          colors: {
            "bg.accent": "#7bc5c5",
            "bg.accent.hovered": "#5fb0b0",
            "bg.accent.subtle": "#000080",
            "bg.default": "#c0c0c0",
            "bg.page": "#c0c0c0",
            "bg.pill.default": "#c0c0c0",
            "border.default": "#000000",
            "border.secondary": "#808080",
            "border.tertiary": "#808080",
            "fg.default": "#000000",
            "fg.secondary": "#000080",
            "fg.tertiary": "#404040",
          },
          fontFamily: {
            heading: "'MS Sans Serif', Tahoma, Geneva, sans-serif",
            sans: "'MS Sans Serif', Tahoma, Geneva, sans-serif",
          },
        }}
      />
    </Box>
  );
}
