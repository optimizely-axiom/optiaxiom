declare module "@material-symbols/svg-300/rounded/*.svg" {
  import type {
    ForwardRefExoticComponent,
    RefAttributes,
    SVGProps,
  } from "react";

  const Icon: ForwardRefExoticComponent<
    RefAttributes<SVGSVGElement> &
      SVGProps<SVGSVGElement> & {
        size?:
          | "2xs"
          | "3xl"
          | "lg"
          | "md"
          | "sm"
          | "xl"
          | "xs"
          | number
          | string;
      }
  >;
  export default Icon;
}
