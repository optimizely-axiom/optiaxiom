import { Skeleton } from "@optiaxiom/react";
import { IconUserFilled } from "@tabler/icons-react";

export function App() {
  return (
    <Skeleton circle h="56" p="8">
      <IconUserFilled />
    </Skeleton>
  );
}
