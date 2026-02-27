import { useProteusValue } from "./useProteusValue";

export function ProteusValue({ path }: { path: string }) {
  return useProteusValue(path);
}

ProteusValue.displayName = "@optiaxiom/react/ProteusValue";
