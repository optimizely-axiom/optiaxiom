import figma from "@figma/code-connect";
// @ts-expect-error -- private package
import { IconAngleDown, IconCalendar } from "@optimizely/axiom-icons";

figma.connect(
  IconAngleDown,
  "https://www.figma.com/design/F1vaZkWrXaCLxM81W5OzkG/Axiom-Icons?node-id=1236-10738",
  { example: () => <IconAngleDown /> },
);

figma.connect(
  IconCalendar,
  "https://www.figma.com/design/F1vaZkWrXaCLxM81W5OzkG/Axiom-Icons?node-id=1236-10317",
  { example: () => <IconCalendar /> },
);
