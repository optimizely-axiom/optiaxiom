import figma from "@figma/code-connect";
import { Banner } from "@optiaxiom/react";

figma.connect(
  Banner,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=2013:26186",
  {
    example: ({ children, ...props }) => (
      <Banner onClose={() => {}} {...props}>
        {children}
      </Banner>
    ),
    props: {
      children: figma.string("Text"),
      intent: figma.enum("Variant", {
        Danger: "danger",
        Information: "information",
        Neutral: "neutral",
        Success: "success",
        Warning: "warning",
      }),
    },
  },
);
