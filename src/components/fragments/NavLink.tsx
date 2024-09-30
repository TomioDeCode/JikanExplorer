"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import NavIcon from "./NavIcon";

interface NavLinkInterface {
  href: string;
  children: ReactNode;
  text: string;
}

const NavLink = ({ children, href, text }: NavLinkInterface) => {
  const pathName = usePathname();

  const isActive = href === pathName;

  return (
    <div>
      <Link
        href={href}
        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 
          ${
            isActive
              ? "text-primary bg-gray-800 shadow-lg"
              : "text-white hover:bg-gray-700"
          } 
          capitalize font-semibold`}
      >
        <NavIcon className="font-bold text-[32px]">{children}</NavIcon>
        <span className="text-[20px]">{text}</span>
      </Link>
    </div>
  );
};

export default NavLink;
