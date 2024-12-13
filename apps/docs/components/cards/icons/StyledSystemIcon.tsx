import { Flex } from "@optiaxiom/react";

export const StyledSystemIcon = () => (
  <Flex gap="4" w="xl">
    <Flex
      alignItems="center"
      bg="bg.error.subtle"
      gap="4"
      p="6"
      rounded="sm"
      style={{ boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.2)" }}
    />

    <Flex
      alignItems="center"
      bg="bg.success.subtle"
      gap="4"
      p="6"
      rounded="sm"
      style={{ boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.2)" }}
    />

    <Flex
      alignItems="center"
      bg="bg.information.subtle"
      gap="4"
      p="6"
      rounded="sm"
      style={{ boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.2)" }}
    />
  </Flex>
);
