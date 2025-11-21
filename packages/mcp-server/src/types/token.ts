/**
 * Color token definition
 */
export type ColorTokens = Record<string, Record<string, string>>;

/**
 * Spacing token definition
 */
export interface SpacingTokens {
  [name: string]: {
    value: string;
    pixels: number;
    description?: string;
  };
}

/**
 * Typography token definition
 */
export interface TypographyTokens {
  fontSizes: Record<string, { value: string; pixels: number }>;
  fontWeights: Record<string, number>;
  lineHeights: Record<string, number>;
  fontFamilies: Record<string, string>;
}

/**
 * Shadow token definition
 */
export interface ShadowTokens {
  [name: string]: {
    value: string;
    description?: string;
  };
}

/**
 * Border radius token definition
 */
export interface BorderRadiusTokens {
  [name: string]: {
    value: string;
    pixels: number;
  };
}

/**
 * Z-index token definition
 */
export interface ZIndexTokens {
  [name: string]: number;
}

/**
 * Design tokens organized by category
 */
export interface DesignTokens {
  colors: ColorTokens;
  spacing: SpacingTokens;
  typography: TypographyTokens;
  shadows: ShadowTokens;
  borderRadius: BorderRadiusTokens;
  zIndex: ZIndexTokens;
}

/**
 * Token category type
 */
export type TokenCategory = keyof DesignTokens | 'all';
