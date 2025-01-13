const palette = {
  "blue.50": "#D9E7FC" as const,
  "blue.100": "#C6DBFA" as const,
  "blue.200": "#A1C2F7" as const,
  "blue.300": "#7BAAF4" as const,
  "blue.400": "#5592F1" as const,
  "blue.500": "#2F7AEE" as const,
  "blue.600": "#115DD4" as const,
  "blue.700": "#0D46A0" as const,
  "blue.800": "#09306D" as const,
  "blue.900": "#051939" as const,

  "brand.50": "#F0F3FF" as const,
  "brand.100": "#CDD8FC" as const,
  "brand.200": "#B3C3FF" as const,
  "brand.300": "#6A8FFC" as const,
  "brand.400": "#2E66F7" as const,
  "brand.500": "#0037FF" as const,
  "brand.600": "#002CCC" as const,
  "brand.700": "#002894" as const,
  "brand.800": "#001666" as const,
  "brand.900": "#000B33" as const,

  "cyan.50": "#ECFEFF" as const,
  "cyan.100": "#CFFAFE" as const,
  "cyan.200": "#99F0F9" as const,
  "cyan.300": "#67E8F9" as const,
  "cyan.400": "#22D3EE" as const,
  "cyan.500": "#06B6D4" as const,
  "cyan.600": "#0891B2" as const,
  "cyan.700": "#0E7490" as const,
  "cyan.800": "#155E75" as const,
  "cyan.900": "#083344" as const,

  "green.50": "#E9F7F1" as const,
  "green.100": "#D1F0E1" as const,
  "green.200": "#A5E1C3" as const,
  "green.300": "#7CD2A7" as const,
  "green.400": "#5AC58A" as const,
  "green.500": "#03A65D" as const,
  "green.600": "#038047" as const,
  "green.700": "#24663E" as const,
  "green.800": "#17492B" as const,
  "green.900": "#082415" as const,

  "magenta.50": "#FDF4FF" as const,
  "magenta.100": "#FAE8FF" as const,
  "magenta.200": "#F5D0FE" as const,
  "magenta.300": "#F0ABFC" as const,
  "magenta.400": "#D765E9" as const,
  "magenta.500": "#C026D3" as const,
  "magenta.600": "#A21CAF" as const,
  "magenta.700": "#86198F" as const,
  "magenta.800": "#701A75" as const,
  "magenta.900": "#4A044E" as const,

  "neutral.00": "#FFFFFF" as const,
  "neutral.50": "#F9FAFC" as const,
  "neutral.75": "#F5F6FA" as const,
  "neutral.100": "#E9EDF5" as const,
  "neutral.150": "#DADFEB" as const,
  "neutral.200": "#CACFDC" as const,
  "neutral.300": "#B8BECB" as const,
  "neutral.500": "#838DA4" as const,
  "neutral.600": "#66708C" as const,
  "neutral.700": "#4F576E" as const,
  "neutral.800": "#2E3442" as const,
  "neutral.900": "#1C212B" as const,
  "neutral.1000": "#1C2029" as const,
  "neutral.1100": "#171A23" as const,
  "neutral.1200": "#091E42" as const,

  "neutral.50/6": "#F9FAFC0F" as const,
  "neutral.50/12": "#F9FAFC1F" as const,
  "neutral.50/18": "#F9FAFC2E" as const,
  "neutral.50/22": "#F9FAFC38" as const,
  "neutral.50/32": "#F9FAFC52" as const,

  "neutral.1200/4": "#091E420A" as const,
  "neutral.1200/8": "#091E4214" as const,
  "neutral.1200/16": "#091E4229" as const,
  "neutral.1200/22": "#091E4238" as const,
  "neutral.1200/32": "#091E4252" as const,

  "purple.50": "#F1ECF8" as const,
  "purple.100": "#E5DCF4" as const,
  "purple.200": "#C4B1E2" as const,
  "purple.300": "#9570D1" as const,
  "purple.400": "#7E51C8" as const,
  "purple.500": "#693AB6" as const,
  "purple.600": "#532E8F" as const,
  "purple.700": "#412470" as const,
  "purple.800": "#331C59" as const,
  "purple.900": "#261542" as const,

  "red.50": "#FFF7F7" as const,
  "red.100": "#FFD7D7" as const,
  "red.200": "#FFB4B4" as const,
  "red.300": "#FC8B8B" as const,
  "red.400": "#F64F4F" as const,
  "red.500": "#CC1616" as const,
  "red.600": "#B21313" as const,
  "red.700": "#911D1D" as const,
  "red.800": "#601313" as const,
  "red.900": "#300A0A" as const,

  "yellow.50": "#FFFAEA" as const,
  "yellow.100": "#FEF1C6" as const,
  "yellow.200": "#FEDF88" as const,
  "yellow.300": "#FFC84B" as const,
  "yellow.400": "#FDB022" as const,
  "yellow.500": "#F79008" as const,
  "yellow.600": "#DC6903" as const,
  "yellow.700": "#B54707" as const,
  "yellow.800": "#7A2E0D" as const,
  "yellow.900": "#4E1D09" as const,
} as const;

const ld = <A extends string, B extends string>(a: A, b: B) =>
  `light-dark(${a}, ${b})` as const;

export const colors = {
  "bg.accent": ld(palette["brand.500"], palette["brand.400"]),
  "bg.accent.hovered": ld(palette["brand.600"], palette["brand.400"]),
  "bg.accent.light": ld(palette["brand.200"], palette["brand.800"]),
  "bg.accent.pressed": ld(palette["brand.700"], palette["brand.600"]),
  "bg.accent.subtle": ld(palette["brand.50"], palette["brand.900"]),
  "bg.avatar.neutral": ld(palette["neutral.100"], palette["neutral.800"]),
  "bg.avatar.purple": ld(palette["purple.100"], palette["purple.700"]),
  "bg.default": ld(palette["neutral.00"], palette["neutral.1000"]),
  "bg.default.hovered": ld(palette["neutral.1200/4"], palette["neutral.50/6"]),
  "bg.default.inverse": ld(palette["neutral.800"], palette["neutral.100"]),
  "bg.default.inverse.hovered": ld(
    palette["neutral.900"],
    palette["neutral.200"],
  ),
  "bg.default.inverse.pressed": ld(
    palette["neutral.1000"],
    palette["neutral.300"],
  ),
  "bg.default.pressed": ld(palette["neutral.1200/8"], palette["neutral.50/12"]),
  "bg.error": ld(palette["red.500"], palette["red.500"]),
  "bg.error.hovered": ld(palette["red.600"], palette["red.400"]),
  "bg.error.light": ld(palette["red.200"], palette["red.700"]),
  "bg.error.pressed": ld(palette["red.700"], palette["red.600"]),
  "bg.error.subtle": ld(palette["red.100"], palette["red.800"]),
  "bg.error.subtlest": ld(palette["red.50"], palette["red.900"]),
  "bg.information": ld(palette["blue.600"], palette["blue.600"]),
  "bg.information.light": ld(palette["blue.200"], palette["blue.800"]),
  "bg.information.subtle": ld(palette["blue.100"], palette["blue.900"]),
  "bg.overlay": ld(palette["neutral.1200/32"], palette["neutral.50/32"]),
  "bg.page": ld(palette["neutral.50"], palette["neutral.1100"]),
  "bg.secondary": ld(palette["neutral.75"], palette["neutral.900"]),
  "bg.secondary.hovered": ld(palette["neutral.75"], palette["neutral.50/12"]),
  "bg.spinner.default": ld(palette["neutral.1200"], palette["neutral.50"]),
  "bg.spinner.inverse": ld(palette["neutral.50"], palette["neutral.50"]),
  "bg.success": ld(palette["green.600"], palette["green.600"]),
  "bg.success.hovered": ld(palette["green.700"], palette["green.400"]),
  "bg.success.light": ld(palette["green.200"], palette["green.800"]),
  "bg.success.subtle": ld(palette["green.100"], palette["green.900"]),
  "bg.tertiary": ld(palette["neutral.150"], palette["neutral.700"]),
  "bg.tertiary.hovered": ld(palette["neutral.200"], palette["neutral.50/18"]),
  "bg.warning": ld(palette["yellow.300"], palette["yellow.500"]),
  "bg.warning.hovered": ld(palette["yellow.600"], palette["yellow.400"]),
  "bg.warning.light": ld(palette["yellow.200"], palette["yellow.800"]),
  "bg.warning.subtle": ld(palette["yellow.100"], palette["yellow.900"]),

  "border.accent": ld(palette["brand.500"], palette["brand.300"]),
  "border.control": ld(palette["neutral.500"], palette["neutral.700"]),
  "border.control.hovered": ld(palette["neutral.600"], palette["neutral.600"]),
  "border.default": ld(palette["neutral.100"], palette["neutral.800"]),
  "border.disabled": ld(palette["neutral.75"], palette["neutral.800"]),
  "border.error": ld(palette["red.500"], palette["red.200"]),
  "border.focus": ld(palette["brand.400"], palette["brand.300"]),
  "border.focus.error": ld(palette["red.400"], palette["red.300"]),
  "border.secondary": ld(palette["neutral.150"], palette["neutral.700"]),
  "border.success": ld(palette["green.500"], palette["green.500"]),
  "border.tertiary": ld(palette["neutral.200"], palette["neutral.600"]),
  "border.tertiary.hovered": ld(palette["neutral.500"], palette["neutral.500"]),
  "border.warning": ld(palette["yellow.500"], palette["yellow.500"]),

  "fg.accent": ld(palette["brand.500"], palette["brand.300"]),
  "fg.accent.hovered": ld(palette["brand.600"], palette["brand.500"]),
  "fg.accent.strong": ld(palette["brand.700"], palette["brand.400"]),
  "fg.avatar.neutral": ld(palette["neutral.700"], palette["neutral.100"]),
  "fg.avatar.purple": ld(palette["purple.700"], palette["purple.100"]),
  "fg.default": ld(palette["neutral.800"], palette["neutral.75"]),
  "fg.default.inverse": ld(palette["neutral.00"], palette["neutral.800"]),
  "fg.disabled": ld(palette["neutral.200"], palette["neutral.50/32"]),
  "fg.error": ld(palette["red.500"], palette["red.300"]),
  "fg.error.hovered": ld(palette["red.600"], palette["red.600"]),
  "fg.error.light": ld(palette["red.300"], palette["red.300"]),
  "fg.error.strong": ld(palette["red.700"], palette["red.200"]),
  "fg.information": ld(palette["blue.500"], palette["blue.300"]),
  "fg.information.light": ld(palette["blue.300"], palette["blue.300"]),
  "fg.information.strong": ld(palette["blue.700"], palette["blue.200"]),
  "fg.link.default": ld(palette["brand.500"], palette["brand.400"]),
  "fg.link.default.hovered": ld(palette["brand.600"], palette["brand.200"]),
  "fg.link.inverse": ld(palette["neutral.00"], palette["neutral.00"]),
  "fg.link.subtle": ld(palette["neutral.800"], palette["neutral.800"]),
  "fg.link.visited": ld(palette["purple.600"], palette["purple.500"]),
  "fg.secondary": ld(palette["neutral.700"], palette["neutral.200"]),
  "fg.spinner.default": ld(palette["neutral.800"], palette["neutral.200"]),
  "fg.spinner.inverse": ld(palette["neutral.200"], palette["neutral.800"]),
  "fg.success": ld(palette["green.500"], palette["green.300"]),
  "fg.success.hovered": ld(palette["green.600"], palette["green.600"]),
  "fg.success.light": ld(palette["green.300"], palette["green.300"]),
  "fg.success.strong": ld(palette["green.700"], palette["green.200"]),
  "fg.tertiary": ld(palette["neutral.600"], palette["neutral.500"]),
  "fg.warning": ld(palette["yellow.500"], palette["yellow.300"]),
  "fg.warning.hovered": ld(palette["yellow.600"], palette["yellow.600"]),
  "fg.warning.inverse": ld(palette["neutral.800"], palette["neutral.800"]),
  "fg.warning.light": ld(palette["yellow.300"], palette["yellow.300"]),
  "fg.warning.strong": ld(palette["yellow.700"], palette["yellow.200"]),
  "fg.white": ld(palette["neutral.00"], palette["neutral.00"]),
} as const;
