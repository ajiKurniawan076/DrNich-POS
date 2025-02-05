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
import { navContext } from "../../App2";
import { Link } from "react-router-dom";
import iLine from "../../assets/iLine.svg";
import ilaya from "../../assets/iconDisplay/ilaya.svg";
import iserti from "../../assets/iconDisplay/iserti.svg";
import igaleri from "../../assets/iconDisplay/igaleri.svg";
import imes from "../../assets/iconDisplay/imes.svg";
import iproduk from "../../assets/iconDisplay/iproduk.svg";
import ipromo from "../../assets/iconDisplay/ipromo.svg";
import irating from "../../assets/iconDisplay/irating.svg";

export const BelajarDisplay = () => {
  const { setNav, setLink } = useContext(navContext);
  useEffect(() => {
    setNav("Display");
  }, []);
  document.title = " Display";
  return (
    <div className="w-full h-full flex flex-col gap-2 px-10 py-10 bg-white items-start place-items-center">
      <Link
        to={{
          pathname: `/sertifikat`,
        }}
        className="w-full h-[80px]"
      >
        <span className="hover:scale-110 w-full h-[80px] border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold">
          <img src={iLine} className="ms-[15px]" />
          <img src={iserti} className="ms-[25px]" />
          <p className="ms-[15px] text-[#454545]  font-medium text-[14px]">
            Sertifikat
          </p>
          <div className="flex ms-auto me-[15px]">
            <AiOutlineRight className="text-yellow-300" size={15} />
            <AiOutlineRight className="text-yellow-600" size={15} />
          </div>
        </span>
      </Link>
      <Link
        to={{
          pathname: `/layananKategori`,
        }}
        className="w-full h-[80px]"
      >
        <span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold">
          <img src={iLine} className="ms-[15px]" />
          <img src={ilaya} className="ms-[25px]" />
          <p className="ms-[15px] text-[#454545] font-medium text-[14px]">
            Layanan
          </p>
          <div className="flex ms-auto me-[15px]">
            <AiOutlineRight className="text-yellow-300" size={15} />
            <AiOutlineRight className="text-yellow-600" size={15} />
          </div>
        </span>
      </Link>

      <Link to={{ pathname: "" }} className="w-full h-[80px]">
        <span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold">
          <img src={iLine} className="ms-[15px]" />
          <img src={imes} className="ms-[25px]" />
          <p className="ms-[15px] text-[#454545]  font-medium text-[14px]">
            Mesin
          </p>
          <div className="flex ms-auto me-[15px]">
            <AiOutlineRight className="text-yellow-300" size={15} />
            <AiOutlineRight className="text-yellow-600" size={15} />
          </div>
        </span>
      </Link>

      <Link to={{ pathname: "/produk" }} className="w-full h-[80px]">
        <span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold">
          <img src={iLine} className="ms-[15px]" />
          <img src={iproduk} className="ms-[25px]" />
          <p className="ms-[15px] text-[#454545]  font-medium text-[14px]">
            Produk
          </p>
          <div className="flex ms-auto me-[15px]">
            <AiOutlineRight className="text-yellow-300" size={15} />
            <AiOutlineRight className="text-yellow-600" size={15} />
          </div>
        </span>
      </Link>
      <Link to={{ pathname: "/galeri" }} className="w-full h-[80px]">
        <span className="hover:scale-110 w-full h-full text-[#454545]  font-medium border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center ">
          <img src={iLine} className="ms-[15px]" />
          <img src={igaleri} className="ms-[25px]" />
          <p className="ms-[15px] text-[14px]">Galeri</p>
          <div className="flex ms-auto me-[15px]">
            <AiOutlineRight className="text-yellow-300" size={15} />
            <AiOutlineRight className="text-yellow-600" size={15} />
          </div>
        </span>
      </Link>
      <Link className="w-full h-[80px]">
        <span className="hover:scale-110 w-full h-full text-[#454545]  font-medium border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center ">
          <img src={iLine} className="ms-[15px]" />
          <img src={ipromo} className="ms-[25px]" />
          <p className="ms-[15px] text-[14px]">Promo</p>
          <div className="flex ms-auto me-[15px]">
            <AiOutlineRight className="text-yellow-300" size={15} />
            <AiOutlineRight className="text-yellow-600" size={15} />
          </div>
        </span>
      </Link>
      <Link
        to={{
          pathname: "/rating",
        }}
        className="w-full h-[80px]"
      >
        {" "}
        <span className="hover:scale-110 w-full h-full text-[#454545]  font-medium border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center ">
          <img src={iLine} className="ms-[15px]" />
          <img src={irating} className="ms-[25px]" />
          <p className="ms-[15px] text-[14px]">Rating</p>
          <div className="flex ms-auto me-[15px]">
            <AiOutlineRight className="text-yellow-300" size={15} />
            <AiOutlineRight className="text-yellow-600" size={15} />
          </div>
        </span>
      </Link>
    </div>
  );
};

export default BelajarDisplay;
