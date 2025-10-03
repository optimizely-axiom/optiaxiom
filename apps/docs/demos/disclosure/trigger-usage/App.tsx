import {
  Button,
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from "@optiaxiom/react";
import { IconThumbDown } from "@tabler/icons-react";

export function App() {
  return (
    <Disclosure maxW="sm" w="full">
      <DisclosureTrigger asChild>
        <Button aria-label="Dislike" icon={<IconThumbDown />} />
      </DisclosureTrigger>
      <DisclosureContent>
        Aenean neque dui, lobortis et sem quis, mattis varius nisl. Nulla turpis
        sapien, venenatis eu pharetra at, ullamcorper sed nibh.
      </DisclosureContent>
    </Disclosure>
  );
}
