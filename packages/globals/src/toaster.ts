import type { ReactElement, RefObject, useSyncExternalStore } from "react";

type ToastItem = {
  id: string;
  open: boolean;
  ref: RefObject<HTMLElement>;
  toast: ReactElement | (ToastOptions & { title: string });
};

type ToastOptions = {
  action?: string;
  onAction?: () => void;
  type?: "danger" | "information" | "neutral" | "success" | "warning";
};

const EMPTY: ToastItem[] = [];

let id = 1;
const genId = () => {
  return "t" + id++;
};

type Toaster = {
  clear: () => void;
  create: (
    ...args: [message: string, options?: ToastOptions] | [toast: ReactElement]
  ) => string;
  remove: (id: string) => void;
  store: Parameters<typeof useSyncExternalStore<ToastItem[]>>;
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

    create: (...args) => {
      const toast =
        typeof args[0] === "string"
          ? {
              ...args[1],
              title: args[0],
            }
          : args[0];
      const id = genId();

      queue = queue.then(async () => {
        const item = {
          id,
          open: true,
          ref: { current: null },
          toast,
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

const waitForAnimation = async (element?: HTMLElement | null) => {
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await Promise.allSettled(
    typeof element?.getAnimations === "function"
      ? element?.getAnimations().map((animation) => animation.finished)
      : [Promise.resolve()],
  );
};

export const toaster = createToaster();
