import React from "react";
// import TrendCard from "../fragments/TrendCard";
// import ContinueCard from "../fragments/ContinueCard";
import RecomendCard from "../fragments/RecomendCard";

const RecentBox = () => {
  return (
    <div className="overflow-y-auto max-h-[95vh] space-y-3 scrollbar-hide">
      <div className="p-4 bg-gray-800 rounded-xl">
        <RecomendCard />
      </div>
    </div>
  );
};

export default RecentBox;
