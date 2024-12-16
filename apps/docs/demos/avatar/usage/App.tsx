import { Avatar, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="row" gap="10">
      <Avatar
        name="John Snow"
        size="3xl"
        src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
      >
        JS
      </Avatar>
      <Avatar
        name="Daenerys Targaryen"
        size="xl"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      >
        DT
      </Avatar>
      <Avatar name="Khal Drogo" size="lg">
        KD
      </Avatar>
      <Avatar name="Jamie Lannister" size="md">
        JL
      </Avatar>
      <Avatar size="sm">+2</Avatar>
      <Avatar name="Ned Stark" size="xs">
        NS
      </Avatar>
    </Flex>
  );
}
