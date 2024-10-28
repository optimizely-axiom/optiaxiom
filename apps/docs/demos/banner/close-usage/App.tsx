import {
  Banner,
  BannerDescription,
  BannerTitle,
  Button,
} from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(true);

  return (
    <>
      {open && (
        <Banner onClose={() => setOpen(false)}>
          <BannerTitle>Some action is not permitted</BannerTitle>
          <BannerDescription>
            You do not have the required permissions to perform this action.
          </BannerDescription>
        </Banner>
      )}

      {!open && <Button onClick={() => setOpen(true)}>Show banner</Button>}
    </>
  );
}
