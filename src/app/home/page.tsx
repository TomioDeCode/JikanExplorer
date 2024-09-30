import LogoContainer from "@/components/fragments/LogoContainer";
import NavLink from "@/components/fragments/NavLink";
import React from "react";
import {
  IoHomeOutline,
  IoServerOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";

const Page = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      <div className="bg-[#1E1E1E] w-[20%] p-5">
        <LogoContainer />
        <nav className="mt-10 flex flex-col space-y-4">
          <NavLink href="/home" text="Home">
            <IoHomeOutline />
          </NavLink>
          <NavLink href="/services" text="Services">
            <IoServerOutline />
          </NavLink>
          <NavLink href="/resume" text="Resume">
            <IoDocumentTextOutline />
          </NavLink>
        </nav>
      </div>
      <div className="bg-green-500 w-[50%] p-5">
        <h1 className="text-3xl text-white">Main Content Area</h1>
      </div>
      <div className="bg-red-500 w-[30%] p-5">
        <h2 className="text-2xl text-white">Right Sidebar</h2>
      </div>
    </div>
  );
};

export default Page;
