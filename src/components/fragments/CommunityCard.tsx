import Link from "next/link";
import CommunityIcon from "./CommunityIcon";
import React, { ReactNode } from "react";

type CardProps = {
  title: string;
  icon: ReactNode;
  href: string;
};

const CommunityCard = ({ title, icon, href }: CardProps) => {
  return (
    <Link href={href}>
      <div className="w-[550px] h-72 bg-primary rounded-lg shadow-lg flex items-center justify-center transition-transform transform hover:scale-105">
        <div className="flex flex-col items-center justify-center text-white">
          <div className="flex flex-col justify-center items-center">
            <span className="text-4xl">
              <CommunityIcon icon={icon} />
            </span>
            <span className="text-2xl font-semibold tracking-widest">
              {title}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CommunityCard;
