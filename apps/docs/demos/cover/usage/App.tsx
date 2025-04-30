import { Button, Cover, Flex, Link } from "@optiaxiom/react";
import { IconStar } from "@tabler/icons-react";

export function App() {
  return (
    <Flex
      border="1"
      flexDirection="row"
      fontSize="md"
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
    </Flex>
  );
}
