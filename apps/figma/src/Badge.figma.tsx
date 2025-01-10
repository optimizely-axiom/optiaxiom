import figma from "@figma/code-connect";
import { Badge } from "@optiaxiom/react";

figma.connect(
  Badge,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=980:35700",
  {
    example: ({ children, ...props }) => <Badge {...props}>{children}</Badge>,
    props: {
      children: figma.string("Label"),
      intent: figma.enum("Variant", {
        Danger: "danger",
        Info: "information",
        Neutral: undefined,
        Primary: "primary",
        Success: "success",
        Warning: "warning",
      }),
      variant: figma.enum("Style", {
        Accent: "solid",
        Subtle: undefined,
      }),
    },
  },
);
