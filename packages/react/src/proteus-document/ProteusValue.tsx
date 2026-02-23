import { type ProteusValueProps } from "./schemas";
import { useProteusValue } from "./useProteusValue";

export function ProteusValue({ path }: ProteusValueProps) {
  return useProteusValue(path);
}

ProteusValue.displayName = "@optiaxiom/react/ProteusValue";
