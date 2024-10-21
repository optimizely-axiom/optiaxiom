import {
  useSelect as useSelectDownshift,
  type UseSelectProps,
} from "downshift";

import { usePortalPatch } from "./usePortalPatch";

export { type UseSelectProps };

export function useSelect<T>(props: UseSelectProps<T>) {
  return useSelectDownshift({
    ...props,
    ...usePortalPatch(props),
  });
}
