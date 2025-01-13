import { describe, expect, it } from "vitest";

import { tokens } from "./tokens";

describe("tokens", () => {
  it("should contain correct tokens keys", () => {
    expect({
      count: Object.keys(tokens).length,
      keys: Object.keys(tokens),
    }).toEqual({
      count: 9,
      keys: [
        "borderRadius",
        "boxShadow",
        "colors",
        "fontFamily",
        "fontSize",
        "maxSize",
        "screens",
        "size",
        "zIndex",
      ],
    });
  });

  it("should contain borderRadius keys", () => {
    expect({
      count: Object.keys(tokens.borderRadius).length,
      keys: Object.keys(tokens.borderRadius),
    }).toEqual({
      count: 5,
      keys: ["xs", "sm", "md", "lg", "full"],
    });
  });

  it("should contain boxShadow keys", () => {
    expect({
      count: Object.keys(tokens.boxShadow).length,
      keys: Object.keys(tokens.boxShadow),
    }).toEqual({
      count: 3,
      keys: ["sm", "md", "lg"],
    });
  });

  it("should contain colors keys", () => {
    expect({
      count: Object.keys(tokens.colors).length,
      keys: Object.keys(tokens.colors),
    }).toEqual({
      count: 84,
      keys: [
        "bg.accent",
        "bg.accent.hovered",
        "bg.accent.light",
        "bg.accent.pressed",
        "bg.accent.subtle",
        "bg.avatar.neutral",
        "bg.avatar.purple",
        "bg.default",
        "bg.default.hovered",
        "bg.default.inverse",
        "bg.default.inverse.hovered",
        "bg.default.inverse.pressed",
        "bg.default.pressed",
        "bg.error",
        "bg.error.hovered",
        "bg.error.light",
        "bg.error.pressed",
        "bg.error.subtle",
        "bg.error.subtlest",
        "bg.information",
        "bg.information.light",
        "bg.information.subtle",
        "bg.overlay",
        "bg.page",
        "bg.secondary",
        "bg.secondary.hovered",
        "bg.spinner.default",
        "bg.spinner.inverse",
        "bg.success",
        "bg.success.hovered",
        "bg.success.light",
        "bg.success.subtle",
        "bg.tertiary",
        "bg.tertiary.hovered",
        "bg.warning",
        "bg.warning.hovered",
        "bg.warning.light",
        "bg.warning.subtle",
        "border.accent",
        "border.control",
        "border.control.hovered",
        "border.default",
        "border.disabled",
        "border.error",
        "border.focus",
        "border.focus.error",
        "border.secondary",
        "border.success",
        "border.tertiary",
        "border.warning",
        "fg.accent",
        "fg.accent.hovered",
        "fg.accent.strong",
        "fg.avatar.neutral",
        "fg.avatar.purple",
        "fg.default",
        "fg.default.inverse",
        "fg.disabled",
        "fg.error",
        "fg.error.hovered",
        "fg.error.light",
        "fg.error.strong",
        "fg.information",
        "fg.information.light",
        "fg.information.strong",
        "fg.link.default",
        "fg.link.default.hovered",
        "fg.link.inverse",
        "fg.link.subtle",
        "fg.link.visited",
        "fg.secondary",
        "fg.spinner.default",
        "fg.spinner.inverse",
        "fg.success",
        "fg.success.hovered",
        "fg.success.light",
        "fg.success.strong",
        "fg.tertiary",
        "fg.warning",
        "fg.warning.hovered",
        "fg.warning.inverse",
        "fg.warning.light",
        "fg.warning.strong",
        "fg.white",
      ],
    });
  });

  it("should contain fontFamily keys", () => {
    expect({
      count: Object.keys(tokens.fontFamily).length,
      keys: Object.keys(tokens.fontFamily),
    }).toEqual({
      count: 2,
      keys: ["mono", "sans"],
    });
  });

  it("should contain fontSize keys", () => {
    expect({
      count: Object.keys(tokens.fontSize).length,
      keys: Object.keys(tokens.fontSize),
    }).toEqual({
      count: 9,
      keys: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"],
    });
  });

  it("should contain maxSize keys", () => {
    expect({
      count: Object.keys(tokens.maxSize).length,
      keys: Object.keys(tokens.maxSize),
    }).toEqual({
      count: 4,
      keys: ["xs", "sm", "md", "lg"],
    });
  });

  it("should contain screens keys", () => {
    expect({
      count: Object.keys(tokens.screens).length,
      keys: Object.keys(tokens.screens),
    }).toEqual({
      count: 2,
      keys: ["sm", "md"],
    });
  });

  it("should contain size keys", () => {
    expect({
      count: Object.keys(tokens.size).length,
      keys: Object.keys(tokens.size),
    }).toEqual({
      count: 7,
      keys: ["2xs", "xs", "sm", "md", "lg", "xl", "3xl"],
    });
  });

  it("should contain zIndex keys", () => {
    expect({
      count: Object.keys(tokens.zIndex).length,
      keys: Object.keys(tokens.zIndex),
    }).toEqual({
      count: 3,
      keys: ["popover", "toast", "tooltip"],
    });
  });
});
