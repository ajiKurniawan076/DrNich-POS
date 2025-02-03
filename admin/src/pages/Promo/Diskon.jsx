import React, { useContext, useEffect, useState } from "react";
import { navContext } from "../../App2";
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iTamPu from "../../assets/iconkasir/iTamPu.svg";
import axios from "axios";
import { Link } from "react-router-dom";

export const Diskon = () => {
  const [diskon, setDiskon] = useState([]);
  const { setNav } = useContext(navContext);

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/promo/promo")
        .then((Response) => {
          console.log(Response);
          const filter = Response.data.filter((item) => item.jenis == "Diskon");
          setDiskon(filter);
        });
    };
    fetch();
  }, []);
  // console.log(diskon);

  setNav("Diskon");
  document.title = "Diskon";
  return (
    <div className="flex flex-col px-5 py-8 gap-1 bg-white w-full min-h-screen h-fit pt-8 text-[#454545] text-[12px]">
      {diskon.length === 0 ? (
        <div className="flex justify-center items-center min-h-screen">
          Belum ada Data
        </div>
      ) : (
        <>
          <form className="flex gap-2 h-[42px] border border-[#BDBDBD] rounded-xl items-center px-2">
            <img src={iCari} alt="Cari" />
            <input
              type="text"
              className="text-sm w-full h-[30px] focus:outline-none"
              placeholder="Cari..."
            ></input>
          </form>
          {diskon.map((data, i) => (
            <Link
              to={{
                pathname: `/diskonDetail/${data._id}`,
              }}
              className="grid place-items-start mt-4 w-full border border-[#BDBDBD] rounded-xl p-4"
              key={i}
            >
              <p className="font-medium">{data.namaPromo}</p>
              <div className="flex justify-between items-start text-[#BDBDBD] w-full">
                <p>{data.potongan}</p>
                <p className="text-[10px] text-[#EAC564]">{data.keterangan}</p>
              </div>
            </Link>
          ))}
        </>
      )}

      <div className="flex items-end h-full">
        <a
          href="TambahDiskon"
          className="flex justify-center gap-2 text-white text-[14px] bg-gradient-to-r rounded-xl from-[#EAC564] to-[#C2A353] w-full p-4"
        >
          <img src={iTamPu} alt="TambahPu" />
          <p>Tambah diskon</p>
        </a>
      </div>
    </div>
  );
};
