import type { FactSetElement } from "./types";

import { Box } from "../box";
import { Group } from "../group";
import { Text } from "../text";

export type AdaptiveCardFactSetProps = {
  /**
   * The fact set element configuration
   */
  element: FactSetElement;
};

export function AdaptiveCardFactSet({ element }: AdaptiveCardFactSetProps) {
  return (
    <Box>
      {element.facts?.map((fact, index) => (
        <Group key={index} mb="4">
          <Box w="224">
            <Text color="fg.secondary" fontWeight="500">
              {fact.title}:
            </Text>
          </Box>
          <Text color="fg.default">{fact.value}</Text>
        </Group>
      ))}
    </Box>
  );
}

AdaptiveCardFactSet.displayName = "@optiaxiom/react/AdaptiveCardFactSet";
