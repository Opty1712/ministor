import { createContext, type ReactNode } from "react";
import { rootStore, type RootStore } from "./RootStore";

export const StoreContext = createContext<RootStore | null>(null);

type StoreProviderProps = {
  children: ReactNode;
};

export function StoreProvider({ children }: StoreProviderProps) {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
}
