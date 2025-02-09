import { Flex, Progress } from "@optiaxiom/react";

export function App() {
  return (
    <Flex w="1/2">
      <Progress value={25} />
      <Progress intent="success" value={50} />
      <Progress intent="danger" value={75} />
    </Flex>
  );
}
