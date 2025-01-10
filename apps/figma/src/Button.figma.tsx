import figma from "@figma/code-connect";
import { Button, Tooltip } from "@optiaxiom/react";

figma.connect(
  Button,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=20%3A61",
  {
    example: ({ children, ...props }) => <Button {...props}>{children}</Button>,
    props: {
      appearance: figma.enum("Variant", {
        Basic: "default",
        Danger: "danger",
        "Danger Outline": "danger-outline",
        Inverse: "inverse",
        Plain: "default",
        Primary: "primary",
      }),
      children: figma.string("Label"),
      disabled: figma.enum("State", {
        Loading: true,
      }),
      icon: figma.boolean("Addon before", {
        false: figma.boolean("Addon after", {
          false: undefined,
          true: figma.instance("↳ Icon after"),
        }),
        true: figma.instance("↳ Icon before"),
      }),
      iconPosition: figma.boolean("Addon after", {
        false: undefined,
        true: "end",
      }),
      loading: figma.enum("State", {
        Loading: true,
      }),
      size: figma.enum("Size", {
        "Lg - 40": "lg",
        "Md - 32": undefined,
        "Sm - 24": "sm",
      }),
    },
    variant: { "Icon Button": "False" },
  },
);

figma.connect(
  Button,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=20%3A61",
  {
    example: ({ tooltip, ...props }) => (
      <Tooltip content={tooltip.text}>
        <Button {...props} />
      </Tooltip>
    ),
    props: {
      appearance: figma.enum("Variant", {
        Basic: "default",
        Danger: "danger",
        "Danger Outline": "danger-outline",
        Inverse: "inverse",
        Plain: "default",
        Primary: "primary",
      }),
      disabled: figma.enum("State", {
        Loading: true,
      }),
      icon: figma.instance("Icon"),
      iconPosition: figma.boolean("Addon after", {
        false: undefined,
        true: "end",
      }),
      loading: figma.enum("State", {
        Loading: true,
      }),
      size: figma.enum("Size", {
        "Lg - 40": "lg",
        "Md - 32": undefined,
        "Sm - 24": "sm",
      }),
      tooltip: figma.nestedProps("Tooltip", {
        text: figma.string("Text"),
      }),
    },
    variant: { "Icon Button": "True" },
  },
);
