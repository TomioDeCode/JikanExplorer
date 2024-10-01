import MainBox from "@/components/ellements/MainBox";
import NavBox from "@/components/ellements/NavBox";
import React from "react";

const Page = () => {
  return (
    <div className="flex h-screen bg-secondary-foreground">
      <div className="bg-foreground w-[20%] p-3">
        <NavBox />
      </div>
      <div className="bg-accent-foreground w-[50%] p-5">
        <MainBox />
      </div>
      <div className="bg-foreground w-[30%] p-5">
        <h2 className="text-2xl text-white">Right Sidebar</h2>
      </div>
    </div>
  );
};

export default Page;
