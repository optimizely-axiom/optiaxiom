import {
  Field,
  Input,
  Select,
  SelectContent,
  SelectTrigger,
  Switch,
} from "@optiaxiom/react";

import { ConditionEditor } from "./ConditionEditor";
import { JsonPropEditor } from "./JsonPropEditor";

export function PropEditor({
  dataKeys,
  name,
  onUpdate,
  prop,
  value,
}: {
  dataKeys?: string[];
  name: string;
  onUpdate: (value: unknown) => void;
  prop: {
    description?: string;
    optional: boolean;
    options?: string[];
    type: string;
  };
  value: unknown;
}) {
  if (name === "when" && dataKeys) {
    return (
      <Field label={name} required={!prop.optional}>
        <ConditionEditor
          dataKeys={dataKeys}
          onUpdate={onUpdate}
          value={value}
        />
      </Field>
    );
  }

  return (
    <Field
      // description={prop.description?.slice(0, 80)}
      label={name}
      required={!prop.optional}
    >
      {prop.type === "string" && (
        <Input
          onValueChange={onUpdate}
          placeholder={prop.description?.slice(0, 40)}
          value={String(value ?? "")}
        />
      )}

      {prop.type === "number" && (
        <Input
          onValueChange={(value) =>
            onUpdate(value === "" ? undefined : Number(value))
          }
          type="number"
          value={value != null ? String(value) : ""}
        />
      )}

      {prop.type === "boolean" && (
        <Switch
          checked={Boolean(value)}
          onCheckedChange={(checked) => onUpdate(checked)}
        />
      )}

      {prop.type === "select" && prop.options && (
        <Select
          onValueChange={(val) =>
            onUpdate(val === "__none__" ? undefined : val)
          }
          options={[
            ...(prop.optional ? [{ label: "(none)", value: "__none__" }] : []),
            ...prop.options.map((opt) => ({ label: opt, value: opt })),
          ]}
          value={
            value != null ? String(value) : prop.optional ? "__none__" : ""
          }
        >
          <SelectTrigger w="full" />
          <SelectContent />
        </Select>
      )}

      {prop.type === "json" && (
        <JsonPropEditor onUpdate={onUpdate} value={value} />
      )}
    </Field>
  );
}
