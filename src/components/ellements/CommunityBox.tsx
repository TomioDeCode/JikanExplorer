import React from "react";
import CommunityCard from "../fragments/CommunityCard";
import { BsDiscord, BsTelegram, BsWhatsapp, BsInstagram } from "react-icons/bs";

const CommunityBox = () => {
  return (
    <div className="bg-gray-900 flex flex-wrap justify-evenly items-center gap-6 h-[100vh]">
      <CommunityCard href="#" title="Discord" icon={<BsDiscord size={100} />} />
      <CommunityCard href="#" title="Telegram" icon={<BsTelegram size={100} />} />
      <CommunityCard href="#" title="Whatsapp" icon={<BsWhatsapp size={100} />} />
      <CommunityCard href="#" title="Instagram" icon={<BsInstagram size={100} />} />
    </div>
  );
};

export default CommunityBox;
