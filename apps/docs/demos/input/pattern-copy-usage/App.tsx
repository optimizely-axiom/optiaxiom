"use client";

import { IconCheck, IconCopy } from "@optiaxiom/icons";
import { Button, Field, Input } from "@optiaxiom/react";
import { useState } from "react";

const apiKey = "sk-1234-5678-abcd-efgh";

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
            onClick={async () => {
              await navigator.clipboard.writeText(apiKey);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            rounded="full"
            size="sm"
          />
        }
        defaultValue={apiKey}
        readOnly
      />
    </Field>
  );
}
