"use client";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { ScreenProvider } from "@/contexts/screen-size-context";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>Diloi Finance App</title>
        <meta name="description" content="Diloi Finance App" />
      </head>
      <body className="h-[calc(100dvh)] font-roboto">
        <ScreenProvider>
          {children}
          <ToastContainer limit={1} />
        </ScreenProvider>
      </body>
    </html>
  );
};

export default RootLayout;
