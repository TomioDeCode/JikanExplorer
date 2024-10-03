// import MainBox from "@/components/ellements/MainBox";
import CommunityBox from "@/components/ellements/CommunityBox";
import NavBox from "@/components/ellements/NavBox";
// import RightBox from "@/components/ellements/RightBox";
import React from "react";

const Page = () => {
  return (
    <div className="flex h-screen bg-secondary-foreground">
      <div className="bg-foreground w-[20%] p-3">
        <NavBox />
      </div>
      <div className="bg-accent-foreground w-[80%]">
        <CommunityBox />
      </div>
      {/* <div className="bg-foreground w-[30%] p-5">
        <RightBox />
      </div> */}
    </div>
  );
};

export default Page;
