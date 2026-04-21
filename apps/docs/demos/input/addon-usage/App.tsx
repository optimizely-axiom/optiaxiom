"use client";

import { IconEye, IconEyeSlash } from "@optiaxiom/icons";
import { Button, Input } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [hidden, setHidden] = useState(true);

  return (
    <Input
      addonAfter={
        <Button
          appearance="subtle"
          icon={hidden ? <IconEye /> : <IconEyeSlash />}
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
