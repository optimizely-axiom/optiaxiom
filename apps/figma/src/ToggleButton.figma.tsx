import figma from "@figma/code-connect";
import { ToggleButton } from "@optiaxiom/react";

figma.connect(
  ToggleButton,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=5462:22275",
  {
    example: ({ button, ...props }) => <ToggleButton {...button} {...props} />,
    props: {
      appearance: figma.enum("Variant", {
        Default: "default",
        Subtle: undefined,
      }),
      button: figma.instance("Button").getProps(),
    },
  },
);
