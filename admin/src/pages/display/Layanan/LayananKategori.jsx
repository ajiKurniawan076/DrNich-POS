import {
  AiOutlineBorderLeft,
  AiOutlineLineHeight,
  AiOutlineMenu,
  AiOutlineMenuFold,
  AiOutlineRight,
  AiOutlineShop,
  AiOutlineUp,
  AiOutlineVerticalLeft,
} from "react-icons/ai";
import { BiDotsVertical } from "react-icons/bi";
import { RxAlignCenterVertically } from "react-icons/rx";
import { useContext, useEffect } from "react";
import { navContext } from "../../../App2";
import { Link } from "react-router-dom";

import iLine from "../../../assets/iLine.svg";

import ilayanan from "../../../assets/iconDisplay/Layanan/ilayanan.svg";
import ikategori from "../../../assets/iconDisplay/Layanan/ikategori.svg";

export const LayananKategori = () => {
  const { setNav, setLink } = useContext(navContext);
  useEffect(() => {
    setNav("Layanan");
    setLink("/pos/display")
  }, []);
  document.title = "Layanan";
  return (
    <div className="w-full h-full flex flex-col gap-2 px-10 py-10 bg-white items-start place-items-center">
      <Link
        to={{ pathname: "/pos/kategorilayanan" }}
        className="w-full h-[80px]">
        <span className="w-full h-[80px] border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold">
          <img src={iLine} className="ms-[15px]" />
          <img src={ilayanan} className="ms-[25px]" />
          <p className="ms-[15px] text-[#454545]  font-medium text-[14px]">
            Kategori Layanan
          </p>
          <div className="flex ms-auto me-[15px]">
            <AiOutlineRight className="text-yellow-300" size={15} />
            <AiOutlineRight className="text-yellow-600" size={15} />
          </div>
        </span>
      </Link>
      <Link to={{ pathname: "/pos/layanan" }} className="w-full h-[80px]">
        <span className="w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold">
          <img src={iLine} className="ms-[15px]" />
          <img src={ikategori} className="ms-[25px]" />
          <p className="ms-[15px] text-[#454545] font-medium text-[14px]">
            Daftar Layanan
          </p>
          <div className="flex ms-auto me-[15px]">
            <AiOutlineRight className="text-yellow-300" size={15} />
            <AiOutlineRight className="text-yellow-600" size={15} />
          </div>
        </span>
      </Link>
    </div>
  );
};

export default LayananKategori;
