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
  it("should show types marked @docs opaque by name", () => {
    const dialog = getShape("@optiaxiom/react/AxiomProvider", "dialog");

    expect(dialog).toMatchObject({
      fields: { kit: { type: { raw: "DialogKit" } } },
    });
    expect(dialog).not.toHaveProperty("fields.kit.shape");
    expect(
      getShape("@optiaxiom/react/AxiomProvider", "locale"),
    ).toBeUndefined();
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
