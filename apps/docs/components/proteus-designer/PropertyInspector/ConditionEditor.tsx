import {
  Box,
  Button,
  Input,
  Select,
  SelectContent,
  SelectTrigger,
  Separator,
  Text,
} from "@optiaxiom/react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useCallback, useMemo } from "react";

const OPERATORS = ["==", "!=", "<", "<=", ">", ">=", "!!"] as const;

interface ConditionGroup {
  rows: ConditionRow[];
}

interface ConditionRow {
  field: string;
  operator: Operator;
  value: string;
}

type Operator = (typeof OPERATORS)[number];

export function ConditionEditor({
  dataKeys,
  onUpdate,
  value,
}: {
  dataKeys: string[];
  onUpdate: (value: unknown) => void;
  value: unknown;
}) {
  const groups = useMemo(() => parseCondition(value), [value]);

  const fieldOptions = useMemo(
    () => dataKeys.map((key) => ({ label: key, value: `/${key}` })),
    [dataKeys],
  );

  const operatorOptions = OPERATORS.map((op) => ({
    label: op === "!!" ? "is truthy" : op,
    value: op,
  }));

  const defaultField = fieldOptions[0]?.value ?? "/field_name";

  const updateRow = useCallback(
    (groupIndex: number, rowIndex: number, patch: Partial<ConditionRow>) => {
      const next = groups.map((group, gi) =>
        gi === groupIndex
          ? {
              rows: group.rows.map((row, ri) =>
                ri === rowIndex ? { ...row, ...patch } : row,
              ),
            }
          : group,
      );
      onUpdate(serializeCondition(next));
    },
    [groups, onUpdate],
  );

  const addRowToGroup = useCallback(
    (groupIndex: number) => {
      const next = groups.map((group, gi) =>
        gi === groupIndex
          ? {
              rows: [
                ...group.rows,
                { field: defaultField, operator: "==" as Operator, value: "" },
              ],
            }
          : group,
      );
      onUpdate(serializeCondition(next));
    },
    [defaultField, groups, onUpdate],
  );

  const removeRow = useCallback(
    (groupIndex: number, rowIndex: number) => {
      const next = groups
        .map((group, gi) =>
          gi === groupIndex
            ? { rows: group.rows.filter((_, ri) => ri !== rowIndex) }
            : group,
        )
        .filter((group) => group.rows.length > 0);
      onUpdate(next.length > 0 ? serializeCondition(next) : undefined);
    },
    [groups, onUpdate],
  );

  const addOrGroup = useCallback(() => {
    const next = [
      ...groups,
      {
        rows: [{ field: defaultField, operator: "==" as Operator, value: "" }],
      },
    ];
    onUpdate(serializeCondition(next));
  }, [defaultField, groups, onUpdate]);

  return (
    <Box display="flex" flexDirection="column" gap="4">
      {groups.map((group, gi) => (
        <Box key={gi}>
          {gi > 0 && (
            <Box py="4">
              <Separator>
                <Text color="fg.tertiary" fontSize="xs">
                  OR
                </Text>
              </Separator>
            </Box>
          )}

          <Box
            border={groups.length > 1 ? "1" : undefined}
            borderColor="border.secondary"
            display="flex"
            flexDirection="column"
            gap="4"
            p={groups.length > 1 ? "8" : undefined}
            rounded={groups.length > 1 ? "sm" : undefined}
          >
            {group.rows.map((row, ri) => (
              <Box key={ri}>
                {ri > 0 && (
                  <Text
                    color="fg.tertiary"
                    fontSize="xs"
                    py="2"
                    textAlign="center"
                  >
                    AND
                  </Text>
                )}
                <ConditionRowEditor
                  fieldOptions={fieldOptions}
                  onRemove={() => removeRow(gi, ri)}
                  onUpdate={(patch) => updateRow(gi, ri, patch)}
                  operatorOptions={operatorOptions}
                  row={row}
                  showLabels={gi === 0 && ri === 0}
                />
              </Box>
            ))}

            <Button
              alignSelf="start"
              appearance="subtle"
              icon={<IconPlus size={14} />}
              onClick={() => addRowToGroup(gi)}
              size="sm"
            >
              AND
            </Button>
          </Box>
        </Box>
      ))}

      <Button
        alignSelf="start"
        appearance="subtle"
        icon={<IconPlus size={14} />}
        onClick={addOrGroup}
        size="sm"
      >
        {groups.length > 0 ? "OR" : "Add condition"}
      </Button>
    </Box>
  );
}

function ConditionRowEditor({
  fieldOptions,
  onRemove,
  onUpdate,
  operatorOptions,
  row,
  showLabels,
}: {
  fieldOptions: { label: string; value: string }[];
  onRemove: () => void;
  onUpdate: (patch: Partial<ConditionRow>) => void;
  operatorOptions: { label: string; value: string }[];
  row: ConditionRow;
  showLabels: boolean;
}) {
  return (
    <Box alignItems="end" display="flex" gap="4">
      <Box flex="1">
        {showLabels && (
          <Text color="fg.tertiary" fontSize="xs" pb="2">
            Field
          </Text>
        )}
        {fieldOptions.length > 0 &&
        fieldOptions.find((f) => f.value === row.field) ? (
          <Select
            onValueChange={(val) => onUpdate({ field: val })}
            options={fieldOptions}
            value={row.field}
          >
            <SelectTrigger w="full" />
            <SelectContent />
          </Select>
        ) : (
          <Input
            onValueChange={(val) => onUpdate({ field: val })}
            placeholder="/field"
            value={row.field}
          />
        )}
      </Box>

      <Box flex="none">
        {showLabels && (
          <Text color="fg.tertiary" fontSize="xs" pb="2">
            Op
          </Text>
        )}
        <Select
          onValueChange={(val) => onUpdate({ operator: val as Operator })}
          options={operatorOptions}
          value={row.operator}
        >
          <SelectTrigger asChild>
            <Button />
          </SelectTrigger>
          <SelectContent />
        </Select>
      </Box>

      {row.operator !== "!!" && (
        <Box flex="1">
          {showLabels && (
            <Text color="fg.tertiary" fontSize="xs" pb="2">
              Value
            </Text>
          )}
          <Input
            onValueChange={(val) => onUpdate({ value: val })}
            placeholder="value"
            value={row.value}
          />
        </Box>
      )}

      <Button
        appearance="subtle"
        icon={<IconTrash size={14} />}
        onClick={onRemove}
        size="sm"
      />
    </Box>
  );
}

function extractField(val: unknown): string {
  if (
    typeof val === "object" &&
    val !== null &&
    "$type" in val &&
    (val as Record<string, unknown>).$type === "Value" &&
    "path" in val
  ) {
    return String((val as Record<string, unknown>).path);
  }
  return String(val ?? "");
}

function extractLiteral(val: unknown): string {
  if (
    typeof val === "object" &&
    val !== null &&
    "$type" in val &&
    (val as Record<string, unknown>).$type === "Value"
  ) {
    return String((val as Record<string, unknown>).path ?? "");
  }
  return String(val ?? "");
}

function parseAtomicCondition(obj: Record<string, unknown>): ConditionRow[] {
  for (const op of OPERATORS) {
    if (!(op in obj)) continue;

    if (op === "!!") {
      return [{ field: extractField(obj["!!"]), operator: "!!", value: "" }];
    }

    const operands = obj[op];
    if (!Array.isArray(operands) || operands.length < 2) continue;

    return [
      {
        field: extractField(operands[0]),
        operator: op,
        value: extractLiteral(operands[1]),
      },
    ];
  }

  return [];
}

function parseCondition(value: unknown): ConditionGroup[] {
  if (value == null) return [];

  // Array of conditions (AND at top level, per Show `when` semantics)
  if (Array.isArray(value)) {
    const rows = value.flatMap((v) => {
      if (typeof v !== "object" || v === null) return [];
      return parseAtomicCondition(v as Record<string, unknown>);
    });
    return rows.length > 0 ? [{ rows }] : [];
  }

  if (typeof value !== "object") return [];
  const obj = value as Record<string, unknown>;

  // OR grouping: { or: [...] }
  if ("or" in obj && Array.isArray(obj.or)) {
    return (obj.or as unknown[])
      .map((item) => {
        if (typeof item !== "object" || item === null) return { rows: [] };
        const itemObj = item as Record<string, unknown>;

        // Nested AND: { and: [atomic, atomic] }
        if ("and" in itemObj && Array.isArray(itemObj.and)) {
          const rows = (itemObj.and as unknown[]).flatMap((a) => {
            if (typeof a !== "object" || a === null) return [];
            return parseAtomicCondition(a as Record<string, unknown>);
          });
          return { rows };
        }

        // Single atomic inside OR
        return { rows: parseAtomicCondition(itemObj) };
      })
      .filter((group) => group.rows.length > 0);
  }

  // Single atomic condition
  const rows = parseAtomicCondition(obj);
  return rows.length > 0 ? [{ rows }] : [];
}

function serializeCondition(groups: ConditionGroup[]): unknown {
  if (groups.length === 0) return undefined;

  // Single group with no OR needed
  if (groups.length === 1) {
    const rows = groups[0].rows;
    const conditions = rows.map(serializeRow);
    if (conditions.length === 1) return conditions[0];
    return conditions;
  }

  // Multiple groups → OR
  return {
    or: groups.map((group) => {
      const conditions = group.rows.map(serializeRow);
      if (conditions.length === 1) return conditions[0];
      return { and: conditions };
    }),
  };
}

function serializeRow(row: ConditionRow): unknown {
  const fieldRef = { $type: "Value", path: row.field };

  if (row.operator === "!!") {
    return { "!!": fieldRef };
  }

  return { [row.operator]: [fieldRef, row.value] };
}
