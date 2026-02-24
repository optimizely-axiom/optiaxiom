"use client";

import { Button, Field, Input } from "@optiaxiom/react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";

export function App() {
  const [copied, setCopied] = useState(false);

  return (
    <Field label="API Key">
      <Input
        addonAfter={
          <Button
            appearance="subtle"
            aria-label={copied ? "Copied" : "Copy to clipboard"}
            icon={copied ? <IconCheck /> : <IconCopy />}
            onClick={async (event) => {
              await navigator.clipboard.writeText(event.currentTarget.value);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            rounded="full"
            size="sm"
          />
        }
        data-copy-input=""
        defaultValue="sk-1234-5678-abcd-efgh"
        readOnly
      />
    </Field>
  );
}
