import { Button, Cover, Group, Link } from "@optiaxiom/react";
import { IconStar } from "@tabler/icons-react";

export function App() {
  return (
    <Group
      border="1"
      fontSize="md"
      gap="16"
      justifyContent="space-between"
      px="24"
      py="16"
      rounded="md"
      style={{ position: "relative" }}
      w="224"
    >
      <Cover asChild>
        <Link appearance="subtle" href="data:," rounded="inherit">
          Primary Link
        </Link>
      </Cover>
      <Button appearance="subtle" icon={<IconStar />} />
    </Group>
  );
}
