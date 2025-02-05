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
import iNext from "../../assets/iNext.svg";


export const Display = () => {
  const { setNav, setLink } = useContext(navContext);
  useEffect(() => {
    setNav("Display");
    setLink('/pos')
  }, []);
  document.title = " Display";
  return (
    <div className="w-full h-fit flex flex-col gap-y-[15px] px-10 py-10 bg-white items-start place-items-center">
      <Link
        to={{
          pathname: `/pos/sertifikat`,
        }}
        className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"
      >
        <span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white">
          <img src={iLine} />
          <img src={iserti} className="ms-[25px]" />
          <p className="ms-[15px] text-[14px] text-[#454545] font-medium">
            Sertifikat
          </p>
          <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
                    <img src={iNext} alt="next" />
                  </div>
        </span>
      </Link>
      <Link
        to={{
          pathname: `/pos/layananKategori`,
        }}
        className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"
      >
        <span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white">
          <img src={iLine} />
          <img src={ilaya} className="ms-[25px]" />
          <p className="ms-[15px] text-[14px] text-[#454545] font-medium">
            Layanan
          </p>
          <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
                    <img src={iNext} alt="next" />
                  </div>
        </span>
      </Link>

      <Link to={{ pathname: "" }} className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md">
        <span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white">
          <img src={iLine} />
          <img src={imes} className="ms-[25px]" />
          <p className="ms-[15px] text-[14px] text-[#454545] font-medium">
            Mesin
          </p>
          <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
                    <img src={iNext} alt="next" />
                  </div>
        </span>
      </Link>

      <Link to={{ pathname: "/pos/produk" }} className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md">
        <span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white">
          <img src={iLine} />
          <img src={iproduk} className="ms-[25px]" />
          <p className="ms-[15px] text-[14px] text-[#454545] font-medium">
            Produk
          </p>
          <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
                    <img src={iNext} alt="next" />
                  </div>
        </span>
      </Link>
      <Link to={{ pathname: "/pos/galeri" }} className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md">
        <span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white">
          <img src={iLine} />
          <img src={igaleri} className="ms-[25px]" />
          <p className="ms-[15px] text-[14px] text-[#454545] font-medium">Galeri</p>
          <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
          <img src={iNext} alt="next" />
        </div>
        </span>
      </Link>
      <Link className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md">
        <span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white">
          <img src={iLine} />
          <img src={ipromo} className="ms-[25px]" />
          <p className="ms-[15px] text-[14px] text-[#454545] font-medium">Promo</p>
          <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
          <img src={iNext} alt="next" />
        </div>
        </span>
      </Link>
      <Link
        to={{
          pathname: "/pos/rating",
        }}
        className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"
      >
        {" "}
        <span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white">
          <img src={iLine} />
          <img src={irating} className="ms-[25px]" />
          <p className="ms-[15px] text-[14px] text-[#454545] font-medium">Rating</p>
          <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
          <img src={iNext} alt="next" />
        </div>
        </span>
      </Link>
    </div>
  );
};

export default Display;
