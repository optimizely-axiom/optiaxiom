import { IconUpload } from "@optiaxiom/icons";
import { Button } from "@optiaxiom/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function App() {
  return (
    <Button asChild icon={<IconUpload />}>
      <label>
        Upload file
        <VisuallyHidden>
          <input type="file" />
        </VisuallyHidden>
      </label>
    </Button>
  );
}
