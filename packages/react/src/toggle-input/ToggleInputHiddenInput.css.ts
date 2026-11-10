import { VISUALLY_HIDDEN_STYLES } from "@radix-ui/react-visually-hidden";

import { createVar, getVarName, style } from "../vanilla-extract";

/**
 * Scoped to each toggle root, so every control can share one anchor name.
 */
export const controlAnchor = getVarName(createVar());

/**
 * Lies invisibly over the control's border box, so a click on the control
 * lands on the input itself (browser test runners click an element's centre
 * and check it receives the event) and focusing it scrolls the control into
 * view. Anchored rather than sized from the control, whose border width
 * animates between states.
 */
export const className = style({
  appearance: "none",
  cursor: "inherit",
  height: "anchor-size(height)",
  left: "anchor(left)",
  margin: 0,
  opacity: 0,
  padding: 0,
  position: "absolute",
  positionAnchor: controlAnchor,
  top: "anchor(top)",
  width: "anchor-size(width)",
  zIndex: "1",

  selectors: {
    /**
     * Some engines don't dispatch mouse events from disabled form controls, so
     * let them reach the label underneath.
     */
    "&:disabled": {
      pointerEvents: "none",
    },
  },

  "@supports": {
    "not (anchor-name: --a)": {
      ...VISUALLY_HIDDEN_STYLES,
      left: 0,
      top: 0,
    },
  },
});
