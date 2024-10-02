import NavBox from "@/components/ellements/NavBox";
import RightBox from "@/components/ellements/RightBox";
import SeachMain from "@/components/ellements/SeachMain";
import React from "react";

const Page = () => {
  return (
    <div className="flex h-screen bg-secondary-foreground">
      <div className="bg-foreground w-[20%] p-3">
        <NavBox />
      </div>
      <div className="bg-accent-foreground w-[50%] p-5">
        <SeachMain />
      </div>
      <div className="bg-foreground w-[30%] p-5">
        <RightBox />
      </div>
    </div>
  );
};

export default Page;
