import React from "react";
import NavLink from "../fragments/NavLink";
import NavTitle from "../fragments/NavTitle";

import { AiOutlineHome, AiOutlineDiscord } from "react-icons/ai";
import { BsCompass, BsClock, BsFolder2Open, BsDownload } from "react-icons/bs";
import { TbSettings, TbHelpHexagon, TbLogout } from "react-icons/tb";
import LogoContainer from "../fragments/LogoContainer";
import { Button } from "../ui/button";

const NavContainer = () => {
  return (
    <nav className="mt-5 flex flex-col space-y-6 px-4">
      <LogoContainer />
      {/* Home Section */}
      <div className="space-y-2">
        <NavTitle title="HOME" />
        <NavLink href="/home" text="Home">
          <AiOutlineHome className="text-lg" />
        </NavLink>
        <NavLink href="/discovery" text="Discovery">
          <BsCompass className="text-lg" />
        </NavLink>
        <NavLink href="/community" text="Community">
          <AiOutlineDiscord className="text-lg" />
        </NavLink>
      </div>

      {/* Library Section */}
      <div className="space-y-2">
        <NavTitle title="LIBRARY" />
        <NavLink href="/recent" text="Recent">
          <BsClock className="text-lg" />
        </NavLink>
        <NavLink href="/collection" text="My Collection">
          <BsFolder2Open className="text-lg" />
        </NavLink>
        <NavLink href="/download" text="Download">
          <BsDownload className="text-lg" />
        </NavLink>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-600 my-4" />

      {/* Settings and Help Section */}
      <div className="space-y-2">
        <NavLink href="/settings" text="Settings">
          <TbSettings className="text-lg" />
        </NavLink>
        <NavLink href="/help" text="Help">
          <TbHelpHexagon className="text-lg" />
        </NavLink>
      </div>

      {/* Logout Button */}
      <div className="">
        <Button className="mt-6 w-full py-2 flex items-center justify-center space-x-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300">
          <TbLogout className="text-lg" />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  );
};

export default NavContainer;
