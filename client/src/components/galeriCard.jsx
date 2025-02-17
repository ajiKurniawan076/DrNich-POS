import React from "react";

import axios from "axios";
import playButton from "./playButton-circle.svg";

function galeriCard({ item }) {
  return (
    <div className="w-screen h-fit flex items-center justify-start border py-2 border-[#efefef] lg:w-[433px] rounded-[10px]">
      <div className="relative max-w-32 max-h-32 ml-4 ">
        <img
          className=" w-full h-full rounded-[5px] opacity-90 object-cover aspect-square"
          src={item.thumbnail}
          alt="Thumbnail"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-[5px]"></div>
        <img
          src={playButton}
          className="w-9 h-9 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="ml-5 flex flex-col">
        <span className="text-[#464646] text-sm lg:text-lg font-normal font-SFPro tracking-tight leading-none">
          {item.judul}
        </span>
        <div className="flex items-center mt-2 text-[#bdbdbd] text-sm font-normal font-SFPro leading-[25px] tracking-tight">
          <span>{item.deskripsi}</span>
        </div>
        <div className="flex items-center mt-2 text-[#bdbdbd] text-sm lg:text-base font-normal font-SFPro leading-[25px] tracking-tight">
          <span>{item.sosmed}</span>
          <div className="w-[5px] h-[5px] mx-2 bg-[#efefef] lg:text-base rounded-full"></div>
          <span>{item.channel}</span>
        </div>
      </div>
    </div>
  );
}

export default galeriCard;
