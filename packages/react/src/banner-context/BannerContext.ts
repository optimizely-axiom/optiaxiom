import { createContext } from "@radix-ui/react-context";

export const [BannerContextProvider, useBannerContext] = createContext<{
  descriptionId?: string;
  labelId?: string;
}>("Banner");
