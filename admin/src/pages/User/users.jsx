import { AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import { BiDotsVertical } from "react-icons/bi";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";

import iSupp from "../../assets/iconuser/iSuplier.svg";
import next2 from "../../assets/next2.svg";
import iTerapis from "../../assets/iconuser/iTerapis.svg";
import iMark from "../../assets/iconuser/iMark.svg";
import iPel from "../../assets/iconuser/iPel.svg";
import iLine from "../../assets/iLine.svg";

export const USer = () => {
  const { setNav } = useContext(navContext);
  useEffect(() => {
    setNav("Data user");
  }, []);
  document.title = "Data User";

  return (
    <div className="w-full h-full flex flex-col gap-2 px-10 py-10 bg-white items-start place-items-center font-medium text-[14px]">
      <a href="supplier" className="w-full h-[80px]">
        <span className="shadow-md w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center">
          <img src={iLine} className="ms-[15px]" />
          <img src={iSupp} className="ms-[25px]" />
          <p className="ms-[15px] text-[#454545]">Supplier</p>
          <div className="flex ms-auto me-[15px]">
            <img src={next2} className="h-[24px] w-[24px] " />
          </div>
        </span>
      </a>
      <a href="terapis" className="w-full h-[80px]">
        <span className="shadow-md w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center ">
          <img src={iLine} className="ms-[15px]" />
          <img src={iTerapis} className="ms-[25px]" />
          <p className="ms-[15px] text-[#454545]">Terapis</p>
          <div className="flex ms-auto me-[15px]">
            <img src={next2} className="h-[24px] w-[24px] " />
          </div>
        </span>
      </a>
      <a href="marketing" className="w-full h-[80px]">
        <span className="shadow-md w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center ">
          <img src={iLine} className="ms-[15px]" />
          <img src={iMark} className="ms-[25px]" />
          <p className="ms-[15px] text-[#454545]">Marketing</p>
          <div className="flex ms-auto me-[15px]">
            <img src={next2} className="h-[24px] w-[24px] " />
          </div>
        </span>
      </a>
      <a href="pelanggan" className="w-full h-[80px]">
        <span className="shadow-md w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center ">
          <img src={iLine} className="ms-[15px]" />
          <img src={iPel} className="ms-[25px]" />
          <p className="ms-[15px] text-[#454545]">Pelanggan</p>
          <div className="flex ms-auto me-[15px]">
            <img src={next2} className="h-[24px] w-[24px] " />
          </div>
        </span>
      </a>
    </div>
  );
};
