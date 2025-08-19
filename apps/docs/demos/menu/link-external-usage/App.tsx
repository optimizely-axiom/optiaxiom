import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react";
import { IconHelp } from "@tabler/icons-react";

export function App() {
  return (
    <Menu
      options={[
        {
          external: true,
          href: "https://github.com/optimizely-axiom/optiaxiom/",
          label: "GitHub",
        },
      ]}
    >
      <MenuTrigger aria-label="Help menu" icon={<IconHelp />} />
      <MenuContent />
    </Menu>
  );
}
