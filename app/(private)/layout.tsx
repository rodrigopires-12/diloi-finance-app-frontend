"use client";

import AuthProvider from "@/contexts/user-context";
import { Navbar } from "@/components";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <div className="h-full flex flex-col">
        <Navbar />
        {children}
      </div>
    </AuthProvider>
  );
};

export default RootLayout;
