class ColorPalette {
  current = "currentColor" as const;
  transparent = "transparent" as const;

  black = "#000" as const;
  white = "#fff" as const;

  "aqua.50" = "#e5f7fb" as const;
  "aqua.200" = "#9ae5ef" as const;
  "aqua.500" = "#00bdd6" as const;
  "aqua.600" = "#007a8a" as const;

  "blue.50" = "#e7f3fe" as const;
  "blue.200" = "#a8d5fa" as const;
  "blue.500" = "#2094f3" as const;
  "blue.600" = "#1668ac" as const;
  "blue.900" = "#1c2b41" as const;

  "brand.50" = "#f0f3ff" as const;
  "brand.200" = "#b3c3ff" as const;
  "brand.500" = "#0037ff" as const;
  "brand.600" = "#002ccc" as const;

  "dark.50" = "#d9d9d9" as const;
  "dark.200" = "#9e9e9e" as const;
  "dark.500" = "#707070" as const;
  "dark.600" = "#080736" as const;

  "gray.50" = "#f9fafb" as const;
  "gray.100" = "#f3f4f6" as const;
  "gray.200" = "#e5e7eb" as const;
  "gray.300" = "#d1d5db" as const;
  "gray.400" = "#9ca3af" as const;
  "gray.500" = "#6b7280" as const;
  "gray.600" = "#4b5563" as const;
  "gray.700" = "#374151" as const;
  "gray.800" = "#1f2937" as const;
  "gray.900" = "#111827" as const;

  "green.50" = "#edf7ed" as const;
  "green.200" = "#b9dfbb" as const;
  "green.500" = "#4cae4f" as const;
  "green.600" = "#357937" as const;
  "green.900" = "#1c3329" as const;

  "magenta.50" = "#f8e7f5" as const;
  "magenta.200" = "#e39cd6" as const;
  "magenta.500" = "#b80597" as const;
  "magenta.600" = "#81046a" as const;

  "orange.50" = "#fff5e5" as const;
  "orange.200" = "#ffd699" as const;
  "orange.500" = "#ff9900" as const;
  "orange.600" = "#a36200" as const;

  "purple.50" = "#f1ecf8" as const;
  "purple.200" = "#c4b1e2" as const;
  "purple.500" = "#693ab6" as const;
  "purple.600" = "#4a297f" as const;

  "red.50" = "#feecec" as const;
  "red.200" = "#faadad" as const;
  "red.500" = "#f33030" as const;
  "red.600" = "#c02626" as const;

  "slate.50" = "#f8fafc" as const;
  "slate.100" = "#f1f5f9" as const;
  "slate.200" = "#e2e8f0" as const;
  "slate.300" = "#cbd5e1" as const;
  "slate.400" = "#94a3b8" as const;
  "slate.500" = "#64748b" as const;
  "slate.600" = "#475569" as const;
  "slate.700" = "#334155" as const;
  "slate.800" = "#1e293b" as const;
  "slate.900" = "#0f172a" as const;
  "slate.950" = "#020617" as const;

  "yellow.50" = "#fff9e5" as const;
  "yellow.200" = "#ffe699" as const;
  "yellow.500" = "#ffc105" as const;
  "yellow.600" = "#d7a204" as const;
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
