import {
  type ContextType,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

import type { DialogKitContext } from "./DialogKitContext";

import {
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "../alert-dialog";

type DialogItem = ContextType<typeof DialogKitContext> & {
  element: ReactNode;
  open: boolean;
};

type DialogOptions = Pick<DialogItem, "onDismiss">;

const EMPTY: DialogItem[] = [];

let id = 1;
const genId = () => {
  return "t" + id++;
};

type DialogKit = {
  clear: () => void;
  confirm: (
    element:
      | ReactElement
      | {
          action: string;
          body: string;
          header: string;
        },
  ) => Promise<boolean>;
  create: (element: ReactNode, options?: DialogOptions) => string;
  remove: (id: string) => void;
  store: [
    subscribe: (onStoreChange: () => void) => () => void,
    getSnapshot: () => DialogItem[],
    getServerSnapshot?: () => DialogItem[],
  ];
};

/**
 * Create a dialog kit instance for managing dialogs programmatically.
 *
 * @experimental
 */
export const createDialogKit = (): DialogKit => {
  let snapshot: DialogItem[] = [];

  const listeners = new Set<() => void>();
  const emit = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  const create = (element: ReactNode, options?: DialogOptions) => {
    const id = genId();

    snapshot = [
      {
        ...options,
        element,
        id,
        onClose: () => {
          snapshot = snapshot.filter((item) => item.id !== id);
          emit();
        },
        open: true,
      },
      ...snapshot,
    ];
    emit();

    return id;
  };
  const remove = (id: string) => {
    snapshot = snapshot.map((item) =>
      item.id === id ? { ...item, open: false } : item,
    );
    emit();
  };

  return {
    store: [
      (callback) => {
        listeners.add(callback);
        return () => listeners.delete(callback);
      },
      () => snapshot,
      () => EMPTY,
    ],

    clear: () => {
      for (const item of snapshot) {
        remove(item.id);
      }
    },
    confirm: async (element) => {
      return new Promise((resolve) => {
        create(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          isValidElement<any>(element) ? (
            element
          ) : (
            <AlertDialogContent>
              <AlertDialogHeader>{element.header}</AlertDialogHeader>
              <AlertDialogBody>{element.body}</AlertDialogBody>
              <AlertDialogFooter>
                <AlertDialogCancel />
                <AlertDialogAction>{element.action}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          ),
          {
            onDismiss: (_event, reason) => {
              resolve(reason === "action");
            },
          },
        );
      });
    },
    create,
    remove,
  };
};

export const dialogkit = createDialogKit();
