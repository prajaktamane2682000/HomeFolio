"use client";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";

const GlobalContext = createContext();

//create provider

export function GlobalProvider({ children }) {
  const [unreadCount, setUnReadCount] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUnReadCount(res.count);
      });
    }
  }, [getUnreadMessageCount, session]);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnReadCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
