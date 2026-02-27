// This file is auto-generated. Do not edit manually.
// Run `pnpm proteus-spec` to regenerate.

import { z } from "zod/v4";

type ProteusNode = ProteusElement | ProteusElement[] | string;

// Shared sprinkle prop schemas
export const alignItemsSprinkleSchema = z
  .union([
    z.literal("normal"),
    z.literal("stretch"),
    z.literal("center"),
    z.literal("end"),
    z.literal("start"),
  ])
  .describe("Set the element's `align-items` CSS property");

export const alignSelfSprinkleSchema = z
  .union([
    z.literal("normal"),
    z.literal("stretch"),
    z.literal("center"),
    z.literal("end"),
    z.literal("start"),
  ])
  .describe("Set the element's `align-self` CSS property");

export const animationSprinkleSchema = z
  .union([z.literal("ping"), z.literal("pulse"), z.literal("spin")])
  .describe("Animate element with CSS animations");

export const backgroundImageSprinkleSchema = z
  .literal("gradient.opal")
  .describe("Set the element's `background-image` CSS property");

export const bgSprinkleSchema = z
  .union([
    z.literal("transparent"),
    z.literal("bg.accent"),
    z.literal("bg.accent.hovered"),
    z.literal("bg.accent.light"),
    z.literal("bg.accent.pressed"),
    z.literal("bg.accent.subtle"),
    z.literal("bg.avatar.neutral"),
    z.literal("bg.avatar.purple"),
    z.literal("bg.default"),
    z.literal("bg.default.hovered"),
    z.literal("bg.default.inverse"),
    z.literal("bg.default.inverse.hovered"),
    z.literal("bg.default.inverse.pressed"),
    z.literal("bg.default.pressed"),
    z.literal("bg.error"),
    z.literal("bg.error.hovered"),
    z.literal("bg.error.light"),
    z.literal("bg.error.pressed"),
    z.literal("bg.error.subtle"),
    z.literal("bg.error.subtlest"),
    z.literal("bg.information"),
    z.literal("bg.information.light"),
    z.literal("bg.information.subtle"),
    z.literal("bg.overlay"),
    z.literal("bg.page"),
    z.literal("bg.secondary"),
    z.literal("bg.secondary.hovered"),
    z.literal("bg.spinner.default"),
    z.literal("bg.spinner.inverse"),
    z.literal("bg.success"),
    z.literal("bg.success.hovered"),
    z.literal("bg.success.light"),
    z.literal("bg.success.subtle"),
    z.literal("bg.tertiary"),
    z.literal("bg.tertiary.hovered"),
    z.literal("bg.warning"),
    z.literal("bg.warning.hovered"),
    z.literal("bg.warning.light"),
    z.literal("bg.warning.subtle"),
    z.literal("current"),
  ])
  .describe(
    "Set the element's background color. Only accepts predefined color tokens starting with `bg.` (e.g., `bg.default`, `bg.accent`, `bg.error`), or the special values `current` and `transparent`.",
  );

export const borderSprinkleSchema = z
  .union([z.literal("2"), z.literal("0"), z.literal("1")])
  .describe("Set the element's `border-width` CSS property");

export const borderBSprinkleSchema = z
  .union([z.literal("2"), z.literal("0"), z.literal("1")])
  .describe("Set the element's `border-bottom-width` CSS property");

export const borderColorSprinkleSchema = z
  .union([
    z.literal("transparent"),
    z.literal("border.accent"),
    z.literal("border.control"),
    z.literal("border.control.hovered"),
    z.literal("border.default"),
    z.literal("border.disabled"),
    z.literal("border.error"),
    z.literal("border.focus"),
    z.literal("border.focus.error"),
    z.literal("border.secondary"),
    z.literal("border.success"),
    z.literal("border.tertiary"),
    z.literal("border.warning"),
    z.literal("current"),
  ])
  .describe(
    "Set the element's border color. Only accepts predefined color tokens starting with `border.` (e.g., `border.default`, `border.accent`, `border.error`), or the special values `current` and `transparent`.",
  );

export const borderLSprinkleSchema = z
  .union([z.literal("2"), z.literal("0"), z.literal("1")])
  .describe("Set the element's `border-left-width` CSS property");

export const borderRSprinkleSchema = z
  .union([z.literal("2"), z.literal("0"), z.literal("1")])
  .describe("Set the element's `border-right-width` CSS property");

export const borderTSprinkleSchema = z
  .union([z.literal("2"), z.literal("0"), z.literal("1")])
  .describe("Set the element's `border-top-width` CSS property");

export const colorSprinkleSchema = z
  .union([
    z.literal("transparent"),
    z.literal("fg.accent"),
    z.literal("fg.accent.hovered"),
    z.literal("fg.accent.strong"),
    z.literal("fg.avatar.neutral"),
    z.literal("fg.avatar.purple"),
    z.literal("fg.default"),
    z.literal("fg.default.inverse"),
    z.literal("fg.disabled"),
    z.literal("fg.error"),
    z.literal("fg.error.hovered"),
    z.literal("fg.error.light"),
    z.literal("fg.error.strong"),
    z.literal("fg.information"),
    z.literal("fg.information.light"),
    z.literal("fg.information.strong"),
    z.literal("fg.link.default"),
    z.literal("fg.link.default.hovered"),
    z.literal("fg.link.inverse"),
    z.literal("fg.link.subtle"),
    z.literal("fg.link.visited"),
    z.literal("fg.secondary"),
    z.literal("fg.spinner.default"),
    z.literal("fg.spinner.inverse"),
    z.literal("fg.success"),
    z.literal("fg.success.hovered"),
    z.literal("fg.success.light"),
    z.literal("fg.success.strong"),
    z.literal("fg.tertiary"),
    z.literal("fg.warning"),
    z.literal("fg.warning.hovered"),
    z.literal("fg.warning.inverse"),
    z.literal("fg.warning.light"),
    z.literal("fg.warning.strong"),
    z.literal("fg.white"),
    z.literal("current"),
  ])
  .describe(
    "Set the element's text color. Only accepts predefined color tokens starting with `fg.` (e.g., `fg.default`, `fg.accent`, `fg.error`), or the special values `current` and `transparent`.",
  );

export const cursorSprinkleSchema = z
  .union([z.literal("default"), z.literal("pointer"), z.literal("text")])
  .describe("Set the element's `cursor` CSS property");

export const displaySprinkleSchema = z
  .union([
    z.literal("flex"),
    z.literal("grid"),
    z.literal("none"),
    z.literal("block"),
    z.literal("inline"),
    z.literal("table"),
    z.literal("table-cell"),
    z.literal("table-row"),
    z.literal("inline-block"),
    z.literal("inline-flex"),
  ])
  .describe("Set the element's `display` CSS property");

export const flexSprinkleSchema = z
  .union([
    z.literal("initial"),
    z.literal("none"),
    z.literal("auto"),
    z.literal("1"),
  ])
  .describe("Set the element's `flex` CSS property");

export const flexDirectionSprinkleSchema = z
  .union([
    z.literal("column"),
    z.literal("column-reverse"),
    z.literal("row"),
    z.literal("row-reverse"),
  ])
  .describe("Set the element's `flex-direction` CSS property");

export const flexWrapSprinkleSchema = z
  .union([z.literal("nowrap"), z.literal("wrap")])
  .describe("Set the element's `flex-wrap` CSS property");

export const fontFamilySprinkleSchema = z
  .union([z.literal("mono"), z.literal("sans")])
  .describe(
    "Set the element's font family. Only accepts predefined fontFamily tokens.",
  );

export const fontSizeSprinkleSchema = z
  .union([
    z.literal("inherit"),
    z.literal("xs"),
    z.literal("sm"),
    z.literal("md"),
    z.literal("lg"),
    z.literal("xl"),
    z.literal("2xl"),
    z.literal("3xl"),
    z.literal("4xl"),
  ])
  .describe(
    "Set the element's font size and line height (both properties are set together). Only accepts predefined fontSize tokens.",
  );

export const fontWeightSprinkleSchema = z
  .union([
    z.literal("inherit"),
    z.literal("600"),
    z.literal("400"),
    z.literal("500"),
    z.literal("700"),
  ])
  .describe("Set the element's `font-weight` CSS property");

export const gapSprinkleSchema = z
  .union([
    z.literal("2"),
    z.literal("4"),
    z.literal("6"),
    z.literal("8"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("48"),
    z.literal("80"),
    z.literal("0"),
    z.literal("64"),
  ])
  .describe("Set the element's `gap` CSS property");

export const gridColumnSprinkleSchema = z
  .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
  .describe("Set the element's size across grid columns");

export const gridTemplateColumnsSprinkleSchema = z
  .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
  .describe("Control number of columns in a grid layout");

export const hSprinkleSchema = z
  .union([
    z.literal("auto"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("384"),
    z.literal("48"),
    z.literal("80"),
    z.literal("xs"),
    z.literal("sm"),
    z.literal("md"),
    z.literal("lg"),
    z.literal("xl"),
    z.literal("full"),
    z.literal("3xl"),
    z.literal("2xs"),
    z.literal("0"),
    z.literal("64"),
    z.literal("56"),
    z.literal("224"),
    z.literal("1/2"),
    z.literal("1/3"),
    z.literal("2/3"),
    z.literal("1/4"),
    z.literal("3/4"),
    z.literal("fit"),
    z.literal("max"),
    z.literal("min"),
  ])
  .describe("Set the element's height. Only accepts predefined size tokens.");

export const justifyContentSprinkleSchema = z
  .union([
    z.literal("normal"),
    z.literal("space-around"),
    z.literal("space-between"),
    z.literal("space-evenly"),
    z.literal("stretch"),
    z.literal("center"),
    z.literal("end"),
    z.literal("flex-end"),
    z.literal("flex-start"),
    z.literal("start"),
  ])
  .describe("Set the element's `justify-content` CSS property");

export const justifyItemsSprinkleSchema = z
  .union([
    z.literal("normal"),
    z.literal("stretch"),
    z.literal("center"),
    z.literal("end"),
    z.literal("start"),
  ])
  .describe("Set the element's `justify-items` CSS property");

export const mSprinkleSchema = z
  .union([
    z.literal("auto"),
    z.literal("2"),
    z.literal("4"),
    z.literal("6"),
    z.literal("8"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("48"),
    z.literal("80"),
    z.literal("0"),
    z.literal("64"),
  ])
  .describe(
    "Set the element's margin on all sides. Only accepts predefined spacing tokens.",
  );

export const maxHSprinkleSchema = z
  .union([
    z.literal("xs"),
    z.literal("sm"),
    z.literal("md"),
    z.literal("lg"),
    z.literal("full"),
  ])
  .describe(
    "Set the element's maximum height. Only accepts predefined maxSize tokens.",
  );

export const maxWSprinkleSchema = z
  .union([
    z.literal("xs"),
    z.literal("sm"),
    z.literal("md"),
    z.literal("lg"),
    z.literal("full"),
  ])
  .describe(
    "Set the element's maximum width. Only accepts predefined maxSize tokens.",
  );

export const mbSprinkleSchema = z
  .union([
    z.literal("auto"),
    z.literal("2"),
    z.literal("4"),
    z.literal("6"),
    z.literal("8"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("48"),
    z.literal("80"),
    z.literal("0"),
    z.literal("64"),
  ])
  .describe(
    "Set the element's bottom margin. Only accepts predefined spacing tokens.",
  );

export const mlSprinkleSchema = z
  .union([
    z.literal("auto"),
    z.literal("2"),
    z.literal("4"),
    z.literal("6"),
    z.literal("8"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("48"),
    z.literal("80"),
    z.literal("0"),
    z.literal("64"),
  ])
  .describe(
    "Set the element's left margin. Only accepts predefined spacing tokens.",
  );

export const mrSprinkleSchema = z
  .union([
    z.literal("auto"),
    z.literal("2"),
    z.literal("4"),
    z.literal("6"),
    z.literal("8"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("48"),
    z.literal("80"),
    z.literal("0"),
    z.literal("64"),
  ])
  .describe(
    "Set the element's right margin. Only accepts predefined spacing tokens.",
  );

export const mtSprinkleSchema = z
  .union([
    z.literal("auto"),
    z.literal("2"),
    z.literal("4"),
    z.literal("6"),
    z.literal("8"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("48"),
    z.literal("80"),
    z.literal("0"),
    z.literal("64"),
  ])
  .describe(
    "Set the element's top margin. Only accepts predefined spacing tokens.",
  );

export const mxSprinkleSchema = z
  .union([
    z.literal("auto"),
    z.literal("2"),
    z.literal("4"),
    z.literal("6"),
    z.literal("8"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("48"),
    z.literal("80"),
    z.literal("0"),
    z.literal("64"),
  ])
  .describe(
    "Set the element's left and right margin. Only accepts predefined spacing tokens.",
  );

export const mySprinkleSchema = z
  .union([
    z.literal("auto"),
    z.literal("2"),
    z.literal("4"),
    z.literal("6"),
    z.literal("8"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("48"),
    z.literal("80"),
    z.literal("0"),
    z.literal("64"),
  ])
  .describe(
    "Set the element's top and bottom margin. Only accepts predefined spacing tokens.",
  );

export const objectFitSprinkleSchema = z
  .union([
    z.literal("contain"),
    z.literal("fill"),
    z.literal("none"),
    z.literal("cover"),
  ])
  .describe("Set the element's `object-fit` CSS property");

export const overflowSprinkleSchema = z
  .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
  .describe("Set the element's `overflow` CSS property");

export const overflowXSprinkleSchema = z
  .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
  .describe("Set the element's `overflow-x` CSS property");

export const overflowYSprinkleSchema = z
  .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
  .describe("Set the element's `overflow-y` CSS property");

export const pSprinkleSchema = z
  .union([
    z.literal("2"),
    z.literal("4"),
    z.literal("6"),
    z.literal("8"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("48"),
    z.literal("80"),
    z.literal("0"),
    z.literal("64"),
  ])
  .describe(
    "Set the element's padding on all sides. Only accepts predefined spacing tokens.",
  );

export const pbSprinkleSchema = z
  .union([
    z.literal("2"),
    z.literal("4"),
    z.literal("6"),
    z.literal("8"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("48"),
    z.literal("80"),
    z.literal("0"),
    z.literal("64"),
  ])
  .describe(
    "Set the element's bottom padding. Only accepts predefined spacing tokens.",
  );

export const plSprinkleSchema = z
  .union([
    z.literal("2"),
    z.literal("4"),
    z.literal("6"),
    z.literal("8"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("48"),
    z.literal("80"),
    z.literal("0"),
    z.literal("64"),
  ])
  .describe(
    "Set the element's left padding. Only accepts predefined spacing tokens.",
  );

export const placeItemsSprinkleSchema = z
  .literal("center")
  .describe("Set the element's `place-items` CSS property");

export const pointerEventsSprinkleSchema = z
  .union([z.literal("none"), z.literal("auto")])
  .describe("Set the element's `pointer-events` CSS property");

export const prSprinkleSchema = z
  .union([
    z.literal("2"),
    z.literal("4"),
    z.literal("6"),
    z.literal("8"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("48"),
    z.literal("80"),
    z.literal("0"),
    z.literal("64"),
  ])
  .describe(
    "Set the element's right padding. Only accepts predefined spacing tokens.",
  );

export const ptSprinkleSchema = z
  .union([
    z.literal("2"),
    z.literal("4"),
    z.literal("6"),
    z.literal("8"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("48"),
    z.literal("80"),
    z.literal("0"),
    z.literal("64"),
  ])
  .describe(
    "Set the element's top padding. Only accepts predefined spacing tokens.",
  );

export const pxSprinkleSchema = z
  .union([
    z.literal("2"),
    z.literal("4"),
    z.literal("6"),
    z.literal("8"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("48"),
    z.literal("80"),
    z.literal("0"),
    z.literal("64"),
  ])
  .describe(
    "Set the element's left and right padding. Only accepts predefined spacing tokens.",
  );

export const pySprinkleSchema = z
  .union([
    z.literal("2"),
    z.literal("4"),
    z.literal("6"),
    z.literal("8"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("48"),
    z.literal("80"),
    z.literal("0"),
    z.literal("64"),
  ])
  .describe(
    "Set the element's top and bottom padding. Only accepts predefined spacing tokens.",
  );

export const roundedSprinkleSchema = z
  .union([
    z.literal("inherit"),
    z.literal("none"),
    z.literal("xs"),
    z.literal("sm"),
    z.literal("md"),
    z.literal("lg"),
    z.literal("xl"),
    z.literal("full"),
  ])
  .describe(
    "Set the element's border radius. Only accepts predefined borderRadius tokens.",
  );

export const shadowSprinkleSchema = z
  .union([
    z.literal("none"),
    z.literal("sm"),
    z.literal("md"),
    z.literal("lg"),
    z.literal("xl"),
  ])
  .describe(
    "Set the element's box shadow. Only accepts predefined boxShadow tokens.",
  );

export const sizeSprinkleSchema = z
  .union([
    z.literal("auto"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("384"),
    z.literal("48"),
    z.literal("80"),
    z.literal("xs"),
    z.literal("sm"),
    z.literal("md"),
    z.literal("lg"),
    z.literal("xl"),
    z.literal("full"),
    z.literal("3xl"),
    z.literal("2xs"),
    z.literal("0"),
    z.literal("64"),
    z.literal("56"),
    z.literal("224"),
    z.literal("1/2"),
    z.literal("1/3"),
    z.literal("2/3"),
    z.literal("1/4"),
    z.literal("3/4"),
    z.literal("fit"),
    z.literal("max"),
    z.literal("min"),
  ])
  .describe(
    'Set the element\'s width and height. Only accepts predefined size tokens.\n\nWhen width and height are the same, use `size` instead of setting both\n`w` and `h` separately (e.g., prefer `size="24"` over `w="24" h="24"`).',
  );

export const textAlignSprinkleSchema = z
  .union([
    z.literal("center"),
    z.literal("end"),
    z.literal("start"),
    z.literal("justify"),
  ])
  .describe("Set the element's `text-align` CSS property");

export const textTransformSprinkleSchema = z
  .union([z.literal("none"), z.literal("capitalize"), z.literal("uppercase")])
  .describe("Set the element's `text-transform` CSS property");

export const transitionSprinkleSchema = z
  .union([
    z.literal("opacity"),
    z.literal("transform"),
    z.literal("all"),
    z.literal("none"),
    z.literal("colors"),
  ])
  .describe("Control which CSS properties should transition");

export const wSprinkleSchema = z
  .union([
    z.literal("auto"),
    z.literal("12"),
    z.literal("10"),
    z.literal("16"),
    z.literal("20"),
    z.literal("24"),
    z.literal("32"),
    z.literal("40"),
    z.literal("384"),
    z.literal("48"),
    z.literal("80"),
    z.literal("xs"),
    z.literal("sm"),
    z.literal("md"),
    z.literal("lg"),
    z.literal("xl"),
    z.literal("full"),
    z.literal("3xl"),
    z.literal("2xs"),
    z.literal("0"),
    z.literal("64"),
    z.literal("56"),
    z.literal("224"),
    z.literal("1/2"),
    z.literal("1/3"),
    z.literal("2/3"),
    z.literal("1/4"),
    z.literal("3/4"),
    z.literal("fit"),
    z.literal("max"),
    z.literal("min"),
  ])
  .describe("Set the element's width. Only accepts predefined size tokens.");

export const whiteSpaceSprinkleSchema = z
  .literal("nowrap")
  .describe("Set the element's `white-space` CSS property");

export const zSprinkleSchema = z
  .union([
    z.literal("auto"),
    z.literal("tooltip"),
    z.literal("10"),
    z.literal("20"),
    z.literal("popover"),
    z.literal("toast"),
    z.literal("0"),
    z.literal("30"),
  ])
  .describe(
    "Set the element's stacking order. Only accepts predefined zIndex tokens (e.g., popover, toast, tooltip) or numeric values (0, 10, 20, 30, auto).",
  );

export const ProteusAtomicConditionSchema = z
  .union([
    z.object({
      "!=": z
        .array(
          z.union([
            z.string(),
            z.number(),
            z.boolean(),
            z.null(),
            z.object({
              $type: z.literal("Value"),
              path: z
                .string()
                .describe(
                  "JSON pointer path to value (e.g., '/question', '/options/0/label')",
                ),
            }),
          ]),
        )
        .min(2)
        .max(2)
        .describe("Inequality comparison"),
    }),
    z.object({
      "<": z
        .array(
          z.union([
            z.string(),
            z.number(),
            z.boolean(),
            z.null(),
            z.object({
              $type: z.literal("Value"),
              path: z
                .string()
                .describe(
                  "JSON pointer path to value (e.g., '/question', '/options/0/label')",
                ),
            }),
          ]),
        )
        .min(2)
        .max(2)
        .describe("Less than comparison"),
    }),
    z.object({
      "<=": z
        .array(
          z.union([
            z.string(),
            z.number(),
            z.boolean(),
            z.null(),
            z.object({
              $type: z.literal("Value"),
              path: z
                .string()
                .describe(
                  "JSON pointer path to value (e.g., '/question', '/options/0/label')",
                ),
            }),
          ]),
        )
        .min(2)
        .max(2)
        .describe("Less than or equal comparison"),
    }),
    z.object({
      "==": z
        .array(
          z.union([
            z.string(),
            z.number(),
            z.boolean(),
            z.null(),
            z.object({
              $type: z.literal("Value"),
              path: z
                .string()
                .describe(
                  "JSON pointer path to value (e.g., '/question', '/options/0/label')",
                ),
            }),
          ]),
        )
        .min(2)
        .max(2)
        .describe("Equality comparison"),
    }),
    z.object({
      ">": z
        .array(
          z.union([
            z.string(),
            z.number(),
            z.boolean(),
            z.null(),
            z.object({
              $type: z.literal("Value"),
              path: z
                .string()
                .describe(
                  "JSON pointer path to value (e.g., '/question', '/options/0/label')",
                ),
            }),
          ]),
        )
        .min(2)
        .max(2)
        .describe("Greater than comparison"),
    }),
    z.object({
      ">=": z
        .array(
          z.union([
            z.string(),
            z.number(),
            z.boolean(),
            z.null(),
            z.object({
              $type: z.literal("Value"),
              path: z
                .string()
                .describe(
                  "JSON pointer path to value (e.g., '/question', '/options/0/label')",
                ),
            }),
          ]),
        )
        .min(2)
        .max(2)
        .describe("Greater than or equal comparison"),
    }),
    z.object({
      "!!": z
        .union([
          z.string(),
          z.number(),
          z.boolean(),
          z.null(),
          z.object({
            $type: z.literal("Value"),
            path: z
              .string()
              .describe(
                "JSON pointer path to value (e.g., '/question', '/options/0/label')",
              ),
          }),
        ])
        .describe(
          "Truthy check - returns true if value is truthy (not null, undefined, false, 0, or empty string)",
        ),
    }),
  ])
  .describe(
    "Simple comparison condition - single operator only (used in OR arrays to avoid recursion)",
  );

export type ProteusAtomicCondition = z.infer<
  typeof ProteusAtomicConditionSchema
>;

export const ProteusConditionSchema = z
  .union([
    ProteusAtomicConditionSchema,
    z.object({
      or: z
        .array(
          z.union([
            z.object({
              and: z
                .array(ProteusAtomicConditionSchema)
                .min(1)
                .describe(
                  "Logical AND - returns true if all conditions are true",
                ),
            }),
            ProteusAtomicConditionSchema,
          ]),
        )
        .min(1)
        .describe("Logical OR - returns true if any condition is true"),
    }),
  ])
  .describe(
    "Condition for Show component. Can be a comparison operator, logical AND, or logical OR. Supports nesting.",
  );

export type ProteusCondition = z.infer<typeof ProteusConditionSchema>;

export const ProteusDocumentSchema = z
  .object({
    $type: z.literal("Document"),
    actions: z
      .array(
        z.union([
          z.object({
            $type: z.literal("Action"),
            alignItems: alignItemsSprinkleSchema.optional(),
            alignSelf: alignSelfSprinkleSchema.optional(),
            animation: animationSprinkleSchema.optional(),
            appearance: z
              .union([
                z.literal("default"),
                z.literal("danger"),
                z.literal("primary"),
                z.literal("subtle"),
                z.literal("danger-outline"),
                z.literal("default-opal"),
                z.literal("inverse"),
                z.literal("primary-opal"),
              ])
              .describe(
                "Control the appearance by selecting between the different button types.",
              )
              .optional(),
            backgroundImage: backgroundImageSprinkleSchema.optional(),
            bg: bgSprinkleSchema.optional(),
            border: borderSprinkleSchema.optional(),
            borderB: borderBSprinkleSchema.optional(),
            borderColor: borderColorSprinkleSchema.optional(),
            borderL: borderLSprinkleSchema.optional(),
            borderR: borderRSprinkleSchema.optional(),
            borderT: borderTSprinkleSchema.optional(),
            children: z.any().optional(),
            color: colorSprinkleSchema.optional(),
            cursor: cursorSprinkleSchema.optional(),
            display: displaySprinkleSchema.optional(),
            flex: flexSprinkleSchema.optional(),
            flexDirection: flexDirectionSprinkleSchema.optional(),
            flexWrap: flexWrapSprinkleSchema.optional(),
            fontFamily: fontFamilySprinkleSchema.optional(),
            fontSize: fontSizeSprinkleSchema.optional(),
            fontWeight: fontWeightSprinkleSchema.optional(),
            gap: gapSprinkleSchema.optional(),
            gridColumn: gridColumnSprinkleSchema.optional(),
            gridTemplateColumns: gridTemplateColumnsSprinkleSchema.optional(),
            h: hSprinkleSchema.optional(),
            justifyContent: justifyContentSprinkleSchema.optional(),
            justifyItems: justifyItemsSprinkleSchema.optional(),
            m: mSprinkleSchema.optional(),
            maxH: maxHSprinkleSchema.optional(),
            maxW: maxWSprinkleSchema.optional(),
            mb: mbSprinkleSchema.optional(),
            ml: mlSprinkleSchema.optional(),
            mr: mrSprinkleSchema.optional(),
            mt: mtSprinkleSchema.optional(),
            mx: mxSprinkleSchema.optional(),
            my: mySprinkleSchema.optional(),
            objectFit: objectFitSprinkleSchema.optional(),
            onClick: z
              .union([
                z
                  .object({
                    tool: z
                      .string()
                      .describe("Name of registered tool to call"),
                  })
                  .describe("Server-side tool call"),
                z
                  .object({
                    message: z
                      .string()
                      .describe("Message to send to LLM via sendNewMessage()"),
                  })
                  .describe("Client-side message action"),
              ])
              .describe(
                "Handler for user interactions - either a server-side tool call or client-side message",
              )
              .optional(),
            overflow: overflowSprinkleSchema.optional(),
            overflowX: overflowXSprinkleSchema.optional(),
            overflowY: overflowYSprinkleSchema.optional(),
            p: pSprinkleSchema.optional(),
            pb: pbSprinkleSchema.optional(),
            pl: plSprinkleSchema.optional(),
            placeItems: placeItemsSprinkleSchema.optional(),
            pointerEvents: pointerEventsSprinkleSchema.optional(),
            pr: prSprinkleSchema.optional(),
            pt: ptSprinkleSchema.optional(),
            px: pxSprinkleSchema.optional(),
            py: pySprinkleSchema.optional(),
            rounded: roundedSprinkleSchema.optional(),
            shadow: shadowSprinkleSchema.optional(),
            textAlign: textAlignSprinkleSchema.optional(),
            textTransform: textTransformSprinkleSchema.optional(),
            transition: transitionSprinkleSchema.optional(),
            w: wSprinkleSchema.optional(),
            whiteSpace: whiteSpaceSprinkleSchema.optional(),
            z: zSprinkleSchema.optional(),
          }),
          z.object({
            $type: z.literal("CancelAction"),
            alignItems: alignItemsSprinkleSchema.optional(),
            alignSelf: alignSelfSprinkleSchema.optional(),
            animation: animationSprinkleSchema.optional(),
            backgroundImage: backgroundImageSprinkleSchema.optional(),
            bg: bgSprinkleSchema.optional(),
            border: borderSprinkleSchema.optional(),
            borderB: borderBSprinkleSchema.optional(),
            borderColor: borderColorSprinkleSchema.optional(),
            borderL: borderLSprinkleSchema.optional(),
            borderR: borderRSprinkleSchema.optional(),
            borderT: borderTSprinkleSchema.optional(),
            children: z.any().optional(),
            color: colorSprinkleSchema.optional(),
            cursor: cursorSprinkleSchema.optional(),
            display: displaySprinkleSchema.optional(),
            flex: flexSprinkleSchema.optional(),
            flexDirection: flexDirectionSprinkleSchema.optional(),
            flexWrap: flexWrapSprinkleSchema.optional(),
            fontFamily: fontFamilySprinkleSchema.optional(),
            fontSize: fontSizeSprinkleSchema.optional(),
            fontWeight: fontWeightSprinkleSchema.optional(),
            gap: gapSprinkleSchema.optional(),
            gridColumn: gridColumnSprinkleSchema.optional(),
            gridTemplateColumns: gridTemplateColumnsSprinkleSchema.optional(),
            h: hSprinkleSchema.optional(),
            justifyContent: justifyContentSprinkleSchema.optional(),
            justifyItems: justifyItemsSprinkleSchema.optional(),
            m: mSprinkleSchema.optional(),
            maxH: maxHSprinkleSchema.optional(),
            maxW: maxWSprinkleSchema.optional(),
            mb: mbSprinkleSchema.optional(),
            ml: mlSprinkleSchema.optional(),
            mr: mrSprinkleSchema.optional(),
            mt: mtSprinkleSchema.optional(),
            mx: mxSprinkleSchema.optional(),
            my: mySprinkleSchema.optional(),
            objectFit: objectFitSprinkleSchema.optional(),
            overflow: overflowSprinkleSchema.optional(),
            overflowX: overflowXSprinkleSchema.optional(),
            overflowY: overflowYSprinkleSchema.optional(),
            p: pSprinkleSchema.optional(),
            pb: pbSprinkleSchema.optional(),
            pl: plSprinkleSchema.optional(),
            placeholder: z
              .string()
              .describe("Placeholder text for the text input field")
              .optional(),
            placeItems: placeItemsSprinkleSchema.optional(),
            pointerEvents: pointerEventsSprinkleSchema.optional(),
            pr: prSprinkleSchema.optional(),
            pt: ptSprinkleSchema.optional(),
            px: pxSprinkleSchema.optional(),
            py: pySprinkleSchema.optional(),
            rounded: roundedSprinkleSchema.optional(),
            shadow: shadowSprinkleSchema.optional(),
            textAlign: textAlignSprinkleSchema.optional(),
            textTransform: textTransformSprinkleSchema.optional(),
            transition: transitionSprinkleSchema.optional(),
            w: wSprinkleSchema.optional(),
            whiteSpace: whiteSpaceSprinkleSchema.optional(),
            z: zSprinkleSchema.optional(),
          }),
        ]),
      )
      .describe("Actions available for this document")
      .optional(),
    appIcon: z
      .string()
      .describe("A visual representation of the application")
      .optional(),
    appName: z.string().describe("The official name of the application"),
    blocking: z
      .boolean()
      .describe(
        "If true, hides chat prompt and forces user interaction with document. User can press ESC or close to abandon.",
      )
      .optional(),
    body: z.any(),
    subtitle: z
      .string()
      .describe(
        "A brief description or tagline that provides additional context about the Proteus document's purpose.",
      )
      .optional(),
    title: z
      .string()
      .describe(
        "A concise heading that encapsulates the essence of the Proteus document's content or intended action.",
      ),
  })
  .meta({
    examples: [
      { $type: "Document", appName: "Opal", body: [], title: "New Document" },
      {
        $type: "Document",
        actions: [
          {
            $type: "Action",
            appearance: "primary",
            children: "Submit",
            onClick: { tool: "submit_feedback" },
          },
        ],
        appName: "Opal",
        body: [
          {
            $type: "Group",
            children: [
              {
                $type: "Field",
                children: {
                  $type: "Input",
                  name: "name",
                  placeholder: "Enter your name",
                },
                label: "Your Name",
              },
              {
                $type: "Field",
                children: {
                  $type: "Textarea",
                  name: "feedback",
                  placeholder: "What's on your mind?",
                  rows: 4,
                },
                label: "Feedback",
              },
            ],
            flexDirection: "column",
            gap: "16",
          },
        ],
        subtitle: "We'd love to hear from you",
        title: "Submit Feedback",
      },
      {
        $type: "Document",
        actions: [
          {
            $type: "Action",
            appearance: "primary",
            children: "Create Test Plan",
            onClick: { tool: "create_test_plan" },
          },
        ],
        appName: "Opal",
        body: [
          {
            $type: "Group",
            children: [
              {
                $type: "Heading",
                children: "1. Configure your test",
                fontSize: "md",
                fontWeight: "600",
                level: "2",
              },
              {
                $type: "Field",
                children: {
                  $type: "Select",
                  children: [
                    { $type: "SelectTrigger", w: "full" },
                    { $type: "SelectContent" },
                  ],
                  name: "target_by",
                  options: [
                    { label: "URL", value: "url" },
                    { label: "CSS Selector", value: "selector" },
                  ],
                },
                label: "Target by",
              },
              {
                $type: "Show",
                children: {
                  $type: "Field",
                  children: {
                    $type: "Input",
                    name: "url",
                    placeholder: "https://example.com",
                  },
                  label: "URL",
                },
                when: { "==": [{ $type: "Value", path: "/target_by" }, "url"] },
              },
              {
                $type: "Show",
                children: {
                  $type: "Field",
                  children: {
                    $type: "Input",
                    name: "selector",
                    placeholder: "#main-content",
                  },
                  label: "CSS Selector",
                },
                when: {
                  "==": [{ $type: "Value", path: "/target_by" }, "selector"],
                },
              },
            ],
            flexDirection: "column",
            gap: "16",
          },
        ],
        title: "Create Test Plan",
      },
    ],
  });

export type ProteusDocument = Omit<
  z.infer<typeof ProteusDocumentSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusDocumentProps = Omit<
  z.infer<typeof ProteusDocumentSchema>,
  "$type"
>;

export const ProteusEventHandlerSchema = z
  .union([
    z
      .object({ tool: z.string().describe("Name of registered tool to call") })
      .describe("Server-side tool call"),
    z
      .object({
        message: z
          .string()
          .describe("Message to send to LLM via sendNewMessage()"),
      })
      .describe("Client-side message action"),
  ])
  .describe(
    "Handler for user interactions - either a server-side tool call or client-side message",
  );

export type ProteusEventHandler = z.infer<typeof ProteusEventHandlerSchema>;

export const ProteusActionSchema = z
  .object({
    $type: z.literal("Action"),
    alignItems: alignItemsSprinkleSchema.optional(),
    alignSelf: alignSelfSprinkleSchema.optional(),
    animation: animationSprinkleSchema.optional(),
    appearance: z
      .union([
        z.literal("default"),
        z.literal("danger"),
        z.literal("primary"),
        z.literal("subtle"),
        z.literal("danger-outline"),
        z.literal("default-opal"),
        z.literal("inverse"),
        z.literal("primary-opal"),
      ])
      .describe(
        "Control the appearance by selecting between the different button types.",
      )
      .optional(),
    backgroundImage: backgroundImageSprinkleSchema.optional(),
    bg: bgSprinkleSchema.optional(),
    border: borderSprinkleSchema.optional(),
    borderB: borderBSprinkleSchema.optional(),
    borderColor: borderColorSprinkleSchema.optional(),
    borderL: borderLSprinkleSchema.optional(),
    borderR: borderRSprinkleSchema.optional(),
    borderT: borderTSprinkleSchema.optional(),
    children: z.any().optional(),
    color: colorSprinkleSchema.optional(),
    cursor: cursorSprinkleSchema.optional(),
    display: displaySprinkleSchema.optional(),
    flex: flexSprinkleSchema.optional(),
    flexDirection: flexDirectionSprinkleSchema.optional(),
    flexWrap: flexWrapSprinkleSchema.optional(),
    fontFamily: fontFamilySprinkleSchema.optional(),
    fontSize: fontSizeSprinkleSchema.optional(),
    fontWeight: fontWeightSprinkleSchema.optional(),
    gap: gapSprinkleSchema.optional(),
    gridColumn: gridColumnSprinkleSchema.optional(),
    gridTemplateColumns: gridTemplateColumnsSprinkleSchema.optional(),
    h: hSprinkleSchema.optional(),
    justifyContent: justifyContentSprinkleSchema.optional(),
    justifyItems: justifyItemsSprinkleSchema.optional(),
    m: mSprinkleSchema.optional(),
    maxH: maxHSprinkleSchema.optional(),
    maxW: maxWSprinkleSchema.optional(),
    mb: mbSprinkleSchema.optional(),
    ml: mlSprinkleSchema.optional(),
    mr: mrSprinkleSchema.optional(),
    mt: mtSprinkleSchema.optional(),
    mx: mxSprinkleSchema.optional(),
    my: mySprinkleSchema.optional(),
    objectFit: objectFitSprinkleSchema.optional(),
    onClick: z
      .union([
        z
          .object({
            tool: z.string().describe("Name of registered tool to call"),
          })
          .describe("Server-side tool call"),
        z
          .object({
            message: z
              .string()
              .describe("Message to send to LLM via sendNewMessage()"),
          })
          .describe("Client-side message action"),
      ])
      .describe(
        "Handler for user interactions - either a server-side tool call or client-side message",
      )
      .optional(),
    overflow: overflowSprinkleSchema.optional(),
    overflowX: overflowXSprinkleSchema.optional(),
    overflowY: overflowYSprinkleSchema.optional(),
    p: pSprinkleSchema.optional(),
    pb: pbSprinkleSchema.optional(),
    pl: plSprinkleSchema.optional(),
    placeItems: placeItemsSprinkleSchema.optional(),
    pointerEvents: pointerEventsSprinkleSchema.optional(),
    pr: prSprinkleSchema.optional(),
    pt: ptSprinkleSchema.optional(),
    px: pxSprinkleSchema.optional(),
    py: pySprinkleSchema.optional(),
    rounded: roundedSprinkleSchema.optional(),
    shadow: shadowSprinkleSchema.optional(),
    textAlign: textAlignSprinkleSchema.optional(),
    textTransform: textTransformSprinkleSchema.optional(),
    transition: transitionSprinkleSchema.optional(),
    w: wSprinkleSchema.optional(),
    whiteSpace: whiteSpaceSprinkleSchema.optional(),
    z: zSprinkleSchema.optional(),
  })
  .meta({
    examples: [{ $type: "Action", appearance: "primary", children: "Action" }],
  });

export type ProteusAction = Omit<
  z.infer<typeof ProteusActionSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusActionProps = Omit<
  z.infer<typeof ProteusActionSchema>,
  "$type"
>;

export const ProteusCancelActionSchema = z
  .object({
    $type: z.literal("CancelAction"),
    alignItems: alignItemsSprinkleSchema.optional(),
    alignSelf: alignSelfSprinkleSchema.optional(),
    animation: animationSprinkleSchema.optional(),
    backgroundImage: backgroundImageSprinkleSchema.optional(),
    bg: bgSprinkleSchema.optional(),
    border: borderSprinkleSchema.optional(),
    borderB: borderBSprinkleSchema.optional(),
    borderColor: borderColorSprinkleSchema.optional(),
    borderL: borderLSprinkleSchema.optional(),
    borderR: borderRSprinkleSchema.optional(),
    borderT: borderTSprinkleSchema.optional(),
    children: z.any().optional(),
    color: colorSprinkleSchema.optional(),
    cursor: cursorSprinkleSchema.optional(),
    display: displaySprinkleSchema.optional(),
    flex: flexSprinkleSchema.optional(),
    flexDirection: flexDirectionSprinkleSchema.optional(),
    flexWrap: flexWrapSprinkleSchema.optional(),
    fontFamily: fontFamilySprinkleSchema.optional(),
    fontSize: fontSizeSprinkleSchema.optional(),
    fontWeight: fontWeightSprinkleSchema.optional(),
    gap: gapSprinkleSchema.optional(),
    gridColumn: gridColumnSprinkleSchema.optional(),
    gridTemplateColumns: gridTemplateColumnsSprinkleSchema.optional(),
    h: hSprinkleSchema.optional(),
    justifyContent: justifyContentSprinkleSchema.optional(),
    justifyItems: justifyItemsSprinkleSchema.optional(),
    m: mSprinkleSchema.optional(),
    maxH: maxHSprinkleSchema.optional(),
    maxW: maxWSprinkleSchema.optional(),
    mb: mbSprinkleSchema.optional(),
    ml: mlSprinkleSchema.optional(),
    mr: mrSprinkleSchema.optional(),
    mt: mtSprinkleSchema.optional(),
    mx: mxSprinkleSchema.optional(),
    my: mySprinkleSchema.optional(),
    objectFit: objectFitSprinkleSchema.optional(),
    overflow: overflowSprinkleSchema.optional(),
    overflowX: overflowXSprinkleSchema.optional(),
    overflowY: overflowYSprinkleSchema.optional(),
    p: pSprinkleSchema.optional(),
    pb: pbSprinkleSchema.optional(),
    pl: plSprinkleSchema.optional(),
    placeholder: z
      .string()
      .describe("Placeholder text for the text input field")
      .optional(),
    placeItems: placeItemsSprinkleSchema.optional(),
    pointerEvents: pointerEventsSprinkleSchema.optional(),
    pr: prSprinkleSchema.optional(),
    pt: ptSprinkleSchema.optional(),
    px: pxSprinkleSchema.optional(),
    py: pySprinkleSchema.optional(),
    rounded: roundedSprinkleSchema.optional(),
    shadow: shadowSprinkleSchema.optional(),
    textAlign: textAlignSprinkleSchema.optional(),
    textTransform: textTransformSprinkleSchema.optional(),
    transition: transitionSprinkleSchema.optional(),
    w: wSprinkleSchema.optional(),
    whiteSpace: whiteSpaceSprinkleSchema.optional(),
    z: zSprinkleSchema.optional(),
  })
  .meta({ examples: [{ $type: "CancelAction", children: "Cancel" }] });

export type ProteusCancelAction = Omit<
  z.infer<typeof ProteusCancelActionSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusCancelActionProps = Omit<
  z.infer<typeof ProteusCancelActionSchema>,
  "$type"
>;

export const ProteusFieldSchema = z
  .object({
    $type: z.literal("Field"),
    alignItems: alignItemsSprinkleSchema.optional(),
    alignSelf: alignSelfSprinkleSchema.optional(),
    animation: animationSprinkleSchema.optional(),
    backgroundImage: backgroundImageSprinkleSchema.optional(),
    bg: bgSprinkleSchema.optional(),
    border: borderSprinkleSchema.optional(),
    borderB: borderBSprinkleSchema.optional(),
    borderColor: borderColorSprinkleSchema.optional(),
    borderL: borderLSprinkleSchema.optional(),
    borderR: borderRSprinkleSchema.optional(),
    borderT: borderTSprinkleSchema.optional(),
    children: z.any().optional(),
    color: colorSprinkleSchema.optional(),
    cursor: cursorSprinkleSchema.optional(),
    description: z.any().optional(),
    display: displaySprinkleSchema.optional(),
    flex: flexSprinkleSchema.optional(),
    flexDirection: flexDirectionSprinkleSchema.optional(),
    flexWrap: flexWrapSprinkleSchema.optional(),
    fontFamily: fontFamilySprinkleSchema.optional(),
    fontSize: fontSizeSprinkleSchema.optional(),
    fontWeight: fontWeightSprinkleSchema.optional(),
    gap: gapSprinkleSchema.optional(),
    gridColumn: gridColumnSprinkleSchema.optional(),
    gridTemplateColumns: gridTemplateColumnsSprinkleSchema.optional(),
    h: hSprinkleSchema.optional(),
    info: z.any().optional(),
    justifyContent: justifyContentSprinkleSchema.optional(),
    justifyItems: justifyItemsSprinkleSchema.optional(),
    label: z.any().optional(),
    m: mSprinkleSchema.optional(),
    maxH: maxHSprinkleSchema.optional(),
    maxW: maxWSprinkleSchema.optional(),
    mb: mbSprinkleSchema.optional(),
    ml: mlSprinkleSchema.optional(),
    mr: mrSprinkleSchema.optional(),
    mt: mtSprinkleSchema.optional(),
    mx: mxSprinkleSchema.optional(),
    my: mySprinkleSchema.optional(),
    objectFit: objectFitSprinkleSchema.optional(),
    overflow: overflowSprinkleSchema.optional(),
    overflowX: overflowXSprinkleSchema.optional(),
    overflowY: overflowYSprinkleSchema.optional(),
    p: pSprinkleSchema.optional(),
    pb: pbSprinkleSchema.optional(),
    pl: plSprinkleSchema.optional(),
    placeItems: placeItemsSprinkleSchema.optional(),
    pointerEvents: pointerEventsSprinkleSchema.optional(),
    pr: prSprinkleSchema.optional(),
    pt: ptSprinkleSchema.optional(),
    px: pxSprinkleSchema.optional(),
    py: pySprinkleSchema.optional(),
    required: z
      .boolean()
      .describe("Display an asterisk for required inputs.")
      .optional(),
    rounded: roundedSprinkleSchema.optional(),
    shadow: shadowSprinkleSchema.optional(),
    size: sizeSprinkleSchema.optional(),
    textAlign: textAlignSprinkleSchema.optional(),
    textTransform: textTransformSprinkleSchema.optional(),
    transition: transitionSprinkleSchema.optional(),
    w: wSprinkleSchema.optional(),
    whiteSpace: whiteSpaceSprinkleSchema.optional(),
    z: zSprinkleSchema.optional(),
  })
  .meta({
    examples: [
      {
        $type: "Field",
        children: { $type: "Input", name: "field_name" },
        label: "Field Label",
      },
    ],
  });

export type ProteusField = Omit<
  z.infer<typeof ProteusFieldSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusFieldProps = Omit<
  z.infer<typeof ProteusFieldSchema>,
  "$type"
>;

export const ProteusGroupSchema = z
  .object({
    $type: z.literal("Group"),
    alignItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe(
        "Set the element's `align-items` CSS property. Defaults to `center` when\n`flexDirection='row'`, and `stretch` when `flexDirection='column'`.",
      )
      .optional(),
    alignSelf: alignSelfSprinkleSchema.optional(),
    animation: animationSprinkleSchema.optional(),
    backgroundImage: backgroundImageSprinkleSchema.optional(),
    bg: bgSprinkleSchema.optional(),
    border: borderSprinkleSchema.optional(),
    borderB: borderBSprinkleSchema.optional(),
    borderColor: borderColorSprinkleSchema.optional(),
    borderL: borderLSprinkleSchema.optional(),
    borderR: borderRSprinkleSchema.optional(),
    borderT: borderTSprinkleSchema.optional(),
    children: z.any().optional(),
    color: colorSprinkleSchema.optional(),
    cursor: cursorSprinkleSchema.optional(),
    display: displaySprinkleSchema.optional(),
    flex: flexSprinkleSchema.optional(),
    flexDirection: z
      .union([
        z.literal("column"),
        z.literal("column-reverse"),
        z.literal("row"),
        z.literal("row-reverse"),
      ])
      .describe(
        "Set the element's `flex-direction` CSS property.\n\nDefault: 'row' (CSS standard)",
      )
      .optional(),
    flexWrap: flexWrapSprinkleSchema.optional(),
    fontFamily: fontFamilySprinkleSchema.optional(),
    fontSize: fontSizeSprinkleSchema.optional(),
    fontWeight: fontWeightSprinkleSchema.optional(),
    gap: gapSprinkleSchema.optional(),
    gridColumn: gridColumnSprinkleSchema.optional(),
    gridTemplateColumns: gridTemplateColumnsSprinkleSchema.optional(),
    h: hSprinkleSchema.optional(),
    justifyContent: justifyContentSprinkleSchema.optional(),
    justifyItems: justifyItemsSprinkleSchema.optional(),
    m: mSprinkleSchema.optional(),
    maxH: maxHSprinkleSchema.optional(),
    maxW: maxWSprinkleSchema.optional(),
    mb: mbSprinkleSchema.optional(),
    ml: mlSprinkleSchema.optional(),
    mr: mrSprinkleSchema.optional(),
    mt: mtSprinkleSchema.optional(),
    mx: mxSprinkleSchema.optional(),
    my: mySprinkleSchema.optional(),
    objectFit: objectFitSprinkleSchema.optional(),
    overflow: overflowSprinkleSchema.optional(),
    overflowX: overflowXSprinkleSchema.optional(),
    overflowY: overflowYSprinkleSchema.optional(),
    p: pSprinkleSchema.optional(),
    pb: pbSprinkleSchema.optional(),
    pl: plSprinkleSchema.optional(),
    placeItems: placeItemsSprinkleSchema.optional(),
    pointerEvents: pointerEventsSprinkleSchema.optional(),
    pr: prSprinkleSchema.optional(),
    pt: ptSprinkleSchema.optional(),
    px: pxSprinkleSchema.optional(),
    py: pySprinkleSchema.optional(),
    rounded: roundedSprinkleSchema.optional(),
    shadow: shadowSprinkleSchema.optional(),
    size: sizeSprinkleSchema.optional(),
    textAlign: textAlignSprinkleSchema.optional(),
    textTransform: textTransformSprinkleSchema.optional(),
    transition: transitionSprinkleSchema.optional(),
    w: wSprinkleSchema.optional(),
    whiteSpace: whiteSpaceSprinkleSchema.optional(),
    z: zSprinkleSchema.optional(),
  })
  .meta({
    examples: [
      { $type: "Group", children: [], flexDirection: "column", gap: "16" },
    ],
  });

export type ProteusGroup = Omit<
  z.infer<typeof ProteusGroupSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusGroupProps = Omit<
  z.infer<typeof ProteusGroupSchema>,
  "$type"
>;

export const ProteusHeadingSchema = z
  .object({
    $type: z.literal("Heading"),
    alignItems: alignItemsSprinkleSchema.optional(),
    alignSelf: alignSelfSprinkleSchema.optional(),
    animation: animationSprinkleSchema.optional(),
    backgroundImage: backgroundImageSprinkleSchema.optional(),
    bg: bgSprinkleSchema.optional(),
    border: borderSprinkleSchema.optional(),
    borderB: borderBSprinkleSchema.optional(),
    borderColor: borderColorSprinkleSchema.optional(),
    borderL: borderLSprinkleSchema.optional(),
    borderR: borderRSprinkleSchema.optional(),
    borderT: borderTSprinkleSchema.optional(),
    children: z.any().optional(),
    color: colorSprinkleSchema.optional(),
    cursor: cursorSprinkleSchema.optional(),
    display: displaySprinkleSchema.optional(),
    flex: flexSprinkleSchema.optional(),
    flexDirection: flexDirectionSprinkleSchema.optional(),
    flexWrap: flexWrapSprinkleSchema.optional(),
    fontFamily: fontFamilySprinkleSchema.optional(),
    fontSize: fontSizeSprinkleSchema.optional(),
    fontWeight: fontWeightSprinkleSchema.optional(),
    gap: gapSprinkleSchema.optional(),
    gridColumn: gridColumnSprinkleSchema.optional(),
    gridTemplateColumns: gridTemplateColumnsSprinkleSchema.optional(),
    h: hSprinkleSchema.optional(),
    justifyContent: justifyContentSprinkleSchema.optional(),
    justifyItems: justifyItemsSprinkleSchema.optional(),
    level: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe(
        'Heading level (1-4) that controls both the semantic HTML tag and font size.\n- `level="1"`: renders `<h1>` with `fontSize="4xl"` (default)\n- `level="2"`: renders `<h2>` with `fontSize="3xl"`\n- `level="3"`: renders `<h3>` with `fontSize="2xl"`\n- `level="4"`: renders `<h4>` with `fontSize="xl"`\n\nUse `asChild` to decouple the semantic level from visual appearance.',
      )
      .optional(),
    m: mSprinkleSchema.optional(),
    maxH: maxHSprinkleSchema.optional(),
    maxW: maxWSprinkleSchema.optional(),
    mb: mbSprinkleSchema.optional(),
    ml: mlSprinkleSchema.optional(),
    mr: mrSprinkleSchema.optional(),
    mt: mtSprinkleSchema.optional(),
    mx: mxSprinkleSchema.optional(),
    my: mySprinkleSchema.optional(),
    objectFit: objectFitSprinkleSchema.optional(),
    overflow: overflowSprinkleSchema.optional(),
    overflowX: overflowXSprinkleSchema.optional(),
    overflowY: overflowYSprinkleSchema.optional(),
    p: pSprinkleSchema.optional(),
    pb: pbSprinkleSchema.optional(),
    pl: plSprinkleSchema.optional(),
    placeItems: placeItemsSprinkleSchema.optional(),
    pointerEvents: pointerEventsSprinkleSchema.optional(),
    pr: prSprinkleSchema.optional(),
    pt: ptSprinkleSchema.optional(),
    px: pxSprinkleSchema.optional(),
    py: pySprinkleSchema.optional(),
    rounded: roundedSprinkleSchema.optional(),
    shadow: shadowSprinkleSchema.optional(),
    size: sizeSprinkleSchema.optional(),
    textAlign: textAlignSprinkleSchema.optional(),
    textTransform: textTransformSprinkleSchema.optional(),
    transition: transitionSprinkleSchema.optional(),
    w: wSprinkleSchema.optional(),
    whiteSpace: whiteSpaceSprinkleSchema.optional(),
    z: zSprinkleSchema.optional(),
  })
  .meta({
    examples: [{ $type: "Heading", children: "New heading", level: "2" }],
  });

export type ProteusHeading = Omit<
  z.infer<typeof ProteusHeadingSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusHeadingProps = Omit<
  z.infer<typeof ProteusHeadingSchema>,
  "$type"
>;

export const ProteusImageSchema = z
  .object({
    $type: z.literal("Image"),
    alignItems: alignItemsSprinkleSchema.optional(),
    alignSelf: alignSelfSprinkleSchema.optional(),
    alt: z.string().describe("Alternative text for the image").optional(),
    animation: animationSprinkleSchema.optional(),
    backgroundImage: backgroundImageSprinkleSchema.optional(),
    bg: bgSprinkleSchema.optional(),
    border: borderSprinkleSchema.optional(),
    borderB: borderBSprinkleSchema.optional(),
    borderColor: borderColorSprinkleSchema.optional(),
    borderL: borderLSprinkleSchema.optional(),
    borderR: borderRSprinkleSchema.optional(),
    borderT: borderTSprinkleSchema.optional(),
    color: colorSprinkleSchema.optional(),
    cursor: cursorSprinkleSchema.optional(),
    display: displaySprinkleSchema.optional(),
    flex: flexSprinkleSchema.optional(),
    flexDirection: flexDirectionSprinkleSchema.optional(),
    flexWrap: flexWrapSprinkleSchema.optional(),
    fontFamily: fontFamilySprinkleSchema.optional(),
    fontSize: fontSizeSprinkleSchema.optional(),
    fontWeight: fontWeightSprinkleSchema.optional(),
    gap: gapSprinkleSchema.optional(),
    gridColumn: gridColumnSprinkleSchema.optional(),
    gridTemplateColumns: gridTemplateColumnsSprinkleSchema.optional(),
    h: hSprinkleSchema.optional(),
    justifyContent: justifyContentSprinkleSchema.optional(),
    justifyItems: justifyItemsSprinkleSchema.optional(),
    m: mSprinkleSchema.optional(),
    maxH: maxHSprinkleSchema.optional(),
    maxW: maxWSprinkleSchema.optional(),
    mb: mbSprinkleSchema.optional(),
    ml: mlSprinkleSchema.optional(),
    mr: mrSprinkleSchema.optional(),
    mt: mtSprinkleSchema.optional(),
    mx: mxSprinkleSchema.optional(),
    my: mySprinkleSchema.optional(),
    objectFit: objectFitSprinkleSchema.optional(),
    overflow: overflowSprinkleSchema.optional(),
    overflowX: overflowXSprinkleSchema.optional(),
    overflowY: overflowYSprinkleSchema.optional(),
    p: pSprinkleSchema.optional(),
    pb: pbSprinkleSchema.optional(),
    pl: plSprinkleSchema.optional(),
    placeItems: placeItemsSprinkleSchema.optional(),
    pointerEvents: pointerEventsSprinkleSchema.optional(),
    pr: prSprinkleSchema.optional(),
    pt: ptSprinkleSchema.optional(),
    px: pxSprinkleSchema.optional(),
    py: pySprinkleSchema.optional(),
    rounded: roundedSprinkleSchema.optional(),
    shadow: shadowSprinkleSchema.optional(),
    size: sizeSprinkleSchema.optional(),
    src: z.string().describe("The image source URL").optional(),
    textAlign: textAlignSprinkleSchema.optional(),
    textTransform: textTransformSprinkleSchema.optional(),
    transition: transitionSprinkleSchema.optional(),
    w: wSprinkleSchema.optional(),
    whiteSpace: whiteSpaceSprinkleSchema.optional(),
    z: zSprinkleSchema.optional(),
  })
  .meta({
    examples: [
      {
        $type: "Image",
        alt: "Placeholder",
        src: "https://placehold.co/600x400",
      },
    ],
  });

export type ProteusImage = Omit<
  z.infer<typeof ProteusImageSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusImageProps = Omit<
  z.infer<typeof ProteusImageSchema>,
  "$type"
>;

export const ProteusInputSchema = z
  .object({
    $type: z.literal("Input"),
    addonAfter: z.any().optional(),
    addonBefore: z.any().optional(),
    alignItems: alignItemsSprinkleSchema.optional(),
    alignSelf: alignSelfSprinkleSchema.optional(),
    animation: animationSprinkleSchema.optional(),
    appearance: z
      .union([z.literal("number"), z.literal("default")])
      .describe("Control the appearance of the input.")
      .optional(),
    backgroundImage: backgroundImageSprinkleSchema.optional(),
    bg: bgSprinkleSchema.optional(),
    border: borderSprinkleSchema.optional(),
    borderB: borderBSprinkleSchema.optional(),
    borderColor: borderColorSprinkleSchema.optional(),
    borderL: borderLSprinkleSchema.optional(),
    borderR: borderRSprinkleSchema.optional(),
    borderT: borderTSprinkleSchema.optional(),
    color: colorSprinkleSchema.optional(),
    cursor: cursorSprinkleSchema.optional(),
    display: displaySprinkleSchema.optional(),
    flex: flexSprinkleSchema.optional(),
    flexDirection: flexDirectionSprinkleSchema.optional(),
    flexWrap: flexWrapSprinkleSchema.optional(),
    fontFamily: fontFamilySprinkleSchema.optional(),
    fontSize: fontSizeSprinkleSchema.optional(),
    fontWeight: fontWeightSprinkleSchema.optional(),
    gap: gapSprinkleSchema.optional(),
    gridColumn: gridColumnSprinkleSchema.optional(),
    gridTemplateColumns: gridTemplateColumnsSprinkleSchema.optional(),
    h: hSprinkleSchema.optional(),
    justifyContent: justifyContentSprinkleSchema.optional(),
    justifyItems: justifyItemsSprinkleSchema.optional(),
    m: mSprinkleSchema.optional(),
    maxH: maxHSprinkleSchema.optional(),
    maxW: maxWSprinkleSchema.optional(),
    mb: mbSprinkleSchema.optional(),
    ml: mlSprinkleSchema.optional(),
    mr: mrSprinkleSchema.optional(),
    mt: mtSprinkleSchema.optional(),
    mx: mxSprinkleSchema.optional(),
    my: mySprinkleSchema.optional(),
    name: z
      .string()
      .describe("The name of the form control element.")
      .optional(),
    objectFit: objectFitSprinkleSchema.optional(),
    overflow: overflowSprinkleSchema.optional(),
    overflowX: overflowXSprinkleSchema.optional(),
    overflowY: overflowYSprinkleSchema.optional(),
    p: pSprinkleSchema.optional(),
    pb: pbSprinkleSchema.optional(),
    pl: plSprinkleSchema.optional(),
    placeholder: z
      .string()
      .describe("The placeholder text to use when control has no value.")
      .optional(),
    placeItems: placeItemsSprinkleSchema.optional(),
    pointerEvents: pointerEventsSprinkleSchema.optional(),
    pr: prSprinkleSchema.optional(),
    pt: ptSprinkleSchema.optional(),
    px: pxSprinkleSchema.optional(),
    py: pySprinkleSchema.optional(),
    rounded: roundedSprinkleSchema.optional(),
    shadow: shadowSprinkleSchema.optional(),
    textAlign: textAlignSprinkleSchema.optional(),
    textTransform: textTransformSprinkleSchema.optional(),
    transition: transitionSprinkleSchema.optional(),
    type: z
      .union([
        z.literal("number"),
        z.literal("color"),
        z.literal("button"),
        z.literal("checkbox"),
        z.literal("radio"),
        z.literal("hidden"),
        z.literal("text"),
        z.literal("reset"),
        z.literal("range"),
        z.literal("search"),
        z.literal("time"),
        z.literal("image"),
        z.literal("tel"),
        z.literal("url"),
        z.literal("email"),
        z.literal("date"),
        z.literal("submit"),
        z.literal("month"),
        z.literal("datetime-local"),
        z.literal("week"),
        z.literal("file"),
        z.literal("password"),
        z.string(),
      ])
      .describe("The input type.")
      .optional(),
    w: wSprinkleSchema.optional(),
    whiteSpace: whiteSpaceSprinkleSchema.optional(),
    z: zSprinkleSchema.optional(),
  })
  .meta({
    examples: [
      { $type: "Input", name: "field_name", placeholder: "Enter value" },
    ],
  });

export type ProteusInput = Omit<
  z.infer<typeof ProteusInputSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusInputProps = Omit<
  z.infer<typeof ProteusInputSchema>,
  "$type"
>;

export const ProteusLinkSchema = z
  .object({
    $type: z.literal("Link"),
    alignItems: alignItemsSprinkleSchema.optional(),
    alignSelf: alignSelfSprinkleSchema.optional(),
    animation: animationSprinkleSchema.optional(),
    backgroundImage: backgroundImageSprinkleSchema.optional(),
    bg: bgSprinkleSchema.optional(),
    border: borderSprinkleSchema.optional(),
    borderB: borderBSprinkleSchema.optional(),
    borderColor: borderColorSprinkleSchema.optional(),
    borderL: borderLSprinkleSchema.optional(),
    borderR: borderRSprinkleSchema.optional(),
    borderT: borderTSprinkleSchema.optional(),
    children: z.any().optional(),
    color: colorSprinkleSchema.optional(),
    cursor: cursorSprinkleSchema.optional(),
    display: displaySprinkleSchema.optional(),
    flex: flexSprinkleSchema.optional(),
    flexDirection: flexDirectionSprinkleSchema.optional(),
    flexWrap: flexWrapSprinkleSchema.optional(),
    fontFamily: fontFamilySprinkleSchema.optional(),
    fontSize: fontSizeSprinkleSchema.optional(),
    fontWeight: fontWeightSprinkleSchema.optional(),
    gap: gapSprinkleSchema.optional(),
    gridColumn: gridColumnSprinkleSchema.optional(),
    gridTemplateColumns: gridTemplateColumnsSprinkleSchema.optional(),
    h: hSprinkleSchema.optional(),
    href: z.string().describe("The link href.").optional(),
    justifyContent: justifyContentSprinkleSchema.optional(),
    justifyItems: justifyItemsSprinkleSchema.optional(),
    m: mSprinkleSchema.optional(),
    maxH: maxHSprinkleSchema.optional(),
    maxW: maxWSprinkleSchema.optional(),
    mb: mbSprinkleSchema.optional(),
    ml: mlSprinkleSchema.optional(),
    mr: mrSprinkleSchema.optional(),
    mt: mtSprinkleSchema.optional(),
    mx: mxSprinkleSchema.optional(),
    my: mySprinkleSchema.optional(),
    objectFit: objectFitSprinkleSchema.optional(),
    overflow: overflowSprinkleSchema.optional(),
    overflowX: overflowXSprinkleSchema.optional(),
    overflowY: overflowYSprinkleSchema.optional(),
    p: pSprinkleSchema.optional(),
    pb: pbSprinkleSchema.optional(),
    pl: plSprinkleSchema.optional(),
    placeItems: placeItemsSprinkleSchema.optional(),
    pointerEvents: pointerEventsSprinkleSchema.optional(),
    pr: prSprinkleSchema.optional(),
    pt: ptSprinkleSchema.optional(),
    px: pxSprinkleSchema.optional(),
    py: pySprinkleSchema.optional(),
    rounded: roundedSprinkleSchema.optional(),
    shadow: shadowSprinkleSchema.optional(),
    size: sizeSprinkleSchema.optional(),
    textAlign: textAlignSprinkleSchema.optional(),
    textTransform: textTransformSprinkleSchema.optional(),
    transition: transitionSprinkleSchema.optional(),
    w: wSprinkleSchema.optional(),
    whiteSpace: whiteSpaceSprinkleSchema.optional(),
    z: zSprinkleSchema.optional(),
  })
  .meta({
    examples: [
      { $type: "Link", children: "Link text", href: "https://example.com" },
    ],
  });

export type ProteusLink = Omit<
  z.infer<typeof ProteusLinkSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusLinkProps = Omit<z.infer<typeof ProteusLinkSchema>, "$type">;

export const ProteusMapSchema = z
  .object({
    $type: z.literal("Map"),
    children: z
      .record(z.string(), z.any())
      .describe(
        "Template object to render for each item in the array. Value paths are relative to current item.",
      )
      .optional(),
    path: z
      .string()
      .describe("JSON pointer path to array (e.g., '/questions')"),
  })
  .meta({
    examples: [
      {
        $type: "Map",
        children: { $type: "Text", children: "Item" },
        path: "/items",
      },
    ],
  });

export type ProteusMap = Omit<z.infer<typeof ProteusMapSchema>, "children"> & {
  children?: ProteusNode;
};
export type ProteusMapProps = Omit<z.infer<typeof ProteusMapSchema>, "$type">;

export const ProteusRangeSchema = z
  .object({
    $type: z.literal("Range"),
    alignItems: alignItemsSprinkleSchema.optional(),
    alignSelf: alignSelfSprinkleSchema.optional(),
    animation: animationSprinkleSchema.optional(),
    backgroundImage: backgroundImageSprinkleSchema.optional(),
    bg: bgSprinkleSchema.optional(),
    border: borderSprinkleSchema.optional(),
    borderB: borderBSprinkleSchema.optional(),
    borderColor: borderColorSprinkleSchema.optional(),
    borderL: borderLSprinkleSchema.optional(),
    borderR: borderRSprinkleSchema.optional(),
    borderT: borderTSprinkleSchema.optional(),
    color: colorSprinkleSchema.optional(),
    cursor: cursorSprinkleSchema.optional(),
    display: displaySprinkleSchema.optional(),
    flex: flexSprinkleSchema.optional(),
    flexDirection: flexDirectionSprinkleSchema.optional(),
    flexWrap: flexWrapSprinkleSchema.optional(),
    fontFamily: fontFamilySprinkleSchema.optional(),
    fontSize: fontSizeSprinkleSchema.optional(),
    fontWeight: fontWeightSprinkleSchema.optional(),
    gap: gapSprinkleSchema.optional(),
    gridColumn: gridColumnSprinkleSchema.optional(),
    gridTemplateColumns: gridTemplateColumnsSprinkleSchema.optional(),
    h: hSprinkleSchema.optional(),
    justifyContent: justifyContentSprinkleSchema.optional(),
    justifyItems: justifyItemsSprinkleSchema.optional(),
    m: mSprinkleSchema.optional(),
    marks: z
      .array(
        z.union([
          z.number(),
          z.object({
            label: z.string().describe("The label for the mark"),
            value: z.number().describe("The value for the mark"),
          }),
        ]),
      )
      .describe("The marks to display on the range steps.")
      .optional(),
    max: z.number().describe("The maximum value for the range.").optional(),
    maxH: maxHSprinkleSchema.optional(),
    maxW: maxWSprinkleSchema.optional(),
    mb: mbSprinkleSchema.optional(),
    min: z.number().describe("The minimum value for the range.").optional(),
    ml: mlSprinkleSchema.optional(),
    mr: mrSprinkleSchema.optional(),
    mt: mtSprinkleSchema.optional(),
    mx: mxSprinkleSchema.optional(),
    my: mySprinkleSchema.optional(),
    objectFit: objectFitSprinkleSchema.optional(),
    overflow: overflowSprinkleSchema.optional(),
    overflowX: overflowXSprinkleSchema.optional(),
    overflowY: overflowYSprinkleSchema.optional(),
    p: pSprinkleSchema.optional(),
    pb: pbSprinkleSchema.optional(),
    pl: plSprinkleSchema.optional(),
    placeItems: placeItemsSprinkleSchema.optional(),
    pointerEvents: pointerEventsSprinkleSchema.optional(),
    pr: prSprinkleSchema.optional(),
    pt: ptSprinkleSchema.optional(),
    px: pxSprinkleSchema.optional(),
    py: pySprinkleSchema.optional(),
    rounded: roundedSprinkleSchema.optional(),
    shadow: shadowSprinkleSchema.optional(),
    step: z
      .number()
      .describe("The stepping interval for the range.")
      .optional(),
    textAlign: textAlignSprinkleSchema.optional(),
    textTransform: textTransformSprinkleSchema.optional(),
    transition: transitionSprinkleSchema.optional(),
    w: wSprinkleSchema.optional(),
    whiteSpace: whiteSpaceSprinkleSchema.optional(),
    z: zSprinkleSchema.optional(),
  })
  .meta({ examples: [{ $type: "Range", max: 100, min: 0, step: 1 }] });

export type ProteusRange = Omit<
  z.infer<typeof ProteusRangeSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusRangeProps = Omit<
  z.infer<typeof ProteusRangeSchema>,
  "$type"
>;

export const ProteusSelectSchema = z
  .object({
    $type: z.literal("Select"),
    children: z.any().optional(),
    name: z
      .string()
      .describe("The name of the inner select element.")
      .optional(),
    options: z
      .array(
        z.object({
          label: z.string().describe("String representation of items"),
          value: z.string().describe("Return a unique key for each item"),
        }),
      )
      .describe("The select items/options we want to render."),
  })
  .meta({
    examples: [
      {
        $type: "Select",
        children: [
          { $type: "SelectTrigger", w: "full" },
          { $type: "SelectContent" },
        ],
        name: "select_field",
        options: [
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
        ],
      },
    ],
  });

export type ProteusSelect = Omit<
  z.infer<typeof ProteusSelectSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusSelectProps = Omit<
  z.infer<typeof ProteusSelectSchema>,
  "$type"
>;

export const ProteusSelectContentSchema = z.object({
  $type: z.literal("SelectContent"),
  alignItems: alignItemsSprinkleSchema.optional(),
  alignSelf: alignSelfSprinkleSchema.optional(),
  animation: animationSprinkleSchema.optional(),
  backgroundImage: backgroundImageSprinkleSchema.optional(),
  bg: bgSprinkleSchema.optional(),
  border: borderSprinkleSchema.optional(),
  borderB: borderBSprinkleSchema.optional(),
  borderColor: borderColorSprinkleSchema.optional(),
  borderL: borderLSprinkleSchema.optional(),
  borderR: borderRSprinkleSchema.optional(),
  borderT: borderTSprinkleSchema.optional(),
  color: colorSprinkleSchema.optional(),
  cursor: cursorSprinkleSchema.optional(),
  display: displaySprinkleSchema.optional(),
  flex: flexSprinkleSchema.optional(),
  flexDirection: flexDirectionSprinkleSchema.optional(),
  flexWrap: flexWrapSprinkleSchema.optional(),
  fontFamily: fontFamilySprinkleSchema.optional(),
  fontSize: fontSizeSprinkleSchema.optional(),
  fontWeight: fontWeightSprinkleSchema.optional(),
  gap: gapSprinkleSchema.optional(),
  gridColumn: gridColumnSprinkleSchema.optional(),
  gridTemplateColumns: gridTemplateColumnsSprinkleSchema.optional(),
  h: hSprinkleSchema.optional(),
  justifyContent: justifyContentSprinkleSchema.optional(),
  justifyItems: justifyItemsSprinkleSchema.optional(),
  m: mSprinkleSchema.optional(),
  maxW: maxWSprinkleSchema.optional(),
  mb: mbSprinkleSchema.optional(),
  ml: mlSprinkleSchema.optional(),
  mr: mrSprinkleSchema.optional(),
  mt: mtSprinkleSchema.optional(),
  mx: mxSprinkleSchema.optional(),
  my: mySprinkleSchema.optional(),
  objectFit: objectFitSprinkleSchema.optional(),
  overflow: overflowSprinkleSchema.optional(),
  overflowX: overflowXSprinkleSchema.optional(),
  overflowY: overflowYSprinkleSchema.optional(),
  p: pSprinkleSchema.optional(),
  pb: pbSprinkleSchema.optional(),
  pl: plSprinkleSchema.optional(),
  placeItems: placeItemsSprinkleSchema.optional(),
  pointerEvents: pointerEventsSprinkleSchema.optional(),
  pr: prSprinkleSchema.optional(),
  pt: ptSprinkleSchema.optional(),
  px: pxSprinkleSchema.optional(),
  py: pySprinkleSchema.optional(),
  rounded: roundedSprinkleSchema.optional(),
  shadow: shadowSprinkleSchema.optional(),
  size: sizeSprinkleSchema.optional(),
  textAlign: textAlignSprinkleSchema.optional(),
  textTransform: textTransformSprinkleSchema.optional(),
  transition: transitionSprinkleSchema.optional(),
  w: wSprinkleSchema.optional(),
  whiteSpace: whiteSpaceSprinkleSchema.optional(),
  z: zSprinkleSchema.optional(),
});

export type ProteusSelectContent = Omit<
  z.infer<typeof ProteusSelectContentSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusSelectContentProps = Omit<
  z.infer<typeof ProteusSelectContentSchema>,
  "$type"
>;

export const ProteusSelectTriggerSchema = z.object({
  $type: z.literal("SelectTrigger"),
  alignItems: alignItemsSprinkleSchema.optional(),
  alignSelf: alignSelfSprinkleSchema.optional(),
  animation: animationSprinkleSchema.optional(),
  backgroundImage: backgroundImageSprinkleSchema.optional(),
  bg: bgSprinkleSchema.optional(),
  border: borderSprinkleSchema.optional(),
  borderB: borderBSprinkleSchema.optional(),
  borderColor: borderColorSprinkleSchema.optional(),
  borderL: borderLSprinkleSchema.optional(),
  borderR: borderRSprinkleSchema.optional(),
  borderT: borderTSprinkleSchema.optional(),
  children: z.any().optional(),
  color: colorSprinkleSchema.optional(),
  cursor: cursorSprinkleSchema.optional(),
  display: displaySprinkleSchema.optional(),
  flex: flexSprinkleSchema.optional(),
  flexDirection: flexDirectionSprinkleSchema.optional(),
  flexWrap: flexWrapSprinkleSchema.optional(),
  fontFamily: fontFamilySprinkleSchema.optional(),
  fontSize: fontSizeSprinkleSchema.optional(),
  fontWeight: fontWeightSprinkleSchema.optional(),
  gap: gapSprinkleSchema.optional(),
  gridColumn: gridColumnSprinkleSchema.optional(),
  gridTemplateColumns: gridTemplateColumnsSprinkleSchema.optional(),
  h: hSprinkleSchema.optional(),
  justifyContent: justifyContentSprinkleSchema.optional(),
  justifyItems: justifyItemsSprinkleSchema.optional(),
  m: mSprinkleSchema.optional(),
  maxH: maxHSprinkleSchema.optional(),
  maxW: maxWSprinkleSchema.optional(),
  mb: mbSprinkleSchema.optional(),
  ml: mlSprinkleSchema.optional(),
  mr: mrSprinkleSchema.optional(),
  mt: mtSprinkleSchema.optional(),
  mx: mxSprinkleSchema.optional(),
  my: mySprinkleSchema.optional(),
  objectFit: objectFitSprinkleSchema.optional(),
  overflow: overflowSprinkleSchema.optional(),
  overflowX: overflowXSprinkleSchema.optional(),
  overflowY: overflowYSprinkleSchema.optional(),
  p: pSprinkleSchema.optional(),
  pb: pbSprinkleSchema.optional(),
  pl: plSprinkleSchema.optional(),
  placeItems: placeItemsSprinkleSchema.optional(),
  pointerEvents: pointerEventsSprinkleSchema.optional(),
  pr: prSprinkleSchema.optional(),
  pt: ptSprinkleSchema.optional(),
  px: pxSprinkleSchema.optional(),
  py: pySprinkleSchema.optional(),
  rounded: roundedSprinkleSchema.optional(),
  shadow: shadowSprinkleSchema.optional(),
  textAlign: textAlignSprinkleSchema.optional(),
  textTransform: textTransformSprinkleSchema.optional(),
  transition: transitionSprinkleSchema.optional(),
  w: wSprinkleSchema.optional(),
  whiteSpace: whiteSpaceSprinkleSchema.optional(),
  z: zSprinkleSchema.optional(),
});

export type ProteusSelectTrigger = Omit<
  z.infer<typeof ProteusSelectTriggerSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusSelectTriggerProps = Omit<
  z.infer<typeof ProteusSelectTriggerSchema>,
  "$type"
>;

export const ProteusSeparatorSchema = z.object({
  $type: z.literal("Separator"),
  alignItems: alignItemsSprinkleSchema.optional(),
  alignSelf: alignSelfSprinkleSchema.optional(),
  animation: animationSprinkleSchema.optional(),
  backgroundImage: backgroundImageSprinkleSchema.optional(),
  bg: bgSprinkleSchema.optional(),
  border: borderSprinkleSchema.optional(),
  borderB: borderBSprinkleSchema.optional(),
  borderColor: borderColorSprinkleSchema.optional(),
  borderL: borderLSprinkleSchema.optional(),
  borderR: borderRSprinkleSchema.optional(),
  borderT: borderTSprinkleSchema.optional(),
  color: colorSprinkleSchema.optional(),
  cursor: cursorSprinkleSchema.optional(),
  display: displaySprinkleSchema.optional(),
  flex: flexSprinkleSchema.optional(),
  flexDirection: flexDirectionSprinkleSchema.optional(),
  flexWrap: flexWrapSprinkleSchema.optional(),
  fontFamily: fontFamilySprinkleSchema.optional(),
  fontSize: fontSizeSprinkleSchema.optional(),
  fontWeight: fontWeightSprinkleSchema.optional(),
  gap: gapSprinkleSchema.optional(),
  gridColumn: gridColumnSprinkleSchema.optional(),
  gridTemplateColumns: gridTemplateColumnsSprinkleSchema.optional(),
  h: hSprinkleSchema.optional(),
  justifyContent: justifyContentSprinkleSchema.optional(),
  justifyItems: justifyItemsSprinkleSchema.optional(),
  m: mSprinkleSchema.optional(),
  maxH: maxHSprinkleSchema.optional(),
  maxW: maxWSprinkleSchema.optional(),
  mb: mbSprinkleSchema.optional(),
  ml: mlSprinkleSchema.optional(),
  mr: mrSprinkleSchema.optional(),
  mt: mtSprinkleSchema.optional(),
  mx: mxSprinkleSchema.optional(),
  my: mySprinkleSchema.optional(),
  objectFit: objectFitSprinkleSchema.optional(),
  overflow: overflowSprinkleSchema.optional(),
  overflowX: overflowXSprinkleSchema.optional(),
  overflowY: overflowYSprinkleSchema.optional(),
  p: pSprinkleSchema.optional(),
  pb: pbSprinkleSchema.optional(),
  pl: plSprinkleSchema.optional(),
  placeItems: placeItemsSprinkleSchema.optional(),
  pointerEvents: pointerEventsSprinkleSchema.optional(),
  pr: prSprinkleSchema.optional(),
  pt: ptSprinkleSchema.optional(),
  px: pxSprinkleSchema.optional(),
  py: pySprinkleSchema.optional(),
  rounded: roundedSprinkleSchema.optional(),
  shadow: shadowSprinkleSchema.optional(),
  size: sizeSprinkleSchema.optional(),
  textAlign: textAlignSprinkleSchema.optional(),
  textTransform: textTransformSprinkleSchema.optional(),
  transition: transitionSprinkleSchema.optional(),
  w: wSprinkleSchema.optional(),
  whiteSpace: whiteSpaceSprinkleSchema.optional(),
  z: zSprinkleSchema.optional(),
});

export type ProteusSeparator = Omit<
  z.infer<typeof ProteusSeparatorSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusSeparatorProps = Omit<
  z.infer<typeof ProteusSeparatorSchema>,
  "$type"
>;

export const ProteusShowSchema = z
  .object({
    $type: z.literal("Show"),
    children: z.any().optional(),
    when: z
      .union([ProteusConditionSchema, z.array(ProteusConditionSchema)])
      .describe(
        "Single condition or array of conditions (AND logic). Each condition is an object with one operator key.",
      )
      .optional(),
  })
  .meta({
    examples: [
      {
        $type: "Show",
        children: { $type: "Text", children: "Shown conditionally" },
        when: { "!!": { $type: "Value", path: "/field_name" } },
      },
    ],
  });

export type ProteusShow = Omit<
  z.infer<typeof ProteusShowSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusShowProps = Omit<z.infer<typeof ProteusShowSchema>, "$type">;

export const ProteusTextSchema = z
  .object({
    $type: z.literal("Text"),
    alignItems: alignItemsSprinkleSchema.optional(),
    alignSelf: alignSelfSprinkleSchema.optional(),
    animation: animationSprinkleSchema.optional(),
    backgroundImage: backgroundImageSprinkleSchema.optional(),
    bg: bgSprinkleSchema.optional(),
    border: borderSprinkleSchema.optional(),
    borderB: borderBSprinkleSchema.optional(),
    borderColor: borderColorSprinkleSchema.optional(),
    borderL: borderLSprinkleSchema.optional(),
    borderR: borderRSprinkleSchema.optional(),
    borderT: borderTSprinkleSchema.optional(),
    children: z.any().optional(),
    color: colorSprinkleSchema.optional(),
    cursor: cursorSprinkleSchema.optional(),
    display: displaySprinkleSchema.optional(),
    flex: flexSprinkleSchema.optional(),
    flexDirection: flexDirectionSprinkleSchema.optional(),
    flexWrap: flexWrapSprinkleSchema.optional(),
    fontFamily: fontFamilySprinkleSchema.optional(),
    fontSize: fontSizeSprinkleSchema.optional(),
    fontWeight: fontWeightSprinkleSchema.optional(),
    gap: gapSprinkleSchema.optional(),
    gridColumn: gridColumnSprinkleSchema.optional(),
    gridTemplateColumns: gridTemplateColumnsSprinkleSchema.optional(),
    h: hSprinkleSchema.optional(),
    justifyContent: justifyContentSprinkleSchema.optional(),
    justifyItems: justifyItemsSprinkleSchema.optional(),
    m: mSprinkleSchema.optional(),
    maxH: maxHSprinkleSchema.optional(),
    maxW: maxWSprinkleSchema.optional(),
    mb: mbSprinkleSchema.optional(),
    ml: mlSprinkleSchema.optional(),
    mr: mrSprinkleSchema.optional(),
    mt: mtSprinkleSchema.optional(),
    mx: mxSprinkleSchema.optional(),
    my: mySprinkleSchema.optional(),
    objectFit: objectFitSprinkleSchema.optional(),
    overflow: overflowSprinkleSchema.optional(),
    overflowX: overflowXSprinkleSchema.optional(),
    overflowY: overflowYSprinkleSchema.optional(),
    p: pSprinkleSchema.optional(),
    pb: pbSprinkleSchema.optional(),
    pl: plSprinkleSchema.optional(),
    placeItems: placeItemsSprinkleSchema.optional(),
    pointerEvents: pointerEventsSprinkleSchema.optional(),
    pr: prSprinkleSchema.optional(),
    pt: ptSprinkleSchema.optional(),
    px: pxSprinkleSchema.optional(),
    py: pySprinkleSchema.optional(),
    rounded: roundedSprinkleSchema.optional(),
    shadow: shadowSprinkleSchema.optional(),
    size: sizeSprinkleSchema.optional(),
    textAlign: textAlignSprinkleSchema.optional(),
    textTransform: textTransformSprinkleSchema.optional(),
    transition: transitionSprinkleSchema.optional(),
    w: wSprinkleSchema.optional(),
    whiteSpace: whiteSpaceSprinkleSchema.optional(),
    z: zSprinkleSchema.optional(),
  })
  .meta({ examples: [{ $type: "Text", children: "New text" }] });

export type ProteusText = Omit<
  z.infer<typeof ProteusTextSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusTextProps = Omit<z.infer<typeof ProteusTextSchema>, "$type">;

export const ProteusTextareaSchema = z
  .object({
    $type: z.literal("Textarea"),
    alignItems: alignItemsSprinkleSchema.optional(),
    alignSelf: alignSelfSprinkleSchema.optional(),
    animation: animationSprinkleSchema.optional(),
    backgroundImage: backgroundImageSprinkleSchema.optional(),
    bg: bgSprinkleSchema.optional(),
    border: borderSprinkleSchema.optional(),
    borderB: borderBSprinkleSchema.optional(),
    borderColor: borderColorSprinkleSchema.optional(),
    borderL: borderLSprinkleSchema.optional(),
    borderR: borderRSprinkleSchema.optional(),
    borderT: borderTSprinkleSchema.optional(),
    color: colorSprinkleSchema.optional(),
    cursor: cursorSprinkleSchema.optional(),
    display: displaySprinkleSchema.optional(),
    flex: flexSprinkleSchema.optional(),
    flexDirection: flexDirectionSprinkleSchema.optional(),
    flexWrap: flexWrapSprinkleSchema.optional(),
    fontFamily: fontFamilySprinkleSchema.optional(),
    fontSize: fontSizeSprinkleSchema.optional(),
    fontWeight: fontWeightSprinkleSchema.optional(),
    gap: gapSprinkleSchema.optional(),
    gridColumn: gridColumnSprinkleSchema.optional(),
    gridTemplateColumns: gridTemplateColumnsSprinkleSchema.optional(),
    h: hSprinkleSchema.optional(),
    justifyContent: justifyContentSprinkleSchema.optional(),
    justifyItems: justifyItemsSprinkleSchema.optional(),
    m: mSprinkleSchema.optional(),
    maxH: maxHSprinkleSchema.optional(),
    maxRows: z
      .union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
      ])
      .describe("Limits the height of the textarea when `resize=auto` is used.")
      .optional(),
    maxW: maxWSprinkleSchema.optional(),
    mb: mbSprinkleSchema.optional(),
    ml: mlSprinkleSchema.optional(),
    mr: mrSprinkleSchema.optional(),
    mt: mtSprinkleSchema.optional(),
    mx: mxSprinkleSchema.optional(),
    my: mySprinkleSchema.optional(),
    name: z
      .string()
      .describe("The name of the form control element.")
      .optional(),
    objectFit: objectFitSprinkleSchema.optional(),
    overflow: overflowSprinkleSchema.optional(),
    overflowX: overflowXSprinkleSchema.optional(),
    overflowY: overflowYSprinkleSchema.optional(),
    p: pSprinkleSchema.optional(),
    pb: pbSprinkleSchema.optional(),
    pl: plSprinkleSchema.optional(),
    placeholder: z
      .string()
      .describe("The placeholder text to use when control has no value.")
      .optional(),
    placeItems: placeItemsSprinkleSchema.optional(),
    pointerEvents: pointerEventsSprinkleSchema.optional(),
    pr: prSprinkleSchema.optional(),
    pt: ptSprinkleSchema.optional(),
    px: pxSprinkleSchema.optional(),
    py: pySprinkleSchema.optional(),
    resize: z
      .union([z.literal("none"), z.literal("auto"), z.literal("vertical")])
      .describe(
        "Control whether resizing mode is manual, automatic, or disabled.",
      )
      .optional(),
    rounded: roundedSprinkleSchema.optional(),
    rows: z.number().describe("The number of rows to display.").optional(),
    shadow: shadowSprinkleSchema.optional(),
    textAlign: textAlignSprinkleSchema.optional(),
    textTransform: textTransformSprinkleSchema.optional(),
    transition: transitionSprinkleSchema.optional(),
    w: wSprinkleSchema.optional(),
    whiteSpace: whiteSpaceSprinkleSchema.optional(),
    z: zSprinkleSchema.optional(),
  })
  .meta({
    examples: [
      { $type: "Textarea", name: "field_name", placeholder: "Enter text" },
    ],
  });

export type ProteusTextarea = Omit<
  z.infer<typeof ProteusTextareaSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusTextareaProps = Omit<
  z.infer<typeof ProteusTextareaSchema>,
  "$type"
>;

export const ProteusValueSchema = z
  .object({
    $type: z.literal("Value"),
    path: z
      .string()
      .describe(
        "JSON pointer path to value (e.g., '/question', '/options/0/label')",
      ),
  })
  .meta({ examples: [{ $type: "Value", path: "/field_name" }] });

export type ProteusValue = Omit<
  z.infer<typeof ProteusValueSchema>,
  "children"
> & { children?: ProteusNode };
export type ProteusValueProps = Omit<
  z.infer<typeof ProteusValueSchema>,
  "$type"
>;

export const ProteusElementSchema = z.discriminatedUnion("$type", [
  ProteusActionSchema,
  ProteusCancelActionSchema,
  ProteusFieldSchema,
  ProteusGroupSchema,
  ProteusHeadingSchema,
  ProteusImageSchema,
  ProteusInputSchema,
  ProteusLinkSchema,
  ProteusMapSchema,
  ProteusRangeSchema,
  ProteusSelectSchema,
  ProteusSelectContentSchema,
  ProteusSelectTriggerSchema,
  ProteusSeparatorSchema,
  ProteusShowSchema,
  ProteusTextSchema,
  ProteusTextareaSchema,
  ProteusValueSchema,
]);
type ProteusElement =
  | ProteusAction
  | ProteusCancelAction
  | ProteusField
  | ProteusGroup
  | ProteusHeading
  | ProteusImage
  | ProteusInput
  | ProteusLink
  | ProteusMap
  | ProteusRange
  | ProteusSelect
  | ProteusSelectContent
  | ProteusSelectTrigger
  | ProteusSeparator
  | ProteusShow
  | ProteusText
  | ProteusTextarea
  | ProteusValue;
