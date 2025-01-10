import figma from "@figma/code-connect";
import { Spinner } from "@optiaxiom/react";

figma.connect(
  Spinner,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=3411:37560",
  {
    example: ({ size }) => <Spinner size={size} />,
    props: {
      appearance: figma.enum("Variant", {
        Default: undefined,
        Invert: "inverse",
      }),
      size: figma.enum("Variant", {
        "2xs - 16": "2xs",
        "md -32": undefined,
        "sm - 24": "sm",
        "xl - 48": "xl",
      }),
    },
  },
);
