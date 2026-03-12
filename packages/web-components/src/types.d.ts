export type ChangeEventHandler<_T = Element> = (event: Event) => void;
export type FocusEventHandler<_T = Element> = (event: FocusEvent) => void;

export type FocusOutsideEvent = CustomEvent<{
  originalEvent: FocusEvent;
}>;
export type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;

export type ResponsiveArray<T> = [T, T, T] | [T, T] | [T];
export type ResponsiveObject<T> = { base?: T; md?: T; sm?: T };

export type SwipeEvent = CustomEvent<{
  delta: {
    x: number;
    y: number;
  };
  originalEvent: PointerEvent;
}>;

export type Toaster = unknown;
