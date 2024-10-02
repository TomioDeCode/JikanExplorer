import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { BsBoundingBox } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";

type props = {
  title: string;
};

const IconsBox = (props: props) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
      {/* User Name */}
      <div className="text-white text-lg font-semibold">{props.title}</div>

      {/* Icons Section */}
      <div className="flex items-center space-x-4">
        {/* Box Icon */}
        <div className="flex items-center justify-center p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition duration-200">
          <BsBoundingBox size={24} />
        </div>

        {/* Notifications Icon */}
        <div className="relative">
          <span className="flex items-center justify-center p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition duration-200">
            <IoMdNotificationsOutline size={24} />
          </span>
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            3
          </span>
        </div>

        {/* User Avatar */}
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="w-[40px] h-[40px] rounded-full border-2 border-gray-700"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default IconsBox;
