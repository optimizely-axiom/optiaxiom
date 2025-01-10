import figma from "@figma/code-connect";
import { Progress } from "@optiaxiom/react";

figma.connect(
  Progress,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=8028:11251",
  {
    example: ({ intent }) => <Progress intent={intent} value={72} />,
    props: {
      intent: figma.enum("Variant", {
        Default: undefined,
        Error: "danger",
        Success: "success",
      }),
    },
  },
);
