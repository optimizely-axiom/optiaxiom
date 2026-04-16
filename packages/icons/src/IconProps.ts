import type {
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export type IconProps = ForwardRefExoticComponent<
  Omit<ComponentPropsWithoutRef<"svg">, "height" | "width"> &
    RefAttributes<SVGSVGElement> & {
      /**
       * Whether the icon should use filled or unfilled state.
       */
      filled?: boolean;
      /**
       * Set the icon size using design tokens (`sm`, `md`, `lg`, etc.), pixel string values (`"16"`, `"20"`), or numeric pixel values (`16`, `20`).
       */
      size?: number | string;
    }
>;
