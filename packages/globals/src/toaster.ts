import type { RefObject } from "react";

type ToastItem = {
  id: string;
  open: boolean;
  ref: RefObject<HTMLElement>;
  toast: ToastOptions & { title: string };
};

type ToastOptions = {
  action?: string;
  intent?: "danger" | "information" | "neutral" | "success" | "warning";
  onAction?: () => void;
  /**
   * @deprecated
   */
  type?: "danger" | "information" | "neutral" | "success" | "warning";
};

const EMPTY: ToastItem[] = [];

let id = 1;
const genId = () => {
  return "t" + id++;
};

type Toaster = {
  clear: () => void;
  create: (message: string, options?: ToastOptions) => string;
  remove: (id: string) => void;
  store: [
    subscribe: (onStoreChange: () => void) => () => void,
    getSnapshot: () => ToastItem[],
    getServerSnapshot?: () => ToastItem[],
  ];
};

export const createToaster = (): Toaster => {
  let snapshot: ToastItem[] = [];

  const listeners = new Set<() => void>();
  const emit = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  let queue = Promise.resolve();

  return {
    store: [
      (callback: () => void) => {
        listeners.add(callback);
        return () => listeners.delete(callback);
      },
      () => snapshot,
      () => EMPTY,
    ],

    clear: () => {
      snapshot = [];
      emit();
    },

    create: (message, options) => {
      const id = genId();

      queue = queue.then(async () => {
        const item = {
          id,
          open: true,
          ref: { current: null },
          toast: {
            ...options,
            title: message,
          },
        };
        snapshot = [...snapshot, item];
        emit();

        await waitForAnimation(item.ref.current);
      });

      return id;
    },

    remove: (id) => {
      queue = queue.then(async () => {
        snapshot = snapshot.map((item) =>
          item.id === id ? { ...item, open: false } : item,
        );
        emit();

        const item = snapshot.find((item) => item.id === id);
        await waitForAnimation(item?.ref.current);

        snapshot = snapshot.filter((item) => item.id !== id);
        emit();
      });
    },
  };
};

const waitForAnimation = async (element: HTMLElement | null | undefined) => {
  if (!element) {
    return;
  }

  await new Promise((resolve) => requestAnimationFrame(resolve));
  await Promise.allSettled(
    typeof element.getAnimations === "function"
      ? element.getAnimations().map((animation) => animation.finished)
      : [Promise.resolve()],
  );
};

export const toaster = createToaster();
