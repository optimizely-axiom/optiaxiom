import figma from "@figma/code-connect";
import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from "@optiaxiom/react";

figma.connect(
  Disclosure,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=2549:58765",
  {
    example: ({ chevronPosition, content, open, trigger }) => (
      <Disclosure open={open}>
        <DisclosureTrigger chevronPosition={chevronPosition}>
          {trigger}
        </DisclosureTrigger>

        <DisclosureContent>{content.text}</DisclosureContent>
      </Disclosure>
    ),
    props: {
      chevronPosition: figma.enum("Chevron", {
        End: "end",
        Start: undefined,
      }),
      content: figma.nestedProps("Disclosure content", {
        text: figma.string("Paragraph text"),
      }),
      open: figma.enum("Open", {
        False: undefined,
        True: true,
      }),
      trigger: figma.string("Disclosure label"),
    },
  },
);
