export type FixtureProps = {
  /**
   * Numeric literal union.
   */
  columns?: 1 | 2 | 3;
  /**
   * Optional boolean.
   */
  disabled?: boolean;
  /**
   * Responsive value, like the sprinkle props.
   */
  gap?: "8" | "16" | ResponsiveArray<"8" | "16">;
  /**
   * Optional string.
   */
  label?: string;
  /**
   * Optional number.
   */
  max?: number;
  /**
   * Event handler.
   */
  onValueChange?: (value: string) => void;
  /**
   * Required boolean.
   */
  required: boolean;
  /**
   * String literal union.
   */
  size?: "md" | "sm";
};

type ResponsiveArray<T> = [T, T?];

export declare function Fixture(props: FixtureProps): null;
