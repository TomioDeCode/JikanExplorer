import NavBox from "@/components/ellements/NavBox";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  return (
    <div className="flex h-screen bg-secondary-foreground">
      <div className="bg-foreground w-[20%] p-3">
        <NavBox />
      </div>
      <div className="bg-accent-foreground w-[80%] p-5">{props.children}</div>
    </div>
  );
};

export default layout;
