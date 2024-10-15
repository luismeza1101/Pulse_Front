"use client";

import { UserProvider } from "@contexts/userContext";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
        <div>{children}</div>
    </UserProvider>
  );
};

export default MainLayout;
