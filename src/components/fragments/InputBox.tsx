import { BiFilter } from "react-icons/bi";
import { Input } from "../ui/input"; // Assuming Input is a custom component
import React from "react";

const InputBox = () => {
  return (
    <div className="flex items-center space-x-3 p-2 bg-gray-800 rounded-lg shadow-md max-w-md">
      <Input
        className="flex-1 p-2 rounded-md text-gray-900 focus:outline-none"
        placeholder="Search..."
      />
      <span className="flex items-center justify-center p-2 text-white bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600">
        <BiFilter size={24} />
      </span>
    </div>
  );
};

export default InputBox;
