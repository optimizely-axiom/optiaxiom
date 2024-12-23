import { Avatar, AvatarGroup } from "@optiaxiom/react";

export function App() {
  return (
    <AvatarGroup size="sm">
      <Avatar name="John Snow" src="https://i.pravatar.cc/150?img=7">
        JS
      </Avatar>
      <Avatar name="Daenerys Targaryen" src="https://i.pravatar.cc/150?img=5">
        DT
      </Avatar>
      <Avatar name="Jamie Lannister">JL</Avatar>
      <Avatar>+2</Avatar>
    </AvatarGroup>
  );
}
