export const tokens = {
  breakpoint: {
    sm: "640px",
    xl: "1280px",
  },

  color: {
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

    "yellow.50": "#fff9e5",
    "yellow.200": "#ffe699",
    "yellow.500": "#ffc105",
    "yellow.600": "#d7a204",
  },

  fontSize: {
    xs: "11px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px",
  },

  heading: {
    fontSize: {
      h6: "14px",
      h5: "18px",
      h4: "20px",
      h3: "23px",
      h2: "26px",
      h1: "29px",
    },

    lineHeight: {
      h6: "1.71",
      h5: "1.78",
      h4: "1.6",
      h3: "1.74",
      h2: "1.69",
      h1: "1.66",
    },
  },

  lineHeight: {
    xs: "1.25",
    sm: "1.45",
    md: "1.5",
    lg: "1.6",
    xl: "1.65",
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
  },

  shadow: {
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },

  space: {
    0: "0",
    0.25: "2px",
    0.5: "4px",
    0.75: "6px",
    1: "8px",
    1.5: "12px",
    2: "16px",
    3: "24px",
    4: "32px",
    6: "48px",
    8: "64px",
    10: "80px",

    xs: "10px",
    sm: "12px",
    md: "16px",
    lg: "20px",
    xl: "32px",
  },
} as const;

export const tokensLight = {
  ...tokens,
  color: {
    ...tokens.color,

    "bg.information": tokens.color["blue.50"],
    "bg.success": tokens.color["green.50"],
    "text.success": tokens.color["green.600"],
  },
};

export const tokensDark = {
  ...tokens,
  color: {
    ...tokens.color,

    "bg.information": tokens.color["blue.900"],
    "bg.success": tokens.color["green.900"],
    "text.success": tokens.color["green.200"],
  },
};
