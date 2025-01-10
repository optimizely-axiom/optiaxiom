import figma from "@figma/code-connect";
import { Alert } from "@optiaxiom/react";

figma.connect(
  Alert,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=1593:19796",
  {
    // @ts-expect-error -- upstream issue https://github.com/figma/code-connect/issues/195
    example: ({ children, ...props }) => <Alert {...props}>{children}</Alert>,
    props: {
      children: figma.string("Text"),
      intent: figma.enum("Variant", {
        Danger: "danger",
        Information: "information",
        Neutral: "neutral",
        Success: "success",
        Warning: "warning",
      }),
      onClose: figma.boolean("Dismissible"),
    },
  },
);
