"use client"

import { createContext, useContext, useState } from "react";

type ManagerContextType = {
  isManager: boolean;
  setIsManager: (value: boolean) => void;
};

const ManagerContext = createContext<ManagerContextType>({
  isManager: false,
  setIsManager: () => {},
});

export const useManagerContext = () => useContext(ManagerContext);

export const ManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isManager, setIsManager] = useState(false);

  return (
    <ManagerContext.Provider value={{ isManager, setIsManager }}>
      {children}
    </ManagerContext.Provider>
  );
};
