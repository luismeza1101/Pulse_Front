'use client'

import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface UserContextType {
    userEmail: string | null
    userName: string | null
    userID: string | null
    userImg: string | null
    setUserEmail: (email: string | null) => void
    setUserName: (name: string | null) => void
    setUserID: (id: string | null) => void
    setUserImg: (user_img: string | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [userName, setUserName] = useState<string | null>(null)
    const [userID, setUserID] = useState<string | null>(null)
    const [userImg, setUserImg] = useState<string | null>(null)
    
      const value = useMemo(() => ({
        userName,
        userEmail,
        setUserName,
        setUserEmail,
        userID, 
        setUserID,
        userImg,
        setUserImg
      }), [userName, userEmail, userID, userImg]);
    
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useUser must be used within a UserProvider");
    }
    return context;
  };

