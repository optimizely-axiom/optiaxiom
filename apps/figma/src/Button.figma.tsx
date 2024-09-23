import figma from "@figma/code-connect";
import { Button } from "@optiaxiom/react";

figma.connect(
  Button,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=20%3A61",
  {
    example: ({ children, ...props }) => <Button {...props}>{children}</Button>,
    props: {
      appearance: figma.enum("Type", {
        Basic: "default",
        Danger: "danger",
        "Danger Outline": "danger-outline",
        Plain: "default",
        Primary: "primary",
      }),
      children: figma.string("Label"),
      icon: figma.boolean("Leading Icon", {
        false: figma.boolean("Trailing Icon", {
          false: undefined,
          true: figma.instance("↳ Trailing Icon Type"),
        }),
        true: figma.instance("↳ Leading Icon Type"),
      }),
      iconPosition: figma.boolean("Trailing Icon", {
        false: undefined,
        true: "end",
      }),
      size: figma.enum("Size", {
        "Lg - 40": "lg",
        "Md - 32": "md",
        "Sm - 24": "sm",
      }),
    },
  },
);
