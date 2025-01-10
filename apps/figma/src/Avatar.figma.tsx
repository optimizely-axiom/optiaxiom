import figma from "@figma/code-connect";
import { Avatar } from "@optiaxiom/react";

figma.connect(
  Avatar,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=111:2533",
  {
    example: ({ size }) => (
      <Avatar
        name="Wanda Maximoff"
        size={size}
        src="https://i.pravatar.cc/150?img=24"
      />
    ),
    props: {
      size: figma.enum("Size", {
        "2xs - 16": undefined,
        "lg - 48": "lg",
        "md - 32": undefined,
        "sm - 24": "sm",
        "xl - 80": "xl",
        "xs - 20": "xs",
      }),
    },
    variant: { Variant: "Photo" },
  },
);

figma.connect(
  Avatar,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=111:2533",
  {
    example: ({ size }) => <Avatar name="Wanda Maximoff" size={size} />,
    props: {
      size: figma.enum("Size", {
        "2xs - 16": undefined,
        "lg - 48": "lg",
        "md - 32": undefined,
        "sm - 24": "sm",
        "xl - 80": "xl",
        "xs - 20": "xs",
      }),
    },
    variant: { Variant: "Initials" },
  },
);

figma.connect(
  Avatar,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=111:2533",
  {
    example: ({ size }) => <Avatar fallback="team" size={size} />,
    props: {
      size: figma.enum("Size", {
        "2xs - 16": undefined,
        "lg - 48": "lg",
        "md - 32": undefined,
        "sm - 24": "sm",
        "xl - 80": "xl",
        "xs - 20": "xs",
      }),
    },
    variant: { Variant: "Team" },
  },
);

figma.connect(
  Avatar,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=111:2533",
  {
    example: ({ size }) => <Avatar size={size} />,
    props: {
      size: figma.enum("Size", {
        "2xs - 16": undefined,
        "lg - 48": "lg",
        "md - 32": undefined,
        "sm - 24": "sm",
        "xl - 80": "xl",
        "xs - 20": "xs",
      }),
    },
    variant: { Variant: "Annoymous" },
  },
);
