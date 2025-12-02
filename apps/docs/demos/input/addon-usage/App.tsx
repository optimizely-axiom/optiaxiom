"use client";

import { Button, Input } from "@optiaxiom/react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

export function App() {
  const [hidden, setHidden] = useState(true);

  return (
    <Input
      addonAfter={
        <Button
          appearance="subtle"
          icon={hidden ? <IconEye /> : <IconEyeOff />}
          onClick={() => setHidden((flag) => !flag)}
          rounded="full"
          size="sm"
        />
      }
      placeholder="Password"
      type={hidden ? "password" : "text"}
    />
  );
}
