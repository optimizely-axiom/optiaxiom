import { createContext, type MutableRefObject, useContext } from "react";

export const ProteusChartContext = createContext<
  MutableRefObject<HTMLDivElement | null> | undefined
>(undefined);

export const useProteusChartContainer = () => useContext(ProteusChartContext);
