"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type TeacherModeContextType = {
  isTeacherMode: boolean;
  toggleTeacherMode: () => void;
  setTeacherMode: (value: boolean) => void;
};

const TeacherModeContext = createContext<TeacherModeContextType | undefined>(
  undefined
);

export const TeacherModeProvider = ({ children }: { children: ReactNode }) => {
  const [isTeacherMode, setIsTeacherMode] = useState(false);

  const toggleTeacherMode = () => setIsTeacherMode((prev) => !prev);
  const setTeacherMode = (value: boolean) => setIsTeacherMode(value);

  return (
    <TeacherModeContext.Provider
      value={{ isTeacherMode, toggleTeacherMode, setTeacherMode }}
    >
      {children}
    </TeacherModeContext.Provider>
  );
};

export const useTeacherMode = () => {
  const context = useContext(TeacherModeContext);
  if (!context)
    throw new Error("useTeacherMode must be used within TeacherModeProvider");
  return context;
};
