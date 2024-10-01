import React from "react";

type TitleProps = {
  title: string;
};

const NavTitle = (props: TitleProps) => {
  return (
    <div className="flex items-center justify-start ml-0 mb-2">
      <div className="text-[#807C7C] text-[18px] font-medium">
        <span>{props.title}</span>
      </div>
    </div>
  );
};

export default NavTitle;
