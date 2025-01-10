import figma from "@figma/code-connect";
import { Checkbox } from "@optiaxiom/react";

figma.connect(
  Checkbox,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=99:1127",
  {
    example: ({ children, ...props }) => (
      <Checkbox {...props}>{children}</Checkbox>
    ),
    props: {
      checked: figma.enum("Checked", {
        off: undefined,
        on: true,
      }),
      children: figma.string("Label"),
      description: figma.boolean("Helper Text", {
        false: undefined,
        true: figma.string("↳ Helper text"),
      }),
      indeterminate: figma.enum("Indeterminate", {
        false: undefined,
        true: true,
      }),
    },
  },
);
