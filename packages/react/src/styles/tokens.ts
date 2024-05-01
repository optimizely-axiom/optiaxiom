export const tokens = {
  borderWidth: {
    "0": "0",
    "1": "1px",
    "2": "2px",
    "4": "4px",
  },

  breakpoint: {
    sm: "640px",
    xl: "1280px",
  },

  color: {
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

    "gray.50": "#ffffff",
    "gray.200": "#fafafa",
    "gray.500": "#f5f5f5",
    "gray.600": "#ededed",

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

  fontSize: {
    xs: {
      fontSize: "11px",
      lineHeight: "1.25",
    },
    sm: {
      fontSize: "12px",
      lineHeight: "1.45",
    },
    md: {
      fontSize: "14px",
      lineHeight: "1.5",
    },
    lg: {
      fontSize: "16px",
      lineHeight: "1.6",
    },
    xl: {
      fontSize: "18px",
      lineHeight: "1.65",
    },
    "2xl": {
      fontSize: "20px",
      lineHeight: "1.6",
    },
    "3xl": {
      fontSize: "23px",
      lineHeight: "1.74",
    },
    "4xl": {
      fontSize: "26px",
      lineHeight: "1.69",
    },
    "5xl": {
      fontSize: "29px",
      lineHeight: "1.66",
    },
  },

  lineHeight: {
    // FIXME:
  },

  maxWidth: {
    xs: "320px",
    sm: "384px",
    md: "448px",
    lg: "512px",
    xl: "576px",
    "2xl": "672px",
  },

  radius: {
    xs: "2px",
    sm: "4px",
    md: "8px",
    lg: "16px",
    xl: "32px",

    full: "100%",
  },

  shadow: {
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },

  size: {
    "0": "0",
    "2": "2px",
    "4": "4px",
    "6": "6px",
    "8": "8px",
    "12": "12px",
    "16": "16px",
    "24": "24px",
    "32": "32px",
    "40": "40px",
    "48": "48px",
    "56": "56px",
    "64": "64px",
    "80": "80px",
    "96": "96px",
    "112": "112px",
    "128": "128px",
    "144": "144px",
    "160": "160px",
    "176": "176px",
    "192": "192px",
    "208": "208px",
    "224": "224px",
    "240": "240px",
    "256": "256px",
    "288": "288px",
    "320": "320px",
    "384": "384px",

    auto: "auto",
    "1/2": "50%",
    "1/3": "33.333333%",
    "2/3": "66.666666%",
    "1/4": "25%",
    "2/4": "50%",
    "3/4": "75%",
    full: "100%",
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
  },

  space: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",

    "0": "0",
    "2": "2px",
    "4": "4px",
    "6": "6px",
    "8": "8px",
    "12": "12px",
    "16": "16px",
    "24": "24px",
    "32": "32px",
    "48": "48px",
    "64": "64px",
    "80": "80px",
  },
} as const;

export const tokensLight = {
  ...tokens,
  color: {
    ...tokens.color,

    "bg.information": tokens.color["blue.50"],
    "bg.neutral": tokens.color["slate.100"],
    "bg.success": tokens.color["green.50"],
    border: tokens.color["slate.200"],
    surface: tokens.color["white"],
    "text.success": tokens.color["green.600"],
  },
};

export const tokensDark = {
  ...tokens,
  color: {
    ...tokens.color,

    "bg.information": tokens.color["blue.900"],
    "bg.neutral": tokens.color["slate.800"],
    "bg.success": tokens.color["green.900"],
    border: tokens.color["slate.700"],
    surface: tokens.color["slate.800"],
    "text.success": tokens.color["green.200"],
  },
};
