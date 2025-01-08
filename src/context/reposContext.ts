import { createContext } from "react";

interface ReposContextType {
  contextRepos: string | string[];
  setContextRepos: React.Dispatch<React.SetStateAction<string | string[]>>;
}

export const ReposContext = createContext<ReposContextType | undefined>(undefined);