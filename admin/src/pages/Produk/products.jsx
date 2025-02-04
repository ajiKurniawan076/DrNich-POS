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
import iDaf from "../../assets/iconproduk/iDaf.svg";
import iKat from "../../assets/iconproduk/iKat.svg";
import iMan from "../../assets/iconproduk/iMan.svg";
import iPro from "../../assets/iconproduk/iPro.svg";
import iPem from "../../assets/iconproduk/iPem.svg";
import iLine from "../../assets/iLine.svg";
import iNext from "../../assets/iNext.svg";


export const Products = () => {
  const { setNav } = useContext(navContext);
  useEffect(() => {
    setNav("Produk");
  }, []);
  document.title = "Produk";

  return (
    <div className="w-full h-full flex flex-col gap-y-[15px] px-10 py-10 bg-white items-start place-items-center">  
    <a href="jenisproduk" className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"><span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white"><img src={iLine}/><img src={iPro} className="ms-[25px]"/><p className="ms-[15px] text-[14px] text-[#454545] font-medium">Jenis Produk</p>
        <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
        <img src={iNext} alt="next" />
        </div>
        </span></a>

        <a href="kategoriproduks" className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"><span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white"><img src={iLine}/><img src={iKat} className="ms-[25px]"/><p className="ms-[15px] text-[14px] text-[#454545] font-medium">Kategori</p>
            <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
            <img src={iNext} alt="next" />
            </div>
            </span></a>

        <a href="daftarproduk" className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"><span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white"><img src={iLine}/><img src={iDaf} className="ms-[25px]"/><p className="ms-[15px] text-[14px] text-[#454545] font-medium">Daftar Produk</p>
            <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
            <img src={iNext} alt="next" />
            </div>
            </span></a>

        <a href="DaftarBelanja" className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"><span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white"><img src={iLine}/><img src={iPem} className="ms-[25px]"/><p className="ms-[15px] text-[14px] text-[#454545] font-medium">Pembelian Stok</p>
            <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
            <img src={iNext} alt="next" />
            </div>
            </span></a>

        <a href="ManajementStok" className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"><span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white"><img src={iLine}/><img src={iMan} className="ms-[25px]"/><p className="ms-[15px] text-[14px] text-[#454545] font-medium">Manajemen Stok</p>
            <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
            <img src={iNext} alt="next" />
            </div>
            </span></a>

      <a href="ManajementStok" className="w-full h-[80px]">
        <span className="w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center">
          <img src={iLine} className="ms-[15px]" />
          <img src={iMan} className="ms-[25px]" />
          <p className="ms-[15px]">Manajemen Stok</p>
          <div className="flex ms-auto me-[15px]">
            <AiOutlineRight className="text-yellow-300" size={15} />
            <AiOutlineRight className="text-yellow-600" size={15} />
          </div>
        </span>
      </a>
    </div>
  );
};
