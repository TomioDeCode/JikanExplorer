import React from "react";
import IconsBox from "../fragments/IconsBox";
import InputBox from "../fragments/InputBox";
import TopCard from "../fragments/TopCard";

const RightBox = () => {
  return (
    <div className="space-y-8 p-5 bg-gray-900 rounded-lg shadow-md max-w-md mx-auto">
      <div className="w-full">
        <IconsBox />
      </div>
      <div className="relative">
        <InputBox />
      </div>
      <div>
        <TopCard />
      </div>
    </div>
  );
};

export default RightBox;
