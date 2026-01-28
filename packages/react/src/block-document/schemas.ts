// This file is auto-generated. Do not edit manually.
// Run `pnpm block-spec` to regenerate.

import { z } from "zod";

type BlockNode = BlockElement | BlockElement[] | string;

export const BlockActionSchema = z
  .object({
    $id: z
      .string()
      .describe(
        "Unique identifier for targeting by actions (e.g., setVisibility)",
      )
      .optional(),
    $type: z.literal("Block.Action"),
    $visible: z
      .boolean()
      .describe(
        "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
      )
      .optional(),
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
    children: z.any(),
    onClick: z
      .union([
        z
          .object({
            tool: z.string().describe("Name of registered tool to call"),
          })
          .strict()
          .describe("Server-side tool call"),
        z
          .object({
            action: z
              .literal("setVisibility")
              .describe("Set visibility of target elements"),
            params: z
              .record(z.boolean())
              .describe(
                "Map of element IDs to visibility state (e.g., { 'step-2': true, 'step-1': false })",
              ),
            when: z
              .string()
              .describe(
                "Optional regex pattern - action only executes if value matches",
              )
              .optional(),
          })
          .strict()
          .describe("Client-side setVisibility action"),
      ])
      .describe(
        "Handler for user interactions - either a tool call or client-side action",
      )
      .optional(),
  })
  .strict();

export type BlockAction = Omit<
  z.infer<typeof BlockActionSchema>,
  "children"
> & { children?: BlockNode };
export type BlockActionProps = Omit<
  z.infer<typeof BlockActionSchema>,
  "$id" | "$type" | "$visible"
>;

export const BlockCancelActionSchema = z
  .object({
    $id: z
      .string()
      .describe(
        "Unique identifier for targeting by actions (e.g., setVisibility)",
      )
      .optional(),
    $type: z.literal("Block.CancelAction"),
    $visible: z
      .boolean()
      .describe(
        "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
      )
      .optional(),
    children: z.any().optional(),
    placeholder: z
      .string()
      .describe("Placeholder text for the text input field")
      .optional(),
  })
  .strict();

export type BlockCancelAction = Omit<
  z.infer<typeof BlockCancelActionSchema>,
  "children"
> & { children?: BlockNode };
export type BlockCancelActionProps = Omit<
  z.infer<typeof BlockCancelActionSchema>,
  "$id" | "$type" | "$visible"
>;

export const BlockDocumentSchema = z
  .object({
    $type: z.literal("Block.Document"),
    actions: z
      .array(
        z.union([
          z
            .object({
              $id: z
                .string()
                .describe(
                  "Unique identifier for targeting by actions (e.g., setVisibility)",
                )
                .optional(),
              $type: z.literal("Block.Action"),
              $visible: z
                .boolean()
                .describe(
                  "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
                )
                .optional(),
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
              children: z.any(),
              onClick: z
                .union([
                  z
                    .object({
                      tool: z
                        .string()
                        .describe("Name of registered tool to call"),
                    })
                    .strict()
                    .describe("Server-side tool call"),
                  z
                    .object({
                      action: z
                        .literal("setVisibility")
                        .describe("Set visibility of target elements"),
                      params: z
                        .record(z.boolean())
                        .describe(
                          "Map of element IDs to visibility state (e.g., { 'step-2': true, 'step-1': false })",
                        ),
                      when: z
                        .string()
                        .describe(
                          "Optional regex pattern - action only executes if value matches",
                        )
                        .optional(),
                    })
                    .strict()
                    .describe("Client-side setVisibility action"),
                ])
                .describe(
                  "Handler for user interactions - either a tool call or client-side action",
                )
                .optional(),
            })
            .strict(),
          z
            .object({
              $id: z
                .string()
                .describe(
                  "Unique identifier for targeting by actions (e.g., setVisibility)",
                )
                .optional(),
              $type: z.literal("Block.CancelAction"),
              $visible: z
                .boolean()
                .describe(
                  "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
                )
                .optional(),
              children: z.any().optional(),
              placeholder: z
                .string()
                .describe("Placeholder text for the text input field")
                .optional(),
            })
            .strict(),
        ]),
      )
      .describe("Actions available for this document")
      .optional(),
    blocking: z
      .boolean()
      .describe(
        "If true, hides chat prompt and forces user interaction with document. User can press ESC or close to abandon.",
      )
      .optional(),
    children: z.any(),
  })
  .strict();

export type BlockDocument = Omit<
  z.infer<typeof BlockDocumentSchema>,
  "children"
> & { children?: BlockNode };
export type BlockDocumentProps = Omit<
  z.infer<typeof BlockDocumentSchema>,
  "$id" | "$type" | "$visible"
>;

export const BlockEventHandlerSchema = z
  .union([
    z
      .object({ tool: z.string().describe("Name of registered tool to call") })
      .strict()
      .describe("Server-side tool call"),
    z
      .object({
        action: z
          .literal("setVisibility")
          .describe("Set visibility of target elements"),
        params: z
          .record(z.boolean())
          .describe(
            "Map of element IDs to visibility state (e.g., { 'step-2': true, 'step-1': false })",
          ),
        when: z
          .string()
          .describe(
            "Optional regex pattern - action only executes if value matches",
          )
          .optional(),
      })
      .strict()
      .describe("Client-side setVisibility action"),
  ])
  .describe(
    "Handler for user interactions - either a tool call or client-side action",
  );

export type BlockEventHandler = z.infer<typeof BlockEventHandlerSchema>;

export const BlockFieldSchema = z
  .object({
    $id: z
      .string()
      .describe(
        "Unique identifier for targeting by actions (e.g., setVisibility)",
      )
      .optional(),
    $type: z.literal("Block.Field"),
    $visible: z
      .boolean()
      .describe(
        "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
      )
      .optional(),
    alignItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-items` CSS property")
      .optional(),
    alignSelf: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-self` CSS property")
      .optional(),
    animation: z
      .union([z.literal("ping"), z.literal("pulse"), z.literal("spin")])
      .describe("Animate element with CSS animations")
      .optional(),
    backgroundImage: z
      .literal("gradient.opal")
      .describe("Set the element's `background-image` CSS property")
      .optional(),
    bg: z
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
      )
      .optional(),
    border: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-width` CSS property")
      .optional(),
    borderB: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-bottom-width` CSS property")
      .optional(),
    borderColor: z
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
      )
      .optional(),
    borderL: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-left-width` CSS property")
      .optional(),
    borderR: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-right-width` CSS property")
      .optional(),
    borderT: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-top-width` CSS property")
      .optional(),
    children: z.any().optional(),
    color: z
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
      )
      .optional(),
    cursor: z
      .union([z.literal("default"), z.literal("pointer"), z.literal("text")])
      .describe("Set the element's `cursor` CSS property")
      .optional(),
    description: z.any().optional(),
    display: z
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
      .describe("Set the element's `display` CSS property")
      .optional(),
    flex: z
      .union([
        z.literal("initial"),
        z.literal("none"),
        z.literal("auto"),
        z.literal("1"),
      ])
      .describe("Set the element's `flex` CSS property")
      .optional(),
    flexDirection: z
      .union([
        z.literal("column"),
        z.literal("column-reverse"),
        z.literal("row"),
        z.literal("row-reverse"),
      ])
      .describe("Set the element's `flex-direction` CSS property")
      .optional(),
    flexWrap: z
      .union([z.literal("nowrap"), z.literal("wrap")])
      .describe("Set the element's `flex-wrap` CSS property")
      .optional(),
    fontFamily: z
      .union([z.literal("mono"), z.literal("sans")])
      .describe(
        "Set the element's font family. Only accepts predefined fontFamily tokens.",
      )
      .optional(),
    fontSize: z
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
      )
      .optional(),
    fontWeight: z
      .union([
        z.literal("inherit"),
        z.literal("600"),
        z.literal("400"),
        z.literal("500"),
        z.literal("700"),
      ])
      .describe("Set the element's `font-weight` CSS property")
      .optional(),
    gap: z
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
      .describe("Set the element's `gap` CSS property")
      .optional(),
    gridColumn: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Set the element's size across grid columns")
      .optional(),
    gridTemplateColumns: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Control number of columns in a grid layout")
      .optional(),
    h: z
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
        'Set the element\'s height. Only accepts predefined values: size tokens\n(xs, sm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    info: z.any().optional(),
    justifyContent: z
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
      .describe("Set the element's `justify-content` CSS property")
      .optional(),
    justifyItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `justify-items` CSS property")
      .optional(),
    label: z.any().optional(),
    m: z
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
        'Set the element\'s margin on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    maxH: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum height. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    maxW: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum width. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    mb: z
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
        'Set the element\'s bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    ml: z
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
        'Set the element\'s left margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mr: z
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
        'Set the element\'s right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mt: z
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
        'Set the element\'s top margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mx: z
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
        'Set the element\'s left and right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    my: z
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
        'Set the element\'s top and bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    objectFit: z
      .union([
        z.literal("contain"),
        z.literal("fill"),
        z.literal("none"),
        z.literal("cover"),
      ])
      .describe("Set the element's `object-fit` CSS property")
      .optional(),
    overflow: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow` CSS property")
      .optional(),
    overflowX: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-x` CSS property")
      .optional(),
    overflowY: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-y` CSS property")
      .optional(),
    p: z
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
        'Set the element\'s padding on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pb: z
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
        'Set the element\'s bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pl: z
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
        'Set the element\'s left padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    placeItems: z
      .literal("center")
      .describe("Set the element's `place-items` CSS property")
      .optional(),
    pointerEvents: z
      .union([z.literal("none"), z.literal("auto")])
      .describe("Set the element's `pointer-events` CSS property")
      .optional(),
    pr: z
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
        'Set the element\'s right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pt: z
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
        'Set the element\'s top padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    px: z
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
        'Set the element\'s left and right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    py: z
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
        'Set the element\'s top and bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    required: z
      .boolean()
      .describe("Display an asterisk for required inputs.")
      .optional(),
    rounded: z
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
      )
      .optional(),
    shadow: z
      .union([
        z.literal("none"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
      ])
      .describe(
        "Set the element's box shadow. Only accepts predefined boxShadow tokens.",
      )
      .optional(),
    size: z
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
        'Set the element\'s width and height. Only accepts predefined values: size\ntokens (xs, sm, md, etc.), numeric spacing values (16, 24, 32),\nfractional percentages (1/2, 1/3), or special keywords (auto, full, fit,\nmax, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately (e.g., prefer `size="24"` over `w="24" h="24"`).',
      )
      .optional(),
    textAlign: z
      .union([
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
        z.literal("justify"),
      ])
      .describe("Set the element's `text-align` CSS property")
      .optional(),
    textTransform: z
      .union([
        z.literal("none"),
        z.literal("capitalize"),
        z.literal("uppercase"),
      ])
      .describe("Set the element's `text-transform` CSS property")
      .optional(),
    transition: z
      .union([
        z.literal("opacity"),
        z.literal("transform"),
        z.literal("all"),
        z.literal("none"),
        z.literal("colors"),
      ])
      .describe("Control which CSS properties should transition")
      .optional(),
    w: z
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
        'Set the element\'s width. Only accepts predefined values: size tokens (xs,\nsm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    whiteSpace: z
      .literal("nowrap")
      .describe("Set the element's `white-space` CSS property")
      .optional(),
    z: z
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
      )
      .optional(),
  })
  .strict();

export type BlockField = Omit<z.infer<typeof BlockFieldSchema>, "children"> & {
  children?: BlockNode;
};
export type BlockFieldProps = Omit<
  z.infer<typeof BlockFieldSchema>,
  "$id" | "$type" | "$visible"
>;

export const BlockGroupSchema = z
  .object({
    $id: z
      .string()
      .describe(
        "Unique identifier for targeting by actions (e.g., setVisibility)",
      )
      .optional(),
    $type: z.literal("Block.Group"),
    $visible: z
      .boolean()
      .describe(
        "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
      )
      .optional(),
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
    alignSelf: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-self` CSS property")
      .optional(),
    animation: z
      .union([z.literal("ping"), z.literal("pulse"), z.literal("spin")])
      .describe("Animate element with CSS animations")
      .optional(),
    backgroundImage: z
      .literal("gradient.opal")
      .describe("Set the element's `background-image` CSS property")
      .optional(),
    bg: z
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
      )
      .optional(),
    border: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-width` CSS property")
      .optional(),
    borderB: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-bottom-width` CSS property")
      .optional(),
    borderColor: z
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
      )
      .optional(),
    borderL: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-left-width` CSS property")
      .optional(),
    borderR: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-right-width` CSS property")
      .optional(),
    borderT: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-top-width` CSS property")
      .optional(),
    children: z.any().optional(),
    color: z
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
      )
      .optional(),
    cursor: z
      .union([z.literal("default"), z.literal("pointer"), z.literal("text")])
      .describe("Set the element's `cursor` CSS property")
      .optional(),
    display: z
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
      .describe("Set the element's `display` CSS property")
      .optional(),
    flex: z
      .union([
        z.literal("initial"),
        z.literal("none"),
        z.literal("auto"),
        z.literal("1"),
      ])
      .describe("Set the element's `flex` CSS property")
      .optional(),
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
    flexWrap: z
      .union([z.literal("nowrap"), z.literal("wrap")])
      .describe("Set the element's `flex-wrap` CSS property")
      .optional(),
    fontFamily: z
      .union([z.literal("mono"), z.literal("sans")])
      .describe(
        "Set the element's font family. Only accepts predefined fontFamily tokens.",
      )
      .optional(),
    fontSize: z
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
      )
      .optional(),
    fontWeight: z
      .union([
        z.literal("inherit"),
        z.literal("600"),
        z.literal("400"),
        z.literal("500"),
        z.literal("700"),
      ])
      .describe("Set the element's `font-weight` CSS property")
      .optional(),
    gap: z
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
      .describe("Set the element's `gap` CSS property")
      .optional(),
    gridColumn: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Set the element's size across grid columns")
      .optional(),
    gridTemplateColumns: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Control number of columns in a grid layout")
      .optional(),
    h: z
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
        'Set the element\'s height. Only accepts predefined values: size tokens\n(xs, sm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    justifyContent: z
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
      .describe("Set the element's `justify-content` CSS property")
      .optional(),
    justifyItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `justify-items` CSS property")
      .optional(),
    m: z
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
        'Set the element\'s margin on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    maxH: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum height. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    maxW: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum width. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    mb: z
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
        'Set the element\'s bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    ml: z
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
        'Set the element\'s left margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mr: z
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
        'Set the element\'s right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mt: z
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
        'Set the element\'s top margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mx: z
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
        'Set the element\'s left and right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    my: z
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
        'Set the element\'s top and bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    objectFit: z
      .union([
        z.literal("contain"),
        z.literal("fill"),
        z.literal("none"),
        z.literal("cover"),
      ])
      .describe("Set the element's `object-fit` CSS property")
      .optional(),
    overflow: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow` CSS property")
      .optional(),
    overflowX: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-x` CSS property")
      .optional(),
    overflowY: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-y` CSS property")
      .optional(),
    p: z
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
        'Set the element\'s padding on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pb: z
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
        'Set the element\'s bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pl: z
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
        'Set the element\'s left padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    placeItems: z
      .literal("center")
      .describe("Set the element's `place-items` CSS property")
      .optional(),
    pointerEvents: z
      .union([z.literal("none"), z.literal("auto")])
      .describe("Set the element's `pointer-events` CSS property")
      .optional(),
    pr: z
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
        'Set the element\'s right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pt: z
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
        'Set the element\'s top padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    px: z
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
        'Set the element\'s left and right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    py: z
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
        'Set the element\'s top and bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    rounded: z
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
      )
      .optional(),
    shadow: z
      .union([
        z.literal("none"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
      ])
      .describe(
        "Set the element's box shadow. Only accepts predefined boxShadow tokens.",
      )
      .optional(),
    size: z
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
        'Set the element\'s width and height. Only accepts predefined values: size\ntokens (xs, sm, md, etc.), numeric spacing values (16, 24, 32),\nfractional percentages (1/2, 1/3), or special keywords (auto, full, fit,\nmax, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately (e.g., prefer `size="24"` over `w="24" h="24"`).',
      )
      .optional(),
    textAlign: z
      .union([
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
        z.literal("justify"),
      ])
      .describe("Set the element's `text-align` CSS property")
      .optional(),
    textTransform: z
      .union([
        z.literal("none"),
        z.literal("capitalize"),
        z.literal("uppercase"),
      ])
      .describe("Set the element's `text-transform` CSS property")
      .optional(),
    transition: z
      .union([
        z.literal("opacity"),
        z.literal("transform"),
        z.literal("all"),
        z.literal("none"),
        z.literal("colors"),
      ])
      .describe("Control which CSS properties should transition")
      .optional(),
    w: z
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
        'Set the element\'s width. Only accepts predefined values: size tokens (xs,\nsm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    whiteSpace: z
      .literal("nowrap")
      .describe("Set the element's `white-space` CSS property")
      .optional(),
    z: z
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
      )
      .optional(),
  })
  .strict();

export type BlockGroup = Omit<z.infer<typeof BlockGroupSchema>, "children"> & {
  children?: BlockNode;
};
export type BlockGroupProps = Omit<
  z.infer<typeof BlockGroupSchema>,
  "$id" | "$type" | "$visible"
>;

export const BlockHeadingSchema = z
  .object({
    $id: z
      .string()
      .describe(
        "Unique identifier for targeting by actions (e.g., setVisibility)",
      )
      .optional(),
    $type: z.literal("Block.Heading"),
    $visible: z
      .boolean()
      .describe(
        "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
      )
      .optional(),
    alignItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-items` CSS property")
      .optional(),
    alignSelf: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-self` CSS property")
      .optional(),
    animation: z
      .union([z.literal("ping"), z.literal("pulse"), z.literal("spin")])
      .describe("Animate element with CSS animations")
      .optional(),
    backgroundImage: z
      .literal("gradient.opal")
      .describe("Set the element's `background-image` CSS property")
      .optional(),
    bg: z
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
      )
      .optional(),
    border: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-width` CSS property")
      .optional(),
    borderB: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-bottom-width` CSS property")
      .optional(),
    borderColor: z
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
      )
      .optional(),
    borderL: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-left-width` CSS property")
      .optional(),
    borderR: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-right-width` CSS property")
      .optional(),
    borderT: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-top-width` CSS property")
      .optional(),
    children: z.any().optional(),
    color: z
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
      )
      .optional(),
    cursor: z
      .union([z.literal("default"), z.literal("pointer"), z.literal("text")])
      .describe("Set the element's `cursor` CSS property")
      .optional(),
    display: z
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
      .describe("Set the element's `display` CSS property")
      .optional(),
    flex: z
      .union([
        z.literal("initial"),
        z.literal("none"),
        z.literal("auto"),
        z.literal("1"),
      ])
      .describe("Set the element's `flex` CSS property")
      .optional(),
    flexDirection: z
      .union([
        z.literal("column"),
        z.literal("column-reverse"),
        z.literal("row"),
        z.literal("row-reverse"),
      ])
      .describe("Set the element's `flex-direction` CSS property")
      .optional(),
    flexWrap: z
      .union([z.literal("nowrap"), z.literal("wrap")])
      .describe("Set the element's `flex-wrap` CSS property")
      .optional(),
    fontFamily: z
      .union([z.literal("mono"), z.literal("sans")])
      .describe(
        "Set the element's font family. Only accepts predefined fontFamily tokens.",
      )
      .optional(),
    fontSize: z
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
      )
      .optional(),
    fontWeight: z
      .union([
        z.literal("inherit"),
        z.literal("600"),
        z.literal("400"),
        z.literal("500"),
        z.literal("700"),
      ])
      .describe("Set the element's `font-weight` CSS property")
      .optional(),
    gap: z
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
      .describe("Set the element's `gap` CSS property")
      .optional(),
    gridColumn: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Set the element's size across grid columns")
      .optional(),
    gridTemplateColumns: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Control number of columns in a grid layout")
      .optional(),
    h: z
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
        'Set the element\'s height. Only accepts predefined values: size tokens\n(xs, sm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    justifyContent: z
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
      .describe("Set the element's `justify-content` CSS property")
      .optional(),
    justifyItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `justify-items` CSS property")
      .optional(),
    level: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe(
        'Heading level (1-4) that controls both the semantic HTML tag and font size.\n- `level="1"`: renders `<h1>` with `fontSize="4xl"` (default)\n- `level="2"`: renders `<h2>` with `fontSize="3xl"`\n- `level="3"`: renders `<h3>` with `fontSize="2xl"`\n- `level="4"`: renders `<h4>` with `fontSize="xl"`\n\nUse `asChild` to decouple the semantic level from visual appearance.',
      )
      .optional(),
    m: z
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
        'Set the element\'s margin on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    maxH: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum height. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    maxW: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum width. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    mb: z
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
        'Set the element\'s bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    ml: z
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
        'Set the element\'s left margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mr: z
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
        'Set the element\'s right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mt: z
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
        'Set the element\'s top margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mx: z
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
        'Set the element\'s left and right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    my: z
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
        'Set the element\'s top and bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    objectFit: z
      .union([
        z.literal("contain"),
        z.literal("fill"),
        z.literal("none"),
        z.literal("cover"),
      ])
      .describe("Set the element's `object-fit` CSS property")
      .optional(),
    overflow: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow` CSS property")
      .optional(),
    overflowX: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-x` CSS property")
      .optional(),
    overflowY: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-y` CSS property")
      .optional(),
    p: z
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
        'Set the element\'s padding on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pb: z
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
        'Set the element\'s bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pl: z
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
        'Set the element\'s left padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    placeItems: z
      .literal("center")
      .describe("Set the element's `place-items` CSS property")
      .optional(),
    pointerEvents: z
      .union([z.literal("none"), z.literal("auto")])
      .describe("Set the element's `pointer-events` CSS property")
      .optional(),
    pr: z
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
        'Set the element\'s right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pt: z
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
        'Set the element\'s top padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    px: z
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
        'Set the element\'s left and right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    py: z
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
        'Set the element\'s top and bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    rounded: z
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
      )
      .optional(),
    shadow: z
      .union([
        z.literal("none"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
      ])
      .describe(
        "Set the element's box shadow. Only accepts predefined boxShadow tokens.",
      )
      .optional(),
    size: z
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
        'Set the element\'s width and height. Only accepts predefined values: size\ntokens (xs, sm, md, etc.), numeric spacing values (16, 24, 32),\nfractional percentages (1/2, 1/3), or special keywords (auto, full, fit,\nmax, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately (e.g., prefer `size="24"` over `w="24" h="24"`).',
      )
      .optional(),
    textAlign: z
      .union([
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
        z.literal("justify"),
      ])
      .describe("Set the element's `text-align` CSS property")
      .optional(),
    textTransform: z
      .union([
        z.literal("none"),
        z.literal("capitalize"),
        z.literal("uppercase"),
      ])
      .describe("Set the element's `text-transform` CSS property")
      .optional(),
    transition: z
      .union([
        z.literal("opacity"),
        z.literal("transform"),
        z.literal("all"),
        z.literal("none"),
        z.literal("colors"),
      ])
      .describe("Control which CSS properties should transition")
      .optional(),
    w: z
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
        'Set the element\'s width. Only accepts predefined values: size tokens (xs,\nsm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    whiteSpace: z
      .literal("nowrap")
      .describe("Set the element's `white-space` CSS property")
      .optional(),
    z: z
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
      )
      .optional(),
  })
  .strict();

export type BlockHeading = Omit<
  z.infer<typeof BlockHeadingSchema>,
  "children"
> & { children?: BlockNode };
export type BlockHeadingProps = Omit<
  z.infer<typeof BlockHeadingSchema>,
  "$id" | "$type" | "$visible"
>;

export const BlockInputSchema = z
  .object({
    $id: z
      .string()
      .describe(
        "Unique identifier for targeting by actions (e.g., setVisibility)",
      )
      .optional(),
    $type: z.literal("Block.Input"),
    $visible: z
      .boolean()
      .describe(
        "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
      )
      .optional(),
    addonAfter: z.any().optional(),
    addonBefore: z.any().optional(),
    alignItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-items` CSS property")
      .optional(),
    alignSelf: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-self` CSS property")
      .optional(),
    animation: z
      .union([z.literal("ping"), z.literal("pulse"), z.literal("spin")])
      .describe("Animate element with CSS animations")
      .optional(),
    appearance: z
      .union([z.literal("number"), z.literal("default")])
      .describe("Control the appearance of the input.")
      .optional(),
    backgroundImage: z
      .literal("gradient.opal")
      .describe("Set the element's `background-image` CSS property")
      .optional(),
    bg: z
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
      )
      .optional(),
    border: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-width` CSS property")
      .optional(),
    borderB: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-bottom-width` CSS property")
      .optional(),
    borderColor: z
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
      )
      .optional(),
    borderL: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-left-width` CSS property")
      .optional(),
    borderR: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-right-width` CSS property")
      .optional(),
    borderT: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-top-width` CSS property")
      .optional(),
    color: z
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
      )
      .optional(),
    cursor: z
      .union([z.literal("default"), z.literal("pointer"), z.literal("text")])
      .describe("Set the element's `cursor` CSS property")
      .optional(),
    display: z
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
      .describe("Set the element's `display` CSS property")
      .optional(),
    flex: z
      .union([
        z.literal("initial"),
        z.literal("none"),
        z.literal("auto"),
        z.literal("1"),
      ])
      .describe("Set the element's `flex` CSS property")
      .optional(),
    flexDirection: z
      .union([
        z.literal("column"),
        z.literal("column-reverse"),
        z.literal("row"),
        z.literal("row-reverse"),
      ])
      .describe("Set the element's `flex-direction` CSS property")
      .optional(),
    flexWrap: z
      .union([z.literal("nowrap"), z.literal("wrap")])
      .describe("Set the element's `flex-wrap` CSS property")
      .optional(),
    fontFamily: z
      .union([z.literal("mono"), z.literal("sans")])
      .describe(
        "Set the element's font family. Only accepts predefined fontFamily tokens.",
      )
      .optional(),
    fontSize: z
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
      )
      .optional(),
    fontWeight: z
      .union([
        z.literal("inherit"),
        z.literal("600"),
        z.literal("400"),
        z.literal("500"),
        z.literal("700"),
      ])
      .describe("Set the element's `font-weight` CSS property")
      .optional(),
    gap: z
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
      .describe("Set the element's `gap` CSS property")
      .optional(),
    gridColumn: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Set the element's size across grid columns")
      .optional(),
    gridTemplateColumns: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Control number of columns in a grid layout")
      .optional(),
    h: z
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
        'Set the element\'s height. Only accepts predefined values: size tokens\n(xs, sm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    justifyContent: z
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
      .describe("Set the element's `justify-content` CSS property")
      .optional(),
    justifyItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `justify-items` CSS property")
      .optional(),
    m: z
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
        'Set the element\'s margin on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    maxH: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum height. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    maxW: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum width. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    mb: z
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
        'Set the element\'s bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    ml: z
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
        'Set the element\'s left margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mr: z
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
        'Set the element\'s right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mt: z
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
        'Set the element\'s top margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mx: z
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
        'Set the element\'s left and right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    my: z
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
        'Set the element\'s top and bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    name: z
      .string()
      .describe("The name of the form control element.")
      .optional(),
    objectFit: z
      .union([
        z.literal("contain"),
        z.literal("fill"),
        z.literal("none"),
        z.literal("cover"),
      ])
      .describe("Set the element's `object-fit` CSS property")
      .optional(),
    onValueChange: z
      .union([
        z
          .object({
            tool: z.string().describe("Name of registered tool to call"),
          })
          .strict()
          .describe("Server-side tool call"),
        z
          .object({
            action: z
              .literal("setVisibility")
              .describe("Set visibility of target elements"),
            params: z
              .record(z.boolean())
              .describe(
                "Map of element IDs to visibility state (e.g., { 'step-2': true, 'step-1': false })",
              ),
            when: z
              .string()
              .describe(
                "Optional regex pattern - action only executes if value matches",
              )
              .optional(),
          })
          .strict()
          .describe("Client-side setVisibility action"),
      ])
      .describe(
        "Handler for user interactions - either a tool call or client-side action",
      )
      .optional(),
    overflow: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow` CSS property")
      .optional(),
    overflowX: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-x` CSS property")
      .optional(),
    overflowY: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-y` CSS property")
      .optional(),
    p: z
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
        'Set the element\'s padding on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pb: z
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
        'Set the element\'s bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pl: z
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
        'Set the element\'s left padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    placeholder: z
      .string()
      .describe("The placeholder text to use when control has no value.")
      .optional(),
    placeItems: z
      .literal("center")
      .describe("Set the element's `place-items` CSS property")
      .optional(),
    pointerEvents: z
      .union([z.literal("none"), z.literal("auto")])
      .describe("Set the element's `pointer-events` CSS property")
      .optional(),
    pr: z
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
        'Set the element\'s right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pt: z
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
        'Set the element\'s top padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    px: z
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
        'Set the element\'s left and right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    py: z
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
        'Set the element\'s top and bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    rounded: z
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
      )
      .optional(),
    shadow: z
      .union([
        z.literal("none"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
      ])
      .describe(
        "Set the element's box shadow. Only accepts predefined boxShadow tokens.",
      )
      .optional(),
    textAlign: z
      .union([
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
        z.literal("justify"),
      ])
      .describe("Set the element's `text-align` CSS property")
      .optional(),
    textTransform: z
      .union([
        z.literal("none"),
        z.literal("capitalize"),
        z.literal("uppercase"),
      ])
      .describe("Set the element's `text-transform` CSS property")
      .optional(),
    transition: z
      .union([
        z.literal("opacity"),
        z.literal("transform"),
        z.literal("all"),
        z.literal("none"),
        z.literal("colors"),
      ])
      .describe("Control which CSS properties should transition")
      .optional(),
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
    w: z
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
        'Set the element\'s width. Only accepts predefined values: size tokens (xs,\nsm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    whiteSpace: z
      .literal("nowrap")
      .describe("Set the element's `white-space` CSS property")
      .optional(),
    z: z
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
      )
      .optional(),
  })
  .strict();

export type BlockInput = Omit<z.infer<typeof BlockInputSchema>, "children"> & {
  children?: BlockNode;
};
export type BlockInputProps = Omit<
  z.infer<typeof BlockInputSchema>,
  "$id" | "$type" | "$visible"
>;

export const BlockLinkSchema = z
  .object({
    $id: z
      .string()
      .describe(
        "Unique identifier for targeting by actions (e.g., setVisibility)",
      )
      .optional(),
    $type: z.literal("Block.Link"),
    $visible: z
      .boolean()
      .describe(
        "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
      )
      .optional(),
    alignItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-items` CSS property")
      .optional(),
    alignSelf: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-self` CSS property")
      .optional(),
    animation: z
      .union([z.literal("ping"), z.literal("pulse"), z.literal("spin")])
      .describe("Animate element with CSS animations")
      .optional(),
    backgroundImage: z
      .literal("gradient.opal")
      .describe("Set the element's `background-image` CSS property")
      .optional(),
    bg: z
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
      )
      .optional(),
    border: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-width` CSS property")
      .optional(),
    borderB: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-bottom-width` CSS property")
      .optional(),
    borderColor: z
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
      )
      .optional(),
    borderL: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-left-width` CSS property")
      .optional(),
    borderR: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-right-width` CSS property")
      .optional(),
    borderT: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-top-width` CSS property")
      .optional(),
    children: z.any().optional(),
    color: z
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
      )
      .optional(),
    cursor: z
      .union([z.literal("default"), z.literal("pointer"), z.literal("text")])
      .describe("Set the element's `cursor` CSS property")
      .optional(),
    display: z
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
      .describe("Set the element's `display` CSS property")
      .optional(),
    flex: z
      .union([
        z.literal("initial"),
        z.literal("none"),
        z.literal("auto"),
        z.literal("1"),
      ])
      .describe("Set the element's `flex` CSS property")
      .optional(),
    flexDirection: z
      .union([
        z.literal("column"),
        z.literal("column-reverse"),
        z.literal("row"),
        z.literal("row-reverse"),
      ])
      .describe("Set the element's `flex-direction` CSS property")
      .optional(),
    flexWrap: z
      .union([z.literal("nowrap"), z.literal("wrap")])
      .describe("Set the element's `flex-wrap` CSS property")
      .optional(),
    fontFamily: z
      .union([z.literal("mono"), z.literal("sans")])
      .describe(
        "Set the element's font family. Only accepts predefined fontFamily tokens.",
      )
      .optional(),
    fontSize: z
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
      )
      .optional(),
    fontWeight: z
      .union([
        z.literal("inherit"),
        z.literal("600"),
        z.literal("400"),
        z.literal("500"),
        z.literal("700"),
      ])
      .describe("Set the element's `font-weight` CSS property")
      .optional(),
    gap: z
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
      .describe("Set the element's `gap` CSS property")
      .optional(),
    gridColumn: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Set the element's size across grid columns")
      .optional(),
    gridTemplateColumns: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Control number of columns in a grid layout")
      .optional(),
    h: z
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
        'Set the element\'s height. Only accepts predefined values: size tokens\n(xs, sm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    href: z.string().describe("The link href.").optional(),
    justifyContent: z
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
      .describe("Set the element's `justify-content` CSS property")
      .optional(),
    justifyItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `justify-items` CSS property")
      .optional(),
    m: z
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
        'Set the element\'s margin on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    maxH: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum height. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    maxW: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum width. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    mb: z
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
        'Set the element\'s bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    ml: z
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
        'Set the element\'s left margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mr: z
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
        'Set the element\'s right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mt: z
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
        'Set the element\'s top margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mx: z
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
        'Set the element\'s left and right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    my: z
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
        'Set the element\'s top and bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    objectFit: z
      .union([
        z.literal("contain"),
        z.literal("fill"),
        z.literal("none"),
        z.literal("cover"),
      ])
      .describe("Set the element's `object-fit` CSS property")
      .optional(),
    overflow: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow` CSS property")
      .optional(),
    overflowX: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-x` CSS property")
      .optional(),
    overflowY: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-y` CSS property")
      .optional(),
    p: z
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
        'Set the element\'s padding on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pb: z
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
        'Set the element\'s bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pl: z
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
        'Set the element\'s left padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    placeItems: z
      .literal("center")
      .describe("Set the element's `place-items` CSS property")
      .optional(),
    pointerEvents: z
      .union([z.literal("none"), z.literal("auto")])
      .describe("Set the element's `pointer-events` CSS property")
      .optional(),
    pr: z
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
        'Set the element\'s right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pt: z
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
        'Set the element\'s top padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    px: z
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
        'Set the element\'s left and right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    py: z
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
        'Set the element\'s top and bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    rounded: z
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
      )
      .optional(),
    shadow: z
      .union([
        z.literal("none"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
      ])
      .describe(
        "Set the element's box shadow. Only accepts predefined boxShadow tokens.",
      )
      .optional(),
    size: z
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
        'Set the element\'s width and height. Only accepts predefined values: size\ntokens (xs, sm, md, etc.), numeric spacing values (16, 24, 32),\nfractional percentages (1/2, 1/3), or special keywords (auto, full, fit,\nmax, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately (e.g., prefer `size="24"` over `w="24" h="24"`).',
      )
      .optional(),
    textAlign: z
      .union([
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
        z.literal("justify"),
      ])
      .describe("Set the element's `text-align` CSS property")
      .optional(),
    textTransform: z
      .union([
        z.literal("none"),
        z.literal("capitalize"),
        z.literal("uppercase"),
      ])
      .describe("Set the element's `text-transform` CSS property")
      .optional(),
    transition: z
      .union([
        z.literal("opacity"),
        z.literal("transform"),
        z.literal("all"),
        z.literal("none"),
        z.literal("colors"),
      ])
      .describe("Control which CSS properties should transition")
      .optional(),
    w: z
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
        'Set the element\'s width. Only accepts predefined values: size tokens (xs,\nsm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    whiteSpace: z
      .literal("nowrap")
      .describe("Set the element's `white-space` CSS property")
      .optional(),
    z: z
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
      )
      .optional(),
  })
  .strict();

export type BlockLink = Omit<z.infer<typeof BlockLinkSchema>, "children"> & {
  children?: BlockNode;
};
export type BlockLinkProps = Omit<
  z.infer<typeof BlockLinkSchema>,
  "$id" | "$type" | "$visible"
>;

export const BlockRangeSchema = z
  .object({
    $id: z
      .string()
      .describe(
        "Unique identifier for targeting by actions (e.g., setVisibility)",
      )
      .optional(),
    $type: z.literal("Block.Range"),
    $visible: z
      .boolean()
      .describe(
        "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
      )
      .optional(),
    alignItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-items` CSS property")
      .optional(),
    alignSelf: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-self` CSS property")
      .optional(),
    animation: z
      .union([z.literal("ping"), z.literal("pulse"), z.literal("spin")])
      .describe("Animate element with CSS animations")
      .optional(),
    backgroundImage: z
      .literal("gradient.opal")
      .describe("Set the element's `background-image` CSS property")
      .optional(),
    bg: z
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
      )
      .optional(),
    border: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-width` CSS property")
      .optional(),
    borderB: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-bottom-width` CSS property")
      .optional(),
    borderColor: z
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
      )
      .optional(),
    borderL: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-left-width` CSS property")
      .optional(),
    borderR: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-right-width` CSS property")
      .optional(),
    borderT: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-top-width` CSS property")
      .optional(),
    color: z
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
      )
      .optional(),
    cursor: z
      .union([z.literal("default"), z.literal("pointer"), z.literal("text")])
      .describe("Set the element's `cursor` CSS property")
      .optional(),
    display: z
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
      .describe("Set the element's `display` CSS property")
      .optional(),
    flex: z
      .union([
        z.literal("initial"),
        z.literal("none"),
        z.literal("auto"),
        z.literal("1"),
      ])
      .describe("Set the element's `flex` CSS property")
      .optional(),
    flexDirection: z
      .union([
        z.literal("column"),
        z.literal("column-reverse"),
        z.literal("row"),
        z.literal("row-reverse"),
      ])
      .describe("Set the element's `flex-direction` CSS property")
      .optional(),
    flexWrap: z
      .union([z.literal("nowrap"), z.literal("wrap")])
      .describe("Set the element's `flex-wrap` CSS property")
      .optional(),
    fontFamily: z
      .union([z.literal("mono"), z.literal("sans")])
      .describe(
        "Set the element's font family. Only accepts predefined fontFamily tokens.",
      )
      .optional(),
    fontSize: z
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
      )
      .optional(),
    fontWeight: z
      .union([
        z.literal("inherit"),
        z.literal("600"),
        z.literal("400"),
        z.literal("500"),
        z.literal("700"),
      ])
      .describe("Set the element's `font-weight` CSS property")
      .optional(),
    gap: z
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
      .describe("Set the element's `gap` CSS property")
      .optional(),
    gridColumn: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Set the element's size across grid columns")
      .optional(),
    gridTemplateColumns: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Control number of columns in a grid layout")
      .optional(),
    h: z
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
        'Set the element\'s height. Only accepts predefined values: size tokens\n(xs, sm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    justifyContent: z
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
      .describe("Set the element's `justify-content` CSS property")
      .optional(),
    justifyItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `justify-items` CSS property")
      .optional(),
    m: z
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
        'Set the element\'s margin on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    marks: z
      .array(
        z.union([
          z.number(),
          z
            .object({
              label: z.string().describe("The label for the mark"),
              value: z.number().describe("The value for the mark"),
            })
            .strict(),
        ]),
      )
      .describe("The marks to display on the range steps.")
      .optional(),
    max: z.number().describe("The maximum value for the range.").optional(),
    maxH: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum height. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    maxW: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum width. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    mb: z
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
        'Set the element\'s bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    min: z.number().describe("The minimum value for the range.").optional(),
    ml: z
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
        'Set the element\'s left margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mr: z
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
        'Set the element\'s right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mt: z
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
        'Set the element\'s top margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mx: z
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
        'Set the element\'s left and right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    my: z
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
        'Set the element\'s top and bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    objectFit: z
      .union([
        z.literal("contain"),
        z.literal("fill"),
        z.literal("none"),
        z.literal("cover"),
      ])
      .describe("Set the element's `object-fit` CSS property")
      .optional(),
    overflow: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow` CSS property")
      .optional(),
    overflowX: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-x` CSS property")
      .optional(),
    overflowY: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-y` CSS property")
      .optional(),
    p: z
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
        'Set the element\'s padding on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pb: z
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
        'Set the element\'s bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pl: z
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
        'Set the element\'s left padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    placeItems: z
      .literal("center")
      .describe("Set the element's `place-items` CSS property")
      .optional(),
    pointerEvents: z
      .union([z.literal("none"), z.literal("auto")])
      .describe("Set the element's `pointer-events` CSS property")
      .optional(),
    pr: z
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
        'Set the element\'s right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pt: z
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
        'Set the element\'s top padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    px: z
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
        'Set the element\'s left and right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    py: z
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
        'Set the element\'s top and bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    rounded: z
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
      )
      .optional(),
    shadow: z
      .union([
        z.literal("none"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
      ])
      .describe(
        "Set the element's box shadow. Only accepts predefined boxShadow tokens.",
      )
      .optional(),
    step: z
      .number()
      .describe("The stepping interval for the range.")
      .optional(),
    textAlign: z
      .union([
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
        z.literal("justify"),
      ])
      .describe("Set the element's `text-align` CSS property")
      .optional(),
    textTransform: z
      .union([
        z.literal("none"),
        z.literal("capitalize"),
        z.literal("uppercase"),
      ])
      .describe("Set the element's `text-transform` CSS property")
      .optional(),
    transition: z
      .union([
        z.literal("opacity"),
        z.literal("transform"),
        z.literal("all"),
        z.literal("none"),
        z.literal("colors"),
      ])
      .describe("Control which CSS properties should transition")
      .optional(),
    w: z
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
        'Set the element\'s width. Only accepts predefined values: size tokens (xs,\nsm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    whiteSpace: z
      .literal("nowrap")
      .describe("Set the element's `white-space` CSS property")
      .optional(),
    z: z
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
      )
      .optional(),
  })
  .strict();

export type BlockRange = Omit<z.infer<typeof BlockRangeSchema>, "children"> & {
  children?: BlockNode;
};
export type BlockRangeProps = Omit<
  z.infer<typeof BlockRangeSchema>,
  "$id" | "$type" | "$visible"
>;

export const BlockSelectSchema = z
  .object({
    $id: z
      .string()
      .describe(
        "Unique identifier for targeting by actions (e.g., setVisibility)",
      )
      .optional(),
    $type: z.literal("Block.Select"),
    $visible: z
      .boolean()
      .describe(
        "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
      )
      .optional(),
    children: z.any().optional(),
    name: z
      .string()
      .describe("The name of the inner select element.")
      .optional(),
    options: z
      .array(
        z
          .object({
            execute: z
              .union([
                z
                  .object({
                    tool: z
                      .string()
                      .describe("Name of registered tool to call"),
                  })
                  .strict()
                  .describe("Server-side tool call"),
                z
                  .object({
                    action: z
                      .literal("setVisibility")
                      .describe("Set visibility of target elements"),
                    params: z
                      .record(z.boolean())
                      .describe(
                        "Map of element IDs to visibility state (e.g., { 'step-2': true, 'step-1': false })",
                      ),
                    when: z
                      .string()
                      .describe(
                        "Optional regex pattern - action only executes if value matches",
                      )
                      .optional(),
                  })
                  .strict()
                  .describe("Client-side setVisibility action"),
              ])
              .describe(
                "Handler for user interactions - either a tool call or client-side action",
              )
              .optional(),
            label: z.string().describe("String representation of items"),
            value: z.string().describe("Return a unique key for each item"),
          })
          .strict(),
      )
      .describe("The select items/options we want to render."),
  })
  .strict();

export type BlockSelect = Omit<
  z.infer<typeof BlockSelectSchema>,
  "children"
> & { children?: BlockNode };
export type BlockSelectProps = Omit<
  z.infer<typeof BlockSelectSchema>,
  "$id" | "$type" | "$visible"
>;

export const BlockSelectContentSchema = z
  .object({
    $id: z
      .string()
      .describe(
        "Unique identifier for targeting by actions (e.g., setVisibility)",
      )
      .optional(),
    $type: z.literal("Block.SelectContent"),
    $visible: z
      .boolean()
      .describe(
        "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
      )
      .optional(),
    alignItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-items` CSS property")
      .optional(),
    alignSelf: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-self` CSS property")
      .optional(),
    animation: z
      .union([z.literal("ping"), z.literal("pulse"), z.literal("spin")])
      .describe("Animate element with CSS animations")
      .optional(),
    backgroundImage: z
      .literal("gradient.opal")
      .describe("Set the element's `background-image` CSS property")
      .optional(),
    bg: z
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
      )
      .optional(),
    border: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-width` CSS property")
      .optional(),
    borderB: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-bottom-width` CSS property")
      .optional(),
    borderColor: z
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
      )
      .optional(),
    borderL: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-left-width` CSS property")
      .optional(),
    borderR: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-right-width` CSS property")
      .optional(),
    borderT: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-top-width` CSS property")
      .optional(),
    children: z.any().optional(),
    color: z
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
      )
      .optional(),
    cursor: z
      .union([z.literal("default"), z.literal("pointer"), z.literal("text")])
      .describe("Set the element's `cursor` CSS property")
      .optional(),
    display: z
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
      .describe("Set the element's `display` CSS property")
      .optional(),
    flex: z
      .union([
        z.literal("initial"),
        z.literal("none"),
        z.literal("auto"),
        z.literal("1"),
      ])
      .describe("Set the element's `flex` CSS property")
      .optional(),
    flexDirection: z
      .union([
        z.literal("column"),
        z.literal("column-reverse"),
        z.literal("row"),
        z.literal("row-reverse"),
      ])
      .describe("Set the element's `flex-direction` CSS property")
      .optional(),
    flexWrap: z
      .union([z.literal("nowrap"), z.literal("wrap")])
      .describe("Set the element's `flex-wrap` CSS property")
      .optional(),
    fontFamily: z
      .union([z.literal("mono"), z.literal("sans")])
      .describe(
        "Set the element's font family. Only accepts predefined fontFamily tokens.",
      )
      .optional(),
    fontSize: z
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
      )
      .optional(),
    fontWeight: z
      .union([
        z.literal("inherit"),
        z.literal("600"),
        z.literal("400"),
        z.literal("500"),
        z.literal("700"),
      ])
      .describe("Set the element's `font-weight` CSS property")
      .optional(),
    gap: z
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
      .describe("Set the element's `gap` CSS property")
      .optional(),
    gridColumn: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Set the element's size across grid columns")
      .optional(),
    gridTemplateColumns: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Control number of columns in a grid layout")
      .optional(),
    h: z
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
        'Set the element\'s height. Only accepts predefined values: size tokens\n(xs, sm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    justifyContent: z
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
      .describe("Set the element's `justify-content` CSS property")
      .optional(),
    justifyItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `justify-items` CSS property")
      .optional(),
    m: z
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
        'Set the element\'s margin on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    maxW: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum width. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    mb: z
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
        'Set the element\'s bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    ml: z
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
        'Set the element\'s left margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mr: z
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
        'Set the element\'s right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mt: z
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
        'Set the element\'s top margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mx: z
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
        'Set the element\'s left and right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    my: z
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
        'Set the element\'s top and bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    objectFit: z
      .union([
        z.literal("contain"),
        z.literal("fill"),
        z.literal("none"),
        z.literal("cover"),
      ])
      .describe("Set the element's `object-fit` CSS property")
      .optional(),
    overflow: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow` CSS property")
      .optional(),
    overflowX: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-x` CSS property")
      .optional(),
    overflowY: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-y` CSS property")
      .optional(),
    p: z
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
        'Set the element\'s padding on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pb: z
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
        'Set the element\'s bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pl: z
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
        'Set the element\'s left padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    placeItems: z
      .literal("center")
      .describe("Set the element's `place-items` CSS property")
      .optional(),
    pointerEvents: z
      .union([z.literal("none"), z.literal("auto")])
      .describe("Set the element's `pointer-events` CSS property")
      .optional(),
    pr: z
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
        'Set the element\'s right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pt: z
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
        'Set the element\'s top padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    px: z
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
        'Set the element\'s left and right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    py: z
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
        'Set the element\'s top and bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    rounded: z
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
      )
      .optional(),
    shadow: z
      .union([
        z.literal("none"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
      ])
      .describe(
        "Set the element's box shadow. Only accepts predefined boxShadow tokens.",
      )
      .optional(),
    size: z
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
        'Set the element\'s width and height. Only accepts predefined values: size\ntokens (xs, sm, md, etc.), numeric spacing values (16, 24, 32),\nfractional percentages (1/2, 1/3), or special keywords (auto, full, fit,\nmax, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately (e.g., prefer `size="24"` over `w="24" h="24"`).',
      )
      .optional(),
    textAlign: z
      .union([
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
        z.literal("justify"),
      ])
      .describe("Set the element's `text-align` CSS property")
      .optional(),
    textTransform: z
      .union([
        z.literal("none"),
        z.literal("capitalize"),
        z.literal("uppercase"),
      ])
      .describe("Set the element's `text-transform` CSS property")
      .optional(),
    transition: z
      .union([
        z.literal("opacity"),
        z.literal("transform"),
        z.literal("all"),
        z.literal("none"),
        z.literal("colors"),
      ])
      .describe("Control which CSS properties should transition")
      .optional(),
    w: z
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
        'Set the element\'s width. Only accepts predefined values: size tokens (xs,\nsm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    whiteSpace: z
      .literal("nowrap")
      .describe("Set the element's `white-space` CSS property")
      .optional(),
    z: z
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
      )
      .optional(),
  })
  .strict();

export type BlockSelectContent = Omit<
  z.infer<typeof BlockSelectContentSchema>,
  "children"
> & { children?: BlockNode };
export type BlockSelectContentProps = Omit<
  z.infer<typeof BlockSelectContentSchema>,
  "$id" | "$type" | "$visible"
>;

export const BlockSelectTriggerSchema = z
  .object({
    $id: z
      .string()
      .describe(
        "Unique identifier for targeting by actions (e.g., setVisibility)",
      )
      .optional(),
    $type: z.literal("Block.SelectTrigger"),
    $visible: z
      .boolean()
      .describe(
        "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
      )
      .optional(),
    alignItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-items` CSS property")
      .optional(),
    alignSelf: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-self` CSS property")
      .optional(),
    animation: z
      .union([z.literal("ping"), z.literal("pulse"), z.literal("spin")])
      .describe("Animate element with CSS animations")
      .optional(),
    backgroundImage: z
      .literal("gradient.opal")
      .describe("Set the element's `background-image` CSS property")
      .optional(),
    bg: z
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
      )
      .optional(),
    border: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-width` CSS property")
      .optional(),
    borderB: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-bottom-width` CSS property")
      .optional(),
    borderColor: z
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
      )
      .optional(),
    borderL: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-left-width` CSS property")
      .optional(),
    borderR: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-right-width` CSS property")
      .optional(),
    borderT: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-top-width` CSS property")
      .optional(),
    children: z.any().optional(),
    color: z
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
      )
      .optional(),
    cursor: z
      .union([z.literal("default"), z.literal("pointer"), z.literal("text")])
      .describe("Set the element's `cursor` CSS property")
      .optional(),
    display: z
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
      .describe("Set the element's `display` CSS property")
      .optional(),
    flex: z
      .union([
        z.literal("initial"),
        z.literal("none"),
        z.literal("auto"),
        z.literal("1"),
      ])
      .describe("Set the element's `flex` CSS property")
      .optional(),
    flexDirection: z
      .union([
        z.literal("column"),
        z.literal("column-reverse"),
        z.literal("row"),
        z.literal("row-reverse"),
      ])
      .describe("Set the element's `flex-direction` CSS property")
      .optional(),
    flexWrap: z
      .union([z.literal("nowrap"), z.literal("wrap")])
      .describe("Set the element's `flex-wrap` CSS property")
      .optional(),
    fontFamily: z
      .union([z.literal("mono"), z.literal("sans")])
      .describe(
        "Set the element's font family. Only accepts predefined fontFamily tokens.",
      )
      .optional(),
    fontSize: z
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
      )
      .optional(),
    fontWeight: z
      .union([
        z.literal("inherit"),
        z.literal("600"),
        z.literal("400"),
        z.literal("500"),
        z.literal("700"),
      ])
      .describe("Set the element's `font-weight` CSS property")
      .optional(),
    gap: z
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
      .describe("Set the element's `gap` CSS property")
      .optional(),
    gridColumn: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Set the element's size across grid columns")
      .optional(),
    gridTemplateColumns: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Control number of columns in a grid layout")
      .optional(),
    h: z
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
        'Set the element\'s height. Only accepts predefined values: size tokens\n(xs, sm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    justifyContent: z
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
      .describe("Set the element's `justify-content` CSS property")
      .optional(),
    justifyItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `justify-items` CSS property")
      .optional(),
    m: z
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
        'Set the element\'s margin on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    maxH: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum height. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    maxW: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum width. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    mb: z
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
        'Set the element\'s bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    ml: z
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
        'Set the element\'s left margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mr: z
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
        'Set the element\'s right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mt: z
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
        'Set the element\'s top margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mx: z
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
        'Set the element\'s left and right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    my: z
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
        'Set the element\'s top and bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    objectFit: z
      .union([
        z.literal("contain"),
        z.literal("fill"),
        z.literal("none"),
        z.literal("cover"),
      ])
      .describe("Set the element's `object-fit` CSS property")
      .optional(),
    overflow: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow` CSS property")
      .optional(),
    overflowX: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-x` CSS property")
      .optional(),
    overflowY: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-y` CSS property")
      .optional(),
    p: z
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
        'Set the element\'s padding on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pb: z
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
        'Set the element\'s bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pl: z
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
        'Set the element\'s left padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    placeItems: z
      .literal("center")
      .describe("Set the element's `place-items` CSS property")
      .optional(),
    pointerEvents: z
      .union([z.literal("none"), z.literal("auto")])
      .describe("Set the element's `pointer-events` CSS property")
      .optional(),
    pr: z
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
        'Set the element\'s right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pt: z
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
        'Set the element\'s top padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    px: z
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
        'Set the element\'s left and right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    py: z
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
        'Set the element\'s top and bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    rounded: z
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
      )
      .optional(),
    shadow: z
      .union([
        z.literal("none"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
      ])
      .describe(
        "Set the element's box shadow. Only accepts predefined boxShadow tokens.",
      )
      .optional(),
    textAlign: z
      .union([
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
        z.literal("justify"),
      ])
      .describe("Set the element's `text-align` CSS property")
      .optional(),
    textTransform: z
      .union([
        z.literal("none"),
        z.literal("capitalize"),
        z.literal("uppercase"),
      ])
      .describe("Set the element's `text-transform` CSS property")
      .optional(),
    transition: z
      .union([
        z.literal("opacity"),
        z.literal("transform"),
        z.literal("all"),
        z.literal("none"),
        z.literal("colors"),
      ])
      .describe("Control which CSS properties should transition")
      .optional(),
    w: z
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
        'Set the element\'s width. Only accepts predefined values: size tokens (xs,\nsm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    whiteSpace: z
      .literal("nowrap")
      .describe("Set the element's `white-space` CSS property")
      .optional(),
    z: z
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
      )
      .optional(),
  })
  .strict();

export type BlockSelectTrigger = Omit<
  z.infer<typeof BlockSelectTriggerSchema>,
  "children"
> & { children?: BlockNode };
export type BlockSelectTriggerProps = Omit<
  z.infer<typeof BlockSelectTriggerSchema>,
  "$id" | "$type" | "$visible"
>;

export const BlockSeparatorSchema = z
  .object({
    $id: z
      .string()
      .describe(
        "Unique identifier for targeting by actions (e.g., setVisibility)",
      )
      .optional(),
    $type: z.literal("Block.Separator"),
    $visible: z
      .boolean()
      .describe(
        "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
      )
      .optional(),
    alignItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-items` CSS property")
      .optional(),
    alignSelf: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-self` CSS property")
      .optional(),
    animation: z
      .union([z.literal("ping"), z.literal("pulse"), z.literal("spin")])
      .describe("Animate element with CSS animations")
      .optional(),
    backgroundImage: z
      .literal("gradient.opal")
      .describe("Set the element's `background-image` CSS property")
      .optional(),
    bg: z
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
      )
      .optional(),
    border: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-width` CSS property")
      .optional(),
    borderB: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-bottom-width` CSS property")
      .optional(),
    borderColor: z
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
      )
      .optional(),
    borderL: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-left-width` CSS property")
      .optional(),
    borderR: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-right-width` CSS property")
      .optional(),
    borderT: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-top-width` CSS property")
      .optional(),
    color: z
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
      )
      .optional(),
    cursor: z
      .union([z.literal("default"), z.literal("pointer"), z.literal("text")])
      .describe("Set the element's `cursor` CSS property")
      .optional(),
    display: z
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
      .describe("Set the element's `display` CSS property")
      .optional(),
    flex: z
      .union([
        z.literal("initial"),
        z.literal("none"),
        z.literal("auto"),
        z.literal("1"),
      ])
      .describe("Set the element's `flex` CSS property")
      .optional(),
    flexDirection: z
      .union([
        z.literal("column"),
        z.literal("column-reverse"),
        z.literal("row"),
        z.literal("row-reverse"),
      ])
      .describe("Set the element's `flex-direction` CSS property")
      .optional(),
    flexWrap: z
      .union([z.literal("nowrap"), z.literal("wrap")])
      .describe("Set the element's `flex-wrap` CSS property")
      .optional(),
    fontFamily: z
      .union([z.literal("mono"), z.literal("sans")])
      .describe(
        "Set the element's font family. Only accepts predefined fontFamily tokens.",
      )
      .optional(),
    fontSize: z
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
      )
      .optional(),
    fontWeight: z
      .union([
        z.literal("inherit"),
        z.literal("600"),
        z.literal("400"),
        z.literal("500"),
        z.literal("700"),
      ])
      .describe("Set the element's `font-weight` CSS property")
      .optional(),
    gap: z
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
      .describe("Set the element's `gap` CSS property")
      .optional(),
    gridColumn: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Set the element's size across grid columns")
      .optional(),
    gridTemplateColumns: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Control number of columns in a grid layout")
      .optional(),
    h: z
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
        'Set the element\'s height. Only accepts predefined values: size tokens\n(xs, sm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    justifyContent: z
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
      .describe("Set the element's `justify-content` CSS property")
      .optional(),
    justifyItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `justify-items` CSS property")
      .optional(),
    m: z
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
        'Set the element\'s margin on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    maxH: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum height. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    maxW: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum width. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    mb: z
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
        'Set the element\'s bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    ml: z
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
        'Set the element\'s left margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mr: z
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
        'Set the element\'s right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mt: z
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
        'Set the element\'s top margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mx: z
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
        'Set the element\'s left and right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    my: z
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
        'Set the element\'s top and bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    objectFit: z
      .union([
        z.literal("contain"),
        z.literal("fill"),
        z.literal("none"),
        z.literal("cover"),
      ])
      .describe("Set the element's `object-fit` CSS property")
      .optional(),
    overflow: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow` CSS property")
      .optional(),
    overflowX: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-x` CSS property")
      .optional(),
    overflowY: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-y` CSS property")
      .optional(),
    p: z
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
        'Set the element\'s padding on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pb: z
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
        'Set the element\'s bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pl: z
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
        'Set the element\'s left padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    placeItems: z
      .literal("center")
      .describe("Set the element's `place-items` CSS property")
      .optional(),
    pointerEvents: z
      .union([z.literal("none"), z.literal("auto")])
      .describe("Set the element's `pointer-events` CSS property")
      .optional(),
    pr: z
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
        'Set the element\'s right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pt: z
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
        'Set the element\'s top padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    px: z
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
        'Set the element\'s left and right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    py: z
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
        'Set the element\'s top and bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    rounded: z
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
      )
      .optional(),
    shadow: z
      .union([
        z.literal("none"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
      ])
      .describe(
        "Set the element's box shadow. Only accepts predefined boxShadow tokens.",
      )
      .optional(),
    size: z
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
        'Set the element\'s width and height. Only accepts predefined values: size\ntokens (xs, sm, md, etc.), numeric spacing values (16, 24, 32),\nfractional percentages (1/2, 1/3), or special keywords (auto, full, fit,\nmax, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately (e.g., prefer `size="24"` over `w="24" h="24"`).',
      )
      .optional(),
    textAlign: z
      .union([
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
        z.literal("justify"),
      ])
      .describe("Set the element's `text-align` CSS property")
      .optional(),
    textTransform: z
      .union([
        z.literal("none"),
        z.literal("capitalize"),
        z.literal("uppercase"),
      ])
      .describe("Set the element's `text-transform` CSS property")
      .optional(),
    transition: z
      .union([
        z.literal("opacity"),
        z.literal("transform"),
        z.literal("all"),
        z.literal("none"),
        z.literal("colors"),
      ])
      .describe("Control which CSS properties should transition")
      .optional(),
    w: z
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
        'Set the element\'s width. Only accepts predefined values: size tokens (xs,\nsm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    whiteSpace: z
      .literal("nowrap")
      .describe("Set the element's `white-space` CSS property")
      .optional(),
    z: z
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
      )
      .optional(),
  })
  .strict();

export type BlockSeparator = Omit<
  z.infer<typeof BlockSeparatorSchema>,
  "children"
> & { children?: BlockNode };
export type BlockSeparatorProps = Omit<
  z.infer<typeof BlockSeparatorSchema>,
  "$id" | "$type" | "$visible"
>;

export const BlockTextSchema = z
  .object({
    $id: z
      .string()
      .describe(
        "Unique identifier for targeting by actions (e.g., setVisibility)",
      )
      .optional(),
    $type: z.literal("Block.Text"),
    $visible: z
      .boolean()
      .describe(
        "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
      )
      .optional(),
    alignItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-items` CSS property")
      .optional(),
    alignSelf: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-self` CSS property")
      .optional(),
    animation: z
      .union([z.literal("ping"), z.literal("pulse"), z.literal("spin")])
      .describe("Animate element with CSS animations")
      .optional(),
    backgroundImage: z
      .literal("gradient.opal")
      .describe("Set the element's `background-image` CSS property")
      .optional(),
    bg: z
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
      )
      .optional(),
    border: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-width` CSS property")
      .optional(),
    borderB: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-bottom-width` CSS property")
      .optional(),
    borderColor: z
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
      )
      .optional(),
    borderL: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-left-width` CSS property")
      .optional(),
    borderR: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-right-width` CSS property")
      .optional(),
    borderT: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-top-width` CSS property")
      .optional(),
    children: z.any().optional(),
    color: z
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
      )
      .optional(),
    cursor: z
      .union([z.literal("default"), z.literal("pointer"), z.literal("text")])
      .describe("Set the element's `cursor` CSS property")
      .optional(),
    display: z
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
      .describe("Set the element's `display` CSS property")
      .optional(),
    flex: z
      .union([
        z.literal("initial"),
        z.literal("none"),
        z.literal("auto"),
        z.literal("1"),
      ])
      .describe("Set the element's `flex` CSS property")
      .optional(),
    flexDirection: z
      .union([
        z.literal("column"),
        z.literal("column-reverse"),
        z.literal("row"),
        z.literal("row-reverse"),
      ])
      .describe("Set the element's `flex-direction` CSS property")
      .optional(),
    flexWrap: z
      .union([z.literal("nowrap"), z.literal("wrap")])
      .describe("Set the element's `flex-wrap` CSS property")
      .optional(),
    fontFamily: z
      .union([z.literal("mono"), z.literal("sans")])
      .describe(
        "Set the element's font family. Only accepts predefined fontFamily tokens.",
      )
      .optional(),
    fontSize: z
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
      )
      .optional(),
    fontWeight: z
      .union([
        z.literal("inherit"),
        z.literal("600"),
        z.literal("400"),
        z.literal("500"),
        z.literal("700"),
      ])
      .describe("Set the element's `font-weight` CSS property")
      .optional(),
    gap: z
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
      .describe("Set the element's `gap` CSS property")
      .optional(),
    gridColumn: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Set the element's size across grid columns")
      .optional(),
    gridTemplateColumns: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Control number of columns in a grid layout")
      .optional(),
    h: z
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
        'Set the element\'s height. Only accepts predefined values: size tokens\n(xs, sm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    justifyContent: z
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
      .describe("Set the element's `justify-content` CSS property")
      .optional(),
    justifyItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `justify-items` CSS property")
      .optional(),
    m: z
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
        'Set the element\'s margin on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    maxH: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum height. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    maxW: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum width. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    mb: z
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
        'Set the element\'s bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    ml: z
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
        'Set the element\'s left margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mr: z
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
        'Set the element\'s right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mt: z
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
        'Set the element\'s top margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mx: z
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
        'Set the element\'s left and right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    my: z
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
        'Set the element\'s top and bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    objectFit: z
      .union([
        z.literal("contain"),
        z.literal("fill"),
        z.literal("none"),
        z.literal("cover"),
      ])
      .describe("Set the element's `object-fit` CSS property")
      .optional(),
    overflow: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow` CSS property")
      .optional(),
    overflowX: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-x` CSS property")
      .optional(),
    overflowY: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-y` CSS property")
      .optional(),
    p: z
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
        'Set the element\'s padding on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pb: z
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
        'Set the element\'s bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pl: z
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
        'Set the element\'s left padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    placeItems: z
      .literal("center")
      .describe("Set the element's `place-items` CSS property")
      .optional(),
    pointerEvents: z
      .union([z.literal("none"), z.literal("auto")])
      .describe("Set the element's `pointer-events` CSS property")
      .optional(),
    pr: z
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
        'Set the element\'s right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pt: z
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
        'Set the element\'s top padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    px: z
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
        'Set the element\'s left and right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    py: z
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
        'Set the element\'s top and bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    rounded: z
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
      )
      .optional(),
    shadow: z
      .union([
        z.literal("none"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
      ])
      .describe(
        "Set the element's box shadow. Only accepts predefined boxShadow tokens.",
      )
      .optional(),
    size: z
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
        'Set the element\'s width and height. Only accepts predefined values: size\ntokens (xs, sm, md, etc.), numeric spacing values (16, 24, 32),\nfractional percentages (1/2, 1/3), or special keywords (auto, full, fit,\nmax, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately (e.g., prefer `size="24"` over `w="24" h="24"`).',
      )
      .optional(),
    textAlign: z
      .union([
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
        z.literal("justify"),
      ])
      .describe("Set the element's `text-align` CSS property")
      .optional(),
    textTransform: z
      .union([
        z.literal("none"),
        z.literal("capitalize"),
        z.literal("uppercase"),
      ])
      .describe("Set the element's `text-transform` CSS property")
      .optional(),
    transition: z
      .union([
        z.literal("opacity"),
        z.literal("transform"),
        z.literal("all"),
        z.literal("none"),
        z.literal("colors"),
      ])
      .describe("Control which CSS properties should transition")
      .optional(),
    w: z
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
        'Set the element\'s width. Only accepts predefined values: size tokens (xs,\nsm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    whiteSpace: z
      .literal("nowrap")
      .describe("Set the element's `white-space` CSS property")
      .optional(),
    z: z
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
      )
      .optional(),
  })
  .strict();

export type BlockText = Omit<z.infer<typeof BlockTextSchema>, "children"> & {
  children?: BlockNode;
};
export type BlockTextProps = Omit<
  z.infer<typeof BlockTextSchema>,
  "$id" | "$type" | "$visible"
>;

export const BlockTextareaSchema = z
  .object({
    $id: z
      .string()
      .describe(
        "Unique identifier for targeting by actions (e.g., setVisibility)",
      )
      .optional(),
    $type: z.literal("Block.Textarea"),
    $visible: z
      .boolean()
      .describe(
        "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
      )
      .optional(),
    alignItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-items` CSS property")
      .optional(),
    alignSelf: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `align-self` CSS property")
      .optional(),
    animation: z
      .union([z.literal("ping"), z.literal("pulse"), z.literal("spin")])
      .describe("Animate element with CSS animations")
      .optional(),
    backgroundImage: z
      .literal("gradient.opal")
      .describe("Set the element's `background-image` CSS property")
      .optional(),
    bg: z
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
      )
      .optional(),
    border: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-width` CSS property")
      .optional(),
    borderB: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-bottom-width` CSS property")
      .optional(),
    borderColor: z
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
      )
      .optional(),
    borderL: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-left-width` CSS property")
      .optional(),
    borderR: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-right-width` CSS property")
      .optional(),
    borderT: z
      .union([z.literal("2"), z.literal("0"), z.literal("1")])
      .describe("Set the element's `border-top-width` CSS property")
      .optional(),
    color: z
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
      )
      .optional(),
    cursor: z
      .union([z.literal("default"), z.literal("pointer"), z.literal("text")])
      .describe("Set the element's `cursor` CSS property")
      .optional(),
    display: z
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
      .describe("Set the element's `display` CSS property")
      .optional(),
    flex: z
      .union([
        z.literal("initial"),
        z.literal("none"),
        z.literal("auto"),
        z.literal("1"),
      ])
      .describe("Set the element's `flex` CSS property")
      .optional(),
    flexDirection: z
      .union([
        z.literal("column"),
        z.literal("column-reverse"),
        z.literal("row"),
        z.literal("row-reverse"),
      ])
      .describe("Set the element's `flex-direction` CSS property")
      .optional(),
    flexWrap: z
      .union([z.literal("nowrap"), z.literal("wrap")])
      .describe("Set the element's `flex-wrap` CSS property")
      .optional(),
    fontFamily: z
      .union([z.literal("mono"), z.literal("sans")])
      .describe(
        "Set the element's font family. Only accepts predefined fontFamily tokens.",
      )
      .optional(),
    fontSize: z
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
      )
      .optional(),
    fontWeight: z
      .union([
        z.literal("inherit"),
        z.literal("600"),
        z.literal("400"),
        z.literal("500"),
        z.literal("700"),
      ])
      .describe("Set the element's `font-weight` CSS property")
      .optional(),
    gap: z
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
      .describe("Set the element's `gap` CSS property")
      .optional(),
    gridColumn: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Set the element's size across grid columns")
      .optional(),
    gridTemplateColumns: z
      .union([z.literal("2"), z.literal("4"), z.literal("1"), z.literal("3")])
      .describe("Control number of columns in a grid layout")
      .optional(),
    h: z
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
        'Set the element\'s height. Only accepts predefined values: size tokens\n(xs, sm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    justifyContent: z
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
      .describe("Set the element's `justify-content` CSS property")
      .optional(),
    justifyItems: z
      .union([
        z.literal("normal"),
        z.literal("stretch"),
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
      ])
      .describe("Set the element's `justify-items` CSS property")
      .optional(),
    m: z
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
        'Set the element\'s margin on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    maxH: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum height. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
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
    maxW: z
      .union([
        z.literal("xs"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
        z.literal("full"),
      ])
      .describe(
        'Set the element\'s maximum width. Only accepts predefined maxSize tokens.\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.',
      )
      .optional(),
    mb: z
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
        'Set the element\'s bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    ml: z
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
        'Set the element\'s left margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mr: z
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
        'Set the element\'s right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mt: z
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
        'Set the element\'s top margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    mx: z
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
        'Set the element\'s left and right margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    my: z
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
        'Set the element\'s top and bottom margin\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px", "5rem", or negative\nnumbers like "-8". Only predefined spacing tokens are accepted.',
      )
      .optional(),
    name: z
      .string()
      .describe("The name of the form control element.")
      .optional(),
    objectFit: z
      .union([
        z.literal("contain"),
        z.literal("fill"),
        z.literal("none"),
        z.literal("cover"),
      ])
      .describe("Set the element's `object-fit` CSS property")
      .optional(),
    onValueChange: z
      .union([
        z
          .object({
            tool: z.string().describe("Name of registered tool to call"),
          })
          .strict()
          .describe("Server-side tool call"),
        z
          .object({
            action: z
              .literal("setVisibility")
              .describe("Set visibility of target elements"),
            params: z
              .record(z.boolean())
              .describe(
                "Map of element IDs to visibility state (e.g., { 'step-2': true, 'step-1': false })",
              ),
            when: z
              .string()
              .describe(
                "Optional regex pattern - action only executes if value matches",
              )
              .optional(),
          })
          .strict()
          .describe("Client-side setVisibility action"),
      ])
      .describe(
        "Handler for user interactions - either a tool call or client-side action",
      )
      .optional(),
    overflow: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow` CSS property")
      .optional(),
    overflowX: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-x` CSS property")
      .optional(),
    overflowY: z
      .union([z.literal("auto"), z.literal("hidden"), z.literal("visible")])
      .describe("Set the element's `overflow-y` CSS property")
      .optional(),
    p: z
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
        'Set the element\'s padding on all sides\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pb: z
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
        'Set the element\'s bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pl: z
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
        'Set the element\'s left padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    placeholder: z
      .string()
      .describe("The placeholder text to use when control has no value.")
      .optional(),
    placeItems: z
      .literal("center")
      .describe("Set the element's `place-items` CSS property")
      .optional(),
    pointerEvents: z
      .union([z.literal("none"), z.literal("auto")])
      .describe("Set the element's `pointer-events` CSS property")
      .optional(),
    pr: z
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
        'Set the element\'s right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    pt: z
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
        'Set the element\'s top padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    px: z
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
        'Set the element\'s left and right padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    py: z
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
        'Set the element\'s top and bottom padding\n\n⚠️ WARNING: Do NOT use arbitrary values like "10px" or "5rem". Only\npredefined spacing tokens are accepted.',
      )
      .optional(),
    resize: z
      .union([z.literal("none"), z.literal("auto"), z.literal("vertical")])
      .describe(
        "Control whether resizing mode is manual, automatic, or disabled.",
      )
      .optional(),
    rounded: z
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
      )
      .optional(),
    rows: z.number().describe("The number of rows to display.").optional(),
    shadow: z
      .union([
        z.literal("none"),
        z.literal("sm"),
        z.literal("md"),
        z.literal("lg"),
      ])
      .describe(
        "Set the element's box shadow. Only accepts predefined boxShadow tokens.",
      )
      .optional(),
    textAlign: z
      .union([
        z.literal("center"),
        z.literal("end"),
        z.literal("start"),
        z.literal("justify"),
      ])
      .describe("Set the element's `text-align` CSS property")
      .optional(),
    textTransform: z
      .union([
        z.literal("none"),
        z.literal("capitalize"),
        z.literal("uppercase"),
      ])
      .describe("Set the element's `text-transform` CSS property")
      .optional(),
    transition: z
      .union([
        z.literal("opacity"),
        z.literal("transform"),
        z.literal("all"),
        z.literal("none"),
        z.literal("colors"),
      ])
      .describe("Control which CSS properties should transition")
      .optional(),
    w: z
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
        'Set the element\'s width. Only accepts predefined values: size tokens (xs,\nsm, md, etc.), numeric spacing values (16, 24, 32), fractional\npercentages (1/2, 1/3), or special keywords (auto, full, fit, max, min).\n\n⚠️ COMMON MISTAKE: Do not use arbitrary pixel values like "200" or "300".\nUse the closest valid token from the allowed values instead.\n\n💡 TIP: When width and height are the same, use `size` instead of setting\nboth `w` and `h` separately.',
      )
      .optional(),
    whiteSpace: z
      .literal("nowrap")
      .describe("Set the element's `white-space` CSS property")
      .optional(),
    z: z
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
      )
      .optional(),
  })
  .strict();

export type BlockTextarea = Omit<
  z.infer<typeof BlockTextareaSchema>,
  "children"
> & { children?: BlockNode };
export type BlockTextareaProps = Omit<
  z.infer<typeof BlockTextareaSchema>,
  "$id" | "$type" | "$visible"
>;

export const BlockElementSchema = z.discriminatedUnion("$type", [
  BlockActionSchema,
  BlockCancelActionSchema,
  BlockFieldSchema,
  BlockGroupSchema,
  BlockHeadingSchema,
  BlockInputSchema,
  BlockLinkSchema,
  BlockRangeSchema,
  BlockSelectSchema,
  BlockSelectContentSchema,
  BlockSelectTriggerSchema,
  BlockSeparatorSchema,
  BlockTextSchema,
  BlockTextareaSchema,
]);
type BlockElement =
  | BlockAction
  | BlockCancelAction
  | BlockField
  | BlockGroup
  | BlockHeading
  | BlockInput
  | BlockLink
  | BlockRange
  | BlockSelect
  | BlockSelectContent
  | BlockSelectTrigger
  | BlockSeparator
  | BlockText
  | BlockTextarea;
