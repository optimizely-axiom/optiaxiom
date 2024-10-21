import {
  useCombobox as useComboboxDownshift,
  type UseComboboxProps,
} from "downshift";

import { usePortalPatch } from "./usePortalPatch";

export { type UseComboboxProps };

export function useCombobox<T>(props: UseComboboxProps<T>) {
  return useComboboxDownshift({
    ...props,
    ...usePortalPatch(props),
  });
}
