import figma from "@figma/code-connect";
// @ts-expect-error -- private package
import { IconAngleDown, IconCalendar, IconUser } from "@optimizely/axiom-icons";

export default {
  IconAngleDown: figma.connect(
    IconAngleDown,
    "https://www.figma.com/design/F1vaZkWrXaCLxM81W5OzkG/Axiom-Icons?node-id=1236-10738",
    { example: () => <IconAngleDown /> },
  ),
  IconCalendar: figma.connect(
    IconCalendar,
    "https://www.figma.com/design/F1vaZkWrXaCLxM81W5OzkG/Axiom-Icons?node-id=1236-10317",
    { example: () => <IconCalendar /> },
  ),
  IconUser: figma.connect(
    IconUser,
    "https://www.figma.com/design/F1vaZkWrXaCLxM81W5OzkG/Axiom-Icons?node-id=1236-10794",
    { example: () => <IconUser /> },
  ),
};
