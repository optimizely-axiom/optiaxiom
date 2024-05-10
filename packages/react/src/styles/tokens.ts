/* eslint perfectionist/sort-objects: [
  "error",
  {
    "custom-groups": {
      "none": "none",
      xs: ["xs", "tighter"],
      sm: ["sm", "tight"],
      md: ["md", "normal"],
      lg: ["lg", "wide"],
      xl: ["xl", "wider", "loose"],
      Xxl: ["*xl", "widest"],
    },
    groups: [
      "none",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "Xxl",
      "unknown",
    ],
    "partition-by-new-line": true,
    type: "natural",
  },
] */

type Rem<P extends string> = { __rem__: true } & P;
const rem = <P extends `${string}px`>(px: P) =>
  `${parseFloat((parseFloat(px.slice(0, -2)) / 16).toFixed(3))}rem` as Rem<P>;

export const tokens = {
  borderRadius: {
    xs: rem("2px"),
    sm: rem("4px"),
    md: rem("6px"),
    lg: rem("8px"),
    xl: rem("12px"),

    none: "0",
    full: "100%",
  },

  borderWidth: {
    "0": "0",
    "1": "1px",
    "2": "2px",
    "4": "4px",
  },

  boxShadow: {
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },

  colors: {
    current: "currentColor",
    transparent: "transparent",

    black: "#000",
    white: "#fff",

    "aqua.50": "#e5f7fb",
    "aqua.200": "#9ae5ef",
    "aqua.500": "#00bdd6",
    "aqua.600": "#007a8a",

    "blue.50": "#e7f3fe",
    "blue.200": "#a8d5fa",
    "blue.500": "#2094f3",
    "blue.600": "#1668ac",
    "blue.900": "#1c2b41",

    "brand.50": "#f0f3ff",
    "brand.200": "#b3c3ff",
    "brand.500": "#0037ff",
    "brand.600": "#002ccc",

    "dark.50": "#d9d9d9",
    "dark.200": "#9e9e9e",
    "dark.500": "#707070",
    "dark.600": "#080736",

    "gray.50": "#f9fafb",
    "gray.100": "#f3f4f6",
    "gray.200": "#e5e7eb",
    "gray.300": "#d1d5db",
    "gray.400": "#9ca3af",
    "gray.500": "#6b7280",
    "gray.600": "#4b5563",
    "gray.700": "#374151",
    "gray.800": "#1f2937",
    "gray.900": "#111827",

    "green.50": "#edf7ed",
    "green.200": "#b9dfbb",
    "green.500": "#4cae4f",
    "green.600": "#357937",
    "green.900": "#1c3329",

    "magenta.50": "#f8e7f5",
    "magenta.200": "#e39cd6",
    "magenta.500": "#b80597",
    "magenta.600": "#81046a",

    "orange.50": "#fff5e5",
    "orange.200": "#ffd699",
    "orange.500": "#ff9900",
    "orange.600": "#a36200",

    "purple.50": "#f1ecf8",
    "purple.200": "#c4b1e2",
    "purple.500": "#693ab6",
    "purple.600": "#4a297f",

    "red.50": "#feecec",
    "red.200": "#faadad",
    "red.500": "#f33030",
    "red.600": "#c02626",

    "slate.50": "#f8fafc",
    "slate.100": "#f1f5f9",
    "slate.200": "#e2e8f0",
    "slate.300": "#cbd5e1",
    "slate.400": "#94a3b8",
    "slate.500": "#64748b",
    "slate.600": "#475569",
    "slate.700": "#334155",
    "slate.800": "#1e293b",
    "slate.900": "#0f172a",
    "slate.950": "#020617",

    "yellow.50": "#fff9e5",
    "yellow.200": "#ffe699",
    "yellow.500": "#ffc105",
    "yellow.600": "#d7a204",
  },

  fontFamily: {
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
    sans: "InterVariable, system-ui, sans-serif",
  },

  fontSize: {
    xs: {
      fontSize: rem("11px"),
      lineHeight: "1.25",
    },
    sm: {
      fontSize: rem("12px"),
      lineHeight: "1.45",
    },
    md: {
      fontSize: rem("14px"),
      lineHeight: "1.5",
    },
    lg: {
      fontSize: rem("16px"),
      lineHeight: "1.6",
    },
    xl: {
      fontSize: rem("18px"),
      lineHeight: "1.65",
    },
    "2xl": {
      fontSize: rem("20px"),
      lineHeight: "1.6",
    },
    "3xl": {
      fontSize: rem("23px"),
      lineHeight: "1.74",
    },
    "4xl": {
      fontSize: rem("36px"),
      lineHeight: rem("40px"),
    },
    "5xl": {
      fontSize: rem("48px"),
      lineHeight: "1",
    },
    "6xl": {
      fontSize: rem("60px"),
      lineHeight: "1",
    },
  },

  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },

  lineHeight: {
    none: "1",
    tight: "1.25",
    normal: "1.5",
    loose: "2",
  },

  maxSize: {
    xs: rem("320px"),
    sm: rem("384px"),
    md: rem("448px"),
    lg: rem("512px"),
    xl: rem("576px"),
    "2xl": rem("672px"),
  },

  screens: {
    sm: rem("640px"),
    xl: rem("1280px"),
  },

  size: {
    "0": "0",
    "2": rem("2px"),
    "4": rem("4px"),
    "6": rem("6px"),
    "8": rem("8px"),
    "12": rem("12px"),
    "16": rem("16px"),
    "24": rem("24px"),
    "32": rem("32px"),
    "40": rem("40px"),
    "48": rem("48px"),
    "56": rem("56px"),
    "64": rem("64px"),
    "80": rem("80px"),
    "96": rem("96px"),
    "112": rem("112px"),
    "128": rem("128px"),
    "144": rem("144px"),
    "160": rem("160px"),
    "176": rem("176px"),
    "192": rem("192px"),
    "208": rem("208px"),
    "224": rem("224px"),
    "240": rem("240px"),
    "256": rem("256px"),
    "288": rem("288px"),
    "320": rem("320px"),
    "384": rem("384px"),

    "1/2": "50%",

    "1/3": "33.333333%",
    "2/3": "66.666666%",

    "1/4": "25%",
    "2/4": "50%",
    "3/4": "75%",

    auto: "auto",
    fit: "fit-content",
    full: "100%",
    max: "max-content",
    min: "min-content",
  },

  spacing: {
    xs: rem("8px"),
    sm: rem("12px"),
    md: rem("16px"),
    lg: rem("24px"),
    xl: rem("32px"),

    "0": "0",
    "2": rem("2px"),
    "4": rem("4px"),
    "6": rem("6px"),
    "8": rem("8px"),
    "10": rem("10px"),
    "12": rem("12px"),
    "16": rem("16px"),
    "24": rem("24px"),
    "32": rem("32px"),
    "48": rem("48px"),
    "64": rem("64px"),
    "80": rem("80px"),
  },

  zIndex: {
    "0": "0",
  },
} as const;

export const tokensLight = {
  ...tokens,
  colors: {
    ...tokens.colors,

    "bg.information": tokens.colors["blue.50"],
    "bg.neutral": tokens.colors["slate.100"],
    "bg.success": tokens.colors["green.50"],
    border: tokens.colors["gray.200"],
    surface: tokens.colors["white"],
    text: tokens.colors["dark.600"],
    "text.accent.magenta": tokens.colors["magenta.600"],
    "text.subtle": tokens.colors["slate.600"],
    "text.success": tokens.colors["green.600"],
  },
};

export const tokensDark = {
  ...tokens,
  colors: {
    ...tokens.colors,

    "bg.information": tokens.colors["blue.900"],
    "bg.neutral": tokens.colors["slate.800"],
    "bg.success": tokens.colors["green.900"],
    border: tokens.colors["gray.800"],
    surface: tokens.colors["gray.900"],
    text: tokens.colors["gray.100"],
    "text.accent.magenta": tokens.colors["magenta.200"],
    "text.subtle": tokens.colors["slate.400"],
    "text.success": tokens.colors["green.200"],
  },
};
