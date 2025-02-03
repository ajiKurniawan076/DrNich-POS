import React from "react";

import axios from "axios";

function galeriCard({ item }) {
  return (
    <div className="w-screen h-[100px] flex items-center border border-[#efefef] lg:w-[433px] lg:mx-[120px]">
      <img
        className="w-20 h-20 rounded-[5px] ml-6 opacity-90"
        src={item.thumbnail}
        alt="Thumbnail"
      />
      <div className="ml-3 flex flex-col">
        <span className="text-[#464646] text-sm font-normal font-SFPro leading-[25px] tracking-tight">
          {item.judul}
        </span>
        <div className="flex items-center mt-2 text-[#bdbdbd] text-sm font-normal font-SFPro leading-[25px] tracking-tight">
          <span>{item.deskripsi}</span>
        </div>
        <div className="flex items-center mt-2 text-[#bdbdbd] text-sm font-normal font-SFPro leading-[25px] tracking-tight">
          <span>{item.sosmed}</span>
          <div className="w-[5px] h-[5px] mx-2 bg-[#efefef] rounded-full"></div>
          <span>{item.channel}</span>
        </div>
      </div>
    </div>
  );
}

export default galeriCard;
