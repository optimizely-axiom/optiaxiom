import { Button, Flex, toaster } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="row" flexWrap="wrap">
      {(
        ["danger", "information", "neutral", "success", "warning"] as const
      ).map((type) => (
        <Button
          key={type}
          onClick={() =>
            toaster.create("This is an example toast message.", { type })
          }
        >
          {type} toast
        </Button>
      ))}
    </Flex>
  );
}
