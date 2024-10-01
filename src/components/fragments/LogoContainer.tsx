import { AiOutlinePlayCircle } from "react-icons/ai";
import React from "react";

const LogoContainer = () => {
  return (
    <div className="flex justify-start items-center mt-1 space-x-3 transition-transform duration-300 transform hover:scale-105">
      <AiOutlinePlayCircle className="text-3xl text-primary" />{" "}
      <span className="text-white text-2xl font-bold">NENIME</span>
    </div>
  );
};

export default LogoContainer;
