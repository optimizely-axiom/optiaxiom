import figma from "@figma/code-connect";
import { Switch } from "@optiaxiom/react";

figma.connect(
  Switch,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=293:3346",
  {
    example: ({ children, ...props }) => <Switch {...props}>{children}</Switch>,
    props: {
      checked: figma.enum("Checked", {
        off: undefined,
        on: true,
      }),
      children: figma.string("Label right"),
      size: figma.enum("Size", {
        "Default 20": undefined,
        "Large 24": "lg",
      }),
    },
  },
);
