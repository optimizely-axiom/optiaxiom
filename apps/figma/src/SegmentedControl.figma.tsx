import figma from "@figma/code-connect";
import { SegmentedControl, SegmentedControlItem } from "@optiaxiom/react";

figma.connect(
  SegmentedControl,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=2429:8594",
  {
    example: ({ children }) => (
      <SegmentedControl
        onValueChange={() => {
          /* handle change event */
        }}
        value="bar"
      >
        {children}
      </SegmentedControl>
    ),
    props: {
      children: figma.children("*"),
    },
  },
);

figma.connect(
  SegmentedControlItem,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=2429:8531",
  {
    example: ({ button }) => <SegmentedControlItem {...button} value="foo" />,
    props: {
      button: figma.instance("Button").getProps(),
    },
  },
);
