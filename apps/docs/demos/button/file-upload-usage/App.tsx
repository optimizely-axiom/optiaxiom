import { Button } from "@optiaxiom/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { IconCloudUpload } from "@tabler/icons-react";

export function App() {
  return (
    <Button asChild icon={<IconCloudUpload />}>
      <label>
        Upload file
        <VisuallyHidden>
          <input type="file" />
        </VisuallyHidden>
      </label>
    </Button>
  );
}
