import React, { ReactNode } from "react";

type IconProps = {
  icon: ReactNode;
};

const CommunityIcon = ({ icon }: IconProps) => {
  return <span>{icon}</span>;
};

export default CommunityIcon;
