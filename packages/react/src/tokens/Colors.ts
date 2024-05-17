class ColorPalette {
  current = "currentColor";
  transparent = "transparent";

  black = "#000";
  white = "#fff";

  "aqua.50" = "#e5f7fb";
  "aqua.200" = "#9ae5ef";
  "aqua.500" = "#00bdd6";
  "aqua.600" = "#007a8a";

  "blue.50" = "#e7f3fe";
  "blue.200" = "#a8d5fa";
  "blue.500" = "#2094f3";
  "blue.600" = "#1668ac";
  "blue.900" = "#1c2b41";

  "brand.50" = "#f0f3ff";
  "brand.200" = "#b3c3ff";
  "brand.500" = "#0037ff";
  "brand.600" = "#002ccc";

  "dark.50" = "#d9d9d9";
  "dark.200" = "#9e9e9e";
  "dark.500" = "#707070";
  "dark.600" = "#080736";

  "gray.50" = "#f9fafb";
  "gray.100" = "#f3f4f6";
  "gray.200" = "#e5e7eb";
  "gray.300" = "#d1d5db";
  "gray.400" = "#9ca3af";
  "gray.500" = "#6b7280";
  "gray.600" = "#4b5563";
  "gray.700" = "#374151";
  "gray.800" = "#1f2937";
  "gray.900" = "#111827";

  "green.50" = "#edf7ed";
  "green.200" = "#b9dfbb";
  "green.500" = "#4cae4f";
  "green.600" = "#357937";
  "green.900" = "#1c3329";

  "magenta.50" = "#f8e7f5";
  "magenta.200" = "#e39cd6";
  "magenta.500" = "#b80597";
  "magenta.600" = "#81046a";

  "orange.50" = "#fff5e5";
  "orange.200" = "#ffd699";
  "orange.500" = "#ff9900";
  "orange.600" = "#a36200";

  "purple.50" = "#f1ecf8";
  "purple.200" = "#c4b1e2";
  "purple.500" = "#693ab6";
  "purple.600" = "#4a297f";

  "red.50" = "#feecec";
  "red.200" = "#faadad";
  "red.500" = "#f33030";
  "red.600" = "#c02626";

  "slate.50" = "#f8fafc";
  "slate.100" = "#f1f5f9";
  "slate.200" = "#e2e8f0";
  "slate.300" = "#cbd5e1";
  "slate.400" = "#94a3b8";
  "slate.500" = "#64748b";
  "slate.600" = "#475569";
  "slate.700" = "#334155";
  "slate.800" = "#1e293b";
  "slate.900" = "#0f172a";
  "slate.950" = "#020617";

  "yellow.50" = "#fff9e5";
  "yellow.200" = "#ffe699";
  "yellow.500" = "#ffc105";
  "yellow.600" = "#d7a204";
}

export class Colors extends ColorPalette {
  "bg.information" = this["blue.50"];
  "bg.neutral" = this["slate.100"];
  "bg.success" = this["green.50"];
  border = this["gray.200"];
  surface = this["white"];
  text = this["dark.600"];
  "text.accent.magenta" = this["magenta.600"];
  "text.subtle" = this["slate.600"];
  "text.success" = this["green.600"];
}

export class ColorsDark extends ColorPalette {
  "bg.information" = this["blue.900"];
  "bg.neutral" = this["slate.800"];
  "bg.success" = this["green.900"];
  border = this["gray.800"];
  surface = this["gray.900"];
  text = this["gray.100"];
  "text.accent.magenta" = this["magenta.200"];
  "text.subtle" = this["slate.400"];
  "text.success" = this["green.200"];
}
