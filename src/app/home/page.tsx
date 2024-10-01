import NavContainer from "@/components/ellements/NavContainer";
import React from "react";

const Page = () => {
  return (
    <div className="flex h-screen bg-secondary-foreground">
      <div className="bg-foreground w-[20%] p-3">
        <NavContainer />
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
