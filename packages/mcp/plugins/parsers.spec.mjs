import { getDocs } from "@optiaxiom/shared";
import { describe, expect, it } from "vitest";

import { parsePropDefinition, parseTypeSchema } from "./parsers.mjs";

const docs = getDocs();

/**
 * @param {string} displayName
 * @param {string} propName
 */
function getProp(displayName, propName) {
  const component = docs.find((d) => d.displayName === displayName);
  if (!component) throw new Error(`Component not found: ${displayName}`);
  const prop = component.props.find((p) => p.name === propName);
  if (!prop) throw new Error(`Prop not found: ${propName}`);
  return prop;
}

describe("parsePropDefinition", () => {
  it("should describe literal unions as enum", () => {
    const result = parsePropDefinition(
      getProp("@optiaxiom/react/Button", "size"),
    );

    expect(result.type).toBeUndefined();
    expect(result.enum).toContain("sm");
    expect(result.enum).toContain("md");
    expect(result.enum).toContain("lg");
  });

  it("should describe Select options by their SelectOption fields", () => {
    const result = parsePropDefinition(
      getProp("@optiaxiom/react/Select", "options"),
    );

    expect(result).toMatchObject({
      items: {
        required: ["label", "value"],
        title: "SelectOption",
        type: "object",
      },
      type: "array",
    });
    expect(result.tsType).toBeUndefined();
    expect(result.items?.properties?.value).toMatchObject({ type: "string" });
    expect(result.items?.properties?.disabledReason).toEqual({
      description: expect.stringContaining("disabled"),
      tsType: "string | (() => string)",
    });
  });

  it("should keep the full type of optional callback fields", () => {
    const { items } = parsePropDefinition(
      getProp("@optiaxiom/react/Menu", "options"),
    );

    expect(items?.properties?.execute?.tsType).toBe(
      "((context: { dismiss: boolean; inputValue: string | undefined; }) => void)",
    );
  });

  it("should describe inline object types by their fields", () => {
    expect(
      parsePropDefinition(getProp("@optiaxiom/react/Breadcrumb", "items")),
    ).toMatchObject({
      items: {
        properties: {
          href: { description: expect.any(String), type: "string" },
        },
        required: ["label"],
        type: "object",
      },
      type: "array",
    });
  });

  it("should describe Menu options by their CommandOption fields", () => {
    const { items } = parsePropDefinition(
      getProp("@optiaxiom/react/Menu", "options"),
    );

    expect(items?.title).toBe("CommandOption");
    expect(items?.properties?.intent?.enum).toEqual(["danger", "neutral"]);
    expect(items?.properties?.key?.description).toContain("unique");
  });

  it("should describe arrays mixing primitives and objects as anyOf items", () => {
    const result = parsePropDefinition(
      getProp("@optiaxiom/react/Range", "marks"),
    );

    expect(result).toMatchObject({
      items: {
        anyOf: [
          { type: "number" },
          {
            properties: {
              label: { description: expect.any(String), type: "string" },
              value: { type: "number" },
            },
            required: ["label", "value"],
            type: "object",
          },
        ],
      },
      type: "array",
    });
    expect(result.tsType).toBeUndefined();
  });

  it("should describe nullable objects as anyOf null and the object", () => {
    const result = parsePropDefinition(
      getProp("@optiaxiom/react/DateRangePicker", "value"),
    );

    expect(result).toMatchObject({
      anyOf: [
        { type: "null" },
        { required: ["from", "to"], title: "DateRange", type: "object" },
      ],
    });
    expect(result.tsType).toBeUndefined();
  });

  it("should describe primitive arrays with items", () => {
    expect(
      parsePropDefinition(getProp("@optiaxiom/react/FileUpload", "accept")),
    ).toMatchObject({ items: { type: "string" }, type: "array" });
  });

  it("should include boolean literals in mixed literal unions", () => {
    const result = parsePropDefinition(
      getProp("@optiaxiom/react/Menu", "loading"),
    );

    expect(result.enum).toEqual(
      expect.arrayContaining([false, true, "spinner", "skeleton"]),
    );
  });

  it("should list primitive unions as types, not enum values", () => {
    expect(
      parsePropDefinition(getProp("@optiaxiom/react/Calendar", "step")),
    ).toMatchObject({ type: ["string", "number"] });
  });

  it("should describe nullable primitives with a null type", () => {
    expect(
      parsePropDefinition(getProp("@optiaxiom/react/Progress", "value")).type,
    ).toEqual(expect.arrayContaining(["null", "number"]));
  });

  it("should keep the values of a literal union that also takes an array of them", () => {
    const { anyOf } = parsePropDefinition(
      getProp("@optiaxiom/react/Kbd", "modifiers"),
    );

    expect(anyOf?.[0]?.enum).toContain("shift");
    expect(anyOf?.[1]).toMatchObject({
      items: { enum: expect.arrayContaining(["shift"]) },
      type: "array",
    });
  });

  it("should keep suggested values of open string unions", () => {
    const { anyOf } = parsePropDefinition(
      getProp("@optiaxiom/react/Input", "type"),
    );

    expect(anyOf?.[0]?.enum).toContain("email");
    expect(anyOf?.[1]).toEqual({ type: "string" });
  });

  it("should keep the TypeScript type of functions and nodes", () => {
    expect(
      parsePropDefinition(getProp("@optiaxiom/react/Alert", "onDismiss")),
    ).toMatchObject({ tsType: "(() => void)" });
    expect(
      parsePropDefinition(getProp("@optiaxiom/react/Button", "addonAfter")),
    ).toMatchObject({ tsType: "ReactNode" });
  });

  it("should use JSON types for primitives", () => {
    const result = parsePropDefinition(
      getProp("@optiaxiom/react/Button", "disabled"),
    );

    expect(result.type).toBe("boolean");
    expect(result.enum).toBeUndefined();
  });

  it("should include default value when present", () => {
    const result = parsePropDefinition(
      getProp("@optiaxiom/react/Alert", "intent"),
    );

    expect(result.enum).toContain("neutral");
    expect(result.default).toBe("neutral");
  });

  it("should list the values of responsive style props", () => {
    const result = parsePropDefinition(getProp("@optiaxiom/react/Box", "p"));

    expect(result.enum).toContain("16");
    expect(result.tsType).toBeUndefined();
  });

  it("should keep falsy values of responsive style props", () => {
    const prop = {
      defaultValue: null,
      description: "",
      name: "z",
      required: false,
      type: {
        name: 'ConditionalStyleWithResponsiveArray<0 | false | "auto">',
        value: [{ value: "0" }, { value: "false" }, { value: '"auto"' }],
      },
    };

    expect(parsePropDefinition(prop)).toMatchObject({
      enum: [0, false, "auto"],
      responsive: true,
    });
  });

  it("should narrow a prop intersected with literals to those literals", () => {
    const result = parsePropDefinition(
      getProp("@optiaxiom/react/MenuContent", "maxH"),
    );

    expect(result.enum).toEqual(["xs", "sm", "md", "lg", "full"]);
    expect(result.tsType).toBeUndefined();
    expect(
      parsePropDefinition(getProp("@optiaxiom/react/MenuContent", "minW")).enum,
    ).toEqual(["0", "trigger"]);
  });

  it("should not split union members inside string literals", () => {
    expect(parseTypeSchema({ name: '("a|b" | "c\\"|(")[]' })).toEqual({
      items: { enum: ["a|b", 'c"|('] },
      type: "array",
    });
  });

  it("should mark responsive style props", () => {
    expect(
      parsePropDefinition(getProp("@optiaxiom/react/Box", "p")).responsive,
    ).toBe(true);
    expect(
      parsePropDefinition(getProp("@optiaxiom/react/Box", "gap")).responsive,
    ).toBe(true);
    expect(
      parsePropDefinition(getProp("@optiaxiom/react/Box", "bg")).responsive,
    ).toBeUndefined();
  });
});
