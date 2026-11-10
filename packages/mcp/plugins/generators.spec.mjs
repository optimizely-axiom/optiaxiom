import { getDocs } from "@optiaxiom/shared";
import { describe, expect, it } from "vitest";

const docs = getDocs();

/**
 * @param {string} displayName
 * @param {string} propName
 */
function getOptionsPropRaw(displayName, propName) {
  const component = docs.find((d) => d.displayName === displayName);
  if (!component) throw new Error(`Component not found: ${displayName}`);
  const prop = component.props.find((p) => p.name === propName);
  if (!prop?.type.raw) throw new Error(`Prop not found: ${propName}`);
  return prop.type.raw;
}

describe("docs.json type expansions", () => {
  it("should expand SelectOption in Select options prop", () => {
    const raw = getOptionsPropRaw("@optiaxiom/react/Select", "options");

    expect(raw).not.toContain("SelectOption");
    expect(raw).toContain("label: string");
    expect(raw).toContain("value: string");
  });

  it("should expand SelectOptionGroup inside Select options prop", () => {
    const raw = getOptionsPropRaw("@optiaxiom/react/Select", "options");

    expect(raw).not.toContain("SelectOptionGroup");
    expect(raw).toContain("hidden?: boolean");
    expect(raw).toContain("priority?: number");
    expect(raw).toContain("separator?: boolean");
  });

  it("should expand CommandOption in Menu options prop", () => {
    const raw = getOptionsPropRaw("@optiaxiom/react/Menu", "options");

    expect(raw).toContain("label:");
    expect(raw).toContain("execute?:");
    expect(raw).toContain('intent?: "danger" | "neutral"');
  });

  it("should expand CommandOptionGroup inside Menu options prop", () => {
    const raw = getOptionsPropRaw("@optiaxiom/react/Menu", "options");

    expect(raw).not.toContain("CommandOptionGroup");
  });

  it("should not include internal fields in CommandOption expansion", () => {
    const raw = getOptionsPropRaw("@optiaxiom/react/Menu", "options");

    expect(raw).not.toContain("parentOption");
    expect(raw).not.toContain("hiddenInSearchContext");
    expect(raw).not.toContain("surface");
  });

  it("should quote expanded field names that aren't identifiers", () => {
    const raw = getOptionsPropRaw("@optiaxiom/react/Select", "options");

    expect(raw).toContain('"aria-label"?: string');
  });
});

/**
 * Fields of the object type an array prop holds.
 *
 * @param {string} displayName
 * @param {string} propName
 */
function getItemFields(displayName, propName) {
  const shape = getShape(displayName, propName);
  if (!shape || !("items" in shape) || !("fields" in shape.items)) {
    throw new Error(`Not an array of objects: ${propName}`);
  }
  return shape.items.fields;
}

/**
 * @param {string} displayName
 * @param {string} propName
 */
function getShape(displayName, propName) {
  const component = docs.find((d) => d.displayName === displayName);
  if (!component) throw new Error(`Component not found: ${displayName}`);
  const prop = component.props.find((p) => p.name === propName);
  if (!prop) throw new Error(`Prop not found: ${propName}`);
  return prop.shape;
}

describe("docs.json prop shapes", () => {
  it("should document SelectOption fields on Select options", () => {
    expect(getShape("@optiaxiom/react/Select", "options")).toMatchObject({
      items: { name: "SelectOption" },
    });

    const fields = getItemFields("@optiaxiom/react/Select", "options");
    expect(Object.keys(fields)).toEqual([
      "addon",
      "aria-label",
      "description",
      "detail",
      "disabledReason",
      "group",
      "label",
      "value",
    ]);
    expect(fields.label).toMatchObject({
      required: true,
      type: { name: "string" },
    });
    expect(fields.addon?.type.raw).toBe("ReactNode");
  });

  it("should spell out nested documented types", () => {
    expect(
      getItemFields("@optiaxiom/react/Select", "options").group?.type.raw,
    ).toContain("separator?: boolean");
  });

  it("should document CommandOption fields on Menu options", () => {
    const fields = getItemFields("@optiaxiom/react/Menu", "options");

    expect(fields.key?.description).toContain("unique");
    expect(fields.intent?.type.value).toEqual([
      { value: '"danger"' },
      { value: '"neutral"' },
    ]);
    expect(fields.label?.required).toBe(true);
  });

  it("should not include internal fields in CommandOption fields", () => {
    const fields = getItemFields("@optiaxiom/react/Menu", "options");

    expect(fields).not.toHaveProperty("parentOption");
    expect(fields).not.toHaveProperty("hiddenInSearchContext");
    expect(fields).not.toHaveProperty("surface");
  });

  it("should document fields of inline object types without a name", () => {
    const shape = getShape("@optiaxiom/react/Breadcrumb", "items");

    expect(shape).not.toHaveProperty("items.name");
    expect(
      getItemFields("@optiaxiom/react/Breadcrumb", "items").label,
    ).toMatchObject({ required: true });
  });

  it("should describe object props that also accept primitives or null", () => {
    expect(getShape("@optiaxiom/react/DateRangePicker", "value")).toEqual({
      anyOf: [{ type: "null" }, expect.objectContaining({ name: "DateRange" })],
    });
    expect(getShape("@optiaxiom/react/Range", "marks")).toEqual({
      items: {
        anyOf: [{ type: "number" }, { fields: expect.any(Object) }],
      },
    });
  });

  it("should describe generic props by their constraint, records included", () => {
    const item = { fields: expect.objectContaining({ id: expect.anything() }) };
    const list = expect.arrayContaining([
      { items: { type: "string" } },
      { items: item },
    ]);

    // TypeScript doesn't keep union members in a stable order.
    expect(getShape("@optiaxiom/react/Sortable", "items")).toEqual({
      anyOf: expect.arrayContaining([
        { items: { type: "string" } },
        { items: item },
        { values: { anyOf: list } },
      ]),
    });
  });

  it("should skip functions, nodes, primitives and sprinkles", () => {
    expect(
      getShape("@optiaxiom/react/FileUploadList", "onRemove"),
    ).toBeUndefined();
    expect(getShape("@optiaxiom/react/Button", "addonAfter")).toBeUndefined();
    expect(getShape("@optiaxiom/react/Button", "size")).toBeUndefined();
    expect(getShape("@optiaxiom/react/Box", "p")).toBeUndefined();
  });
});
