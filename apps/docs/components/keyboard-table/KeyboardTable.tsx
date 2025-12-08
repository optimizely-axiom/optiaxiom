import { Box, Group, Kbd, type KbdProps } from "@optiaxiom/react";
import { compileMdx } from "nextra/compile";
import { MDXRemote } from "nextra/mdx-remote";
import { type ReactNode } from "react";

import { Table, Td, Th, Thead, Tr } from "../table";

export type KeyboardInteraction = {
  description: ReactNode;
  keys:
    | string
    | string[]
    | { key: string; modifiers?: KbdProps["modifiers"] }[];
};

export function KeyboardTable({
  interactions,
}: {
  interactions: KeyboardInteraction[];
}) {
  return (
    <Table>
      <Thead>
        <tr>
          <Th>Key</Th>
          <Th>Description</Th>
        </tr>
      </Thead>
      <tbody>
        {interactions.map(async (interaction, index) => (
          <Tr key={index}>
            <Td>
              <KeyCell keys={interaction.keys} />
            </Td>
            <Td>
              {typeof interaction.description === "string" ? (
                <MDXRemote
                  compiledSource={await compileMdx(interaction.description)}
                  components={{
                    p: ({ ...props }) => (
                      <Box asChild>
                        <p {...props} />
                      </Box>
                    ),
                  }}
                />
              ) : (
                interaction.description
              )}
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}

function KeyCell({ keys }: { keys: KeyboardInteraction["keys"] }) {
  const keyArray = Array.isArray(keys) ? keys : [keys];

  return (
    <Group flexWrap="wrap" gap="8" style={{ width: 160 }}>
      {keyArray.map((key, i) => {
        if (typeof key === "string") {
          // Check for range notation (e.g., "A - Z")
          const rangeMatch = key.match(/^(.+?)\s*-\s*(.+)$/);
          if (rangeMatch) {
            const [, start, end] = rangeMatch;
            return (
              <>
                <Kbd key={`${i}-start`}>{start.trim()}</Kbd> -{" "}
                <Kbd key={`${i}-end`}>{end.trim()}</Kbd>
              </>
            );
          }
          return <Kbd key={i}>{key}</Kbd>;
        }

        return (
          <Kbd key={i} modifiers={key.modifiers}>
            {key.key}
          </Kbd>
        );
      })}
    </Group>
  );
}
