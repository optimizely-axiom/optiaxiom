import { Flex, Strong, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Flex>
      <Text>
        This is a <Strong>paragraph</Strong> element.
      </Text>
      <Text as="label">
        This is a <Strong>label</Strong> element.
      </Text>
      <Text as="span">
        This is a <Strong>span</Strong> element.
      </Text>
    </Flex>
  );
}
