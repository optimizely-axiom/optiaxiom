import { Skeleton } from "@optiaxiom/react";
import { IconUserFilled } from "@tabler/icons-react";

export function App() {
  return (
    <Skeleton borderRadius="full" color="white" padding="xs" size={8}>
      <IconUserFilled />
    </Skeleton>
  );
}
