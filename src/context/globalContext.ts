import { createContext, useContext } from "react";

export type GlobalContent = {
    isMobile: boolean;
  };
  
  export const MyGlobalContext = createContext<GlobalContent>({
    isMobile: false,
  });
  
  export const useGlobalContext = () => useContext(MyGlobalContext);