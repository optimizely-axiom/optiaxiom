"use client";

import { Box, Field, Group, Input, Spinner } from "@optiaxiom/react";
import { IconCheck } from "@tabler/icons-react";
import { useRef, useState } from "react";

const takenUsernames = ["admin", "user", "test"];

export function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const available = value && !checking && !error;

  return (
    <Field
      description={
        available && (
          <Group gap="4">
            <Box asChild color="fg.success">
              <IconCheck />
            </Box>
            Username is available
          </Group>
        )
      }
      error={error || undefined}
      label="Username"
      w="224"
    >
      <Input
        addonAfter={checking && <Spinner size="2xs" />}
        onValueChange={(value) => {
          setValue(value);
          clearTimeout(timeoutRef.current);

          setError("");
          if (!value) {
            setChecking(false);
            return;
          }

          setChecking(true);
          timeoutRef.current = setTimeout(() => {
            if (takenUsernames.includes(value.toLowerCase())) {
              setError("Username is already taken");
            }
            setChecking(false);
          }, 800);
        }}
        placeholder="Choose a username"
        value={value}
      />
    </Field>
  );
}
