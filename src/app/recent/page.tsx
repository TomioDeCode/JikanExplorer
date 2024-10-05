import RecentBox from "@/components/ellements/RecentBox";
import NavBox from "@/components/ellements/NavBox";
import React from "react";

const Page = () => {
  return (
    <div className="flex h-screen bg-secondary-foreground">
      <div className="bg-foreground w-[20%] p-3">
        <NavBox />
      </div>
      <div className="bg-accent-foreground w-[80%] p-5">
        <RecentBox />
      </div>
    </div>
  );
};

export default Page;
