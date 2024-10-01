import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { BsBoundingBox } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";

const IconsBox = () => {
  return (
    <div className="flex items-center justify-end space-x-6 p-4 bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center justify-center p-2 rounded-full bg-gray-700 text-white">
        <BsBoundingBox size={24} />
      </div>
      <div className="relative">
        <span className="flex items-center justify-center p-2 rounded-full bg-gray-700 text-white">
          <IoMdNotificationsOutline size={24} />
        </span>
        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 text-xs font-bold text-white bg-red-500 rounded-full">
          3
        </span>
      </div>
      <div className="flex items-center space-x-2 text-white">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" className="w-[40px] rounded-full" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default IconsBox;
