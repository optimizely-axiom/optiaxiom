import { Avatar, AvatarGroup } from "@optiaxiom/react";

export function App() {
  return (
    <AvatarGroup size="sm">
      <Avatar
        name="John Snow"
        src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
      >
        JS
      </Avatar>
      <Avatar
        name="Daenerys Targaryen"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      >
        DT
      </Avatar>
      <Avatar name="Jamie Lannister">JL</Avatar>
      <Avatar>+2</Avatar>
    </AvatarGroup>
  );
}
