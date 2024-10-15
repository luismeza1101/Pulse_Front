"use client";

import { UserProvider } from "@contexts/userContext";

const mainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
        <div>{children}</div>
    </UserProvider>
  );
};

export default mainLayout;
