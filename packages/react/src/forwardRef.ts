import {
  type ReactNode,
  type Ref,
  type RefAttributes,
  forwardRef as reactForwardRef,
} from "react";

export function forwardRef<T, P = Record<string, never>>(
  render: (props: P, ref: Ref<T>) => ReactNode,
) {
  return reactForwardRef(render) as (props: P & RefAttributes<T>) => ReactNode;
}
