"use client";

import React from "react";
import IconsBox from "../fragments/IconsBox";
import TopCard from "../fragments/TopCardAnime";
import { usePathname } from "next/navigation";
import TopMovieCard from "../fragments/TopCardMovie";

const RightBox = () => {
  const pathName = usePathname();

  const isPath = pathName === "/discovery"

  return (
    <div className="space-y-5 p-5 bg-gray-900 rounded-lg shadow-md max-w-md mx-auto">
      <div className="w-full">
        {isPath ? <IconsBox title="Search Animes" /> : <IconsBox title="Home" />}
      </div>
      {/* <div className="relative">
        <InputBox />
      </div> */}
      <div>{isPath ? <TopMovieCard /> : <TopCard />}</div>
    </div>
  );
};

export default RightBox;
