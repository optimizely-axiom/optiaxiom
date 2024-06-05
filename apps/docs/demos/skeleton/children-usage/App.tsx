import { Skeleton } from "@optiaxiom/react";
import { IconUserFilled } from "@tabler/icons-react";

export function App() {
  return (
    <Skeleton circle h="64" p="xs">
      <IconUserFilled />
    </Skeleton>
  );
}
