import { Skeleton } from "@optiaxiom/react";
import { IconUserFilled } from "@tabler/icons-react";

export function App() {
  return (
    <Skeleton color="white" p="xs" rounded="full" size="8">
      <IconUserFilled />
    </Skeleton>
  );
}
