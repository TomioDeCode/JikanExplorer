import React, { ReactNode } from "react";

interface NavInterface {
  children: ReactNode;
  className?: string;
}

const NavIcon = ({ children, className }: NavInterface) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full p-2 transition-transform duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default NavIcon;
