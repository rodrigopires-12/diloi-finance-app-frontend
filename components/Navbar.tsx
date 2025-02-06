"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useScreen } from "@/contexts/screen-size-context";
import { Menu } from "@mui/icons-material";
import UserMenu from "./UserMenu";

interface NavbarProps {
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export type { NavbarProps };

const Navbar = () => {
  const { isSmallScreen } = useScreen();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  return (
    <nav
      className={`flex w-full items-center px-4 z-40 text-white ${
        isSmallScreen
          ? "h-14 bg-gray-800 border-b border-b-1 border-primary-purple"
          : "h-16 bg-primary-purple"
      }`}
    >
      {isSmallScreen ? (
        <div
          id="mobile-links"
          className="flex w-full justify-center items-center gap-2"
        >
          <div id="menu-container" className="absolute left-4">
            <Menu
              sx={{ fill: "white", cursor: "pointer" }}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            />
            <UserMenu isOpen={isUserMenuOpen} setIsOpen={setIsUserMenuOpen} />
          </div>
          <Link href="/chat" className="text-white text-xl flex items-center">
            <Image
              src="/diloi-finance-logo.png" // Path to your image
              alt="Diloi Finance Logo"
              width={40} // Adjust width and height as needed
              height={40}
              className="mr-2"
            />
          </Link>
        </div>
      ) : (
        <div
          id="navbar-container"
          className="flex w-full items-center justify-between gap-2"
        >
          <Link href="/chat" className="text-white text-xl flex items-center">
            <Image
              src="/diloi-finance-logo.png" // Path to your image
              alt="Diloi Finance Logo"
              width={40} // Adjust width and height as needed
              height={40}
              className="mr-2"
            />
          </Link>
          <div
            id="navbar-links"
            className="w-full flex justify-end items-center"
          >
            <Link
              href="/dashboard"
              className="mr-10 cursor-pointer text-white hover:scale-[1.03] hover:bg-[#645bfa] rounded-lg transition-all duration-300 p-1.5 leading-4"
            >
              Dashboard
            </Link>
            <Link
              href="/earnings"
              className="mr-10 cursor-pointer text-white hover:scale-[1.03] hover:bg-[#645bfa] rounded-lg transition-all duration-300 p-1.5 leading-4"
            >
              Renda
            </Link>
            <Link
              href="/expenses"
              className="mr-6 cursor-pointer text-white hover:scale-[1.03] hover:bg-[#645bfa] rounded-lg transition-all duration-300 p-1.5 leading-4"
            >
              Despesas
            </Link>
            <Link
              href="/simulations"
              className="mr-6 cursor-pointer text-white hover:scale-[1.03] hover:bg-[#645bfa] rounded-lg transition-all duration-300 p-1.5 leading-4"
            >
              Simulações
            </Link>
          </div>
          <UserMenu isOpen={isUserMenuOpen} setIsOpen={setIsUserMenuOpen} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
