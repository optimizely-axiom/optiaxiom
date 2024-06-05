import { Flex, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Flex>
      <Text>
        This is a <strong>paragraph</strong> element.
      </Text>
      <Text as="label">
        This is a <strong>label</strong> element.
      </Text>
      <Text as="span">
        This is a <strong>span</strong> element.
      </Text>
    </Flex>
  );
}
