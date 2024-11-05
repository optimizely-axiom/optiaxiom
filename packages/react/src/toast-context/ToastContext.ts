import { createContext } from "@radix-ui/react-context";

export const [ToastContextProvider, useToastContext] = createContext<{
  onOpenChange: (open: boolean) => void;
  open: boolean;
}>("ToastProvider");
