import Image from "next/image";
import React from "react";

const LogoContainer = () => {
  return (
    <div className="flex justify-center items-center mt-5 space-x-3 transition-transform duration-300 transform hover:scale-105">
      <Image
        src="/image/logo.png"
        alt="Nenime Logo"
        width={50}
        height={50}
        className="rounded-full shadow-md"
      />
      <span className="text-white text-[40px] font-bold">Nenime</span>
    </div>
  );
};

export default LogoContainer;
