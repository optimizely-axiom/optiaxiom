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
});

/**
 * @param {string} displayName
 * @param {string} propName
 */
function getProperties(displayName, propName) {
  const component = docs.find((d) => d.displayName === displayName);
  if (!component) throw new Error(`Component not found: ${displayName}`);
  const prop = component.props.find((p) => p.name === propName);
  if (!prop) throw new Error(`Prop not found: ${propName}`);
  return prop.properties;
}

describe("docs.json prop properties", () => {
  it("should document SelectOption fields on Select options", () => {
    const properties = getProperties("@optiaxiom/react/Select", "options");

    expect(properties).toMatchObject({ array: true, name: "SelectOption" });
    expect(Object.keys(properties?.fields ?? {})).toEqual([
      "addon",
      "aria-label",
      "description",
      "detail",
      "disabledReason",
      "group",
      "label",
      "value",
    ]);
    expect(properties?.fields.label).toMatchObject({
      required: true,
      type: { name: "string" },
    });
    expect(properties?.fields.addon?.type.raw).toBe("ReactNode");
  });

  it("should spell out nested documented types", () => {
    expect(
      getProperties("@optiaxiom/react/Select", "options")?.fields.group?.type
        .raw,
    ).toContain("separator?: boolean");
  });

  it("should document CommandOption fields on Menu options", () => {
    const fields = getProperties("@optiaxiom/react/Menu", "options")?.fields;

    expect(fields?.key?.description).toContain("unique");
    expect(fields?.intent?.type.value).toEqual([
      { value: '"danger"' },
      { value: '"neutral"' },
    ]);
    expect(fields?.label?.required).toBe(true);
  });

  it("should not include internal fields in CommandOption fields", () => {
    const fields = getProperties("@optiaxiom/react/Menu", "options")?.fields;

    expect(fields).not.toHaveProperty("parentOption");
    expect(fields).not.toHaveProperty("hiddenInSearchContext");
    expect(fields).not.toHaveProperty("surface");
  });

  it("should document fields of inline object types without a name", () => {
    const properties = getProperties("@optiaxiom/react/Breadcrumb", "items");

    expect(properties?.name).toBeUndefined();
    expect(properties?.fields.label).toMatchObject({ required: true });
  });

  it("should skip functions, nodes, nullable objects and sprinkles", () => {
    expect(
      getProperties("@optiaxiom/react/FileUploadList", "onRemove"),
    ).toBeUndefined();
    expect(
      getProperties("@optiaxiom/react/Button", "addonAfter"),
    ).toBeUndefined();
    expect(
      getProperties("@optiaxiom/react/DateRangePicker", "value"),
    ).toBeUndefined();
    expect(getProperties("@optiaxiom/react/Box", "p")).toBeUndefined();
  });
});
