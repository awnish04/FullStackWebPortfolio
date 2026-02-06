"use client";

import React, { createContext, useContext, useState } from "react";

interface CursorContextType {
  cursorType: string;
  setCursorType: React.Dispatch<React.SetStateAction<string>>;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cursorType, setCursorType] = useState<string>("default");
  return (
    <CursorContext.Provider value={{ cursorType, setCursorType }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context)
    throw new Error("useCursor must be used within a CursorProvider");
  return context;
};
