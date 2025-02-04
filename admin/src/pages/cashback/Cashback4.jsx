import React, { useContext, useEffect, useState } from "react";
import { navContext } from "../../App2";
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iTamPu from "../../assets/iconkasir/iTamPu.svg";
import axios from "axios";
import { Link } from "react-router-dom";

export const Cashback4 = () => {
  const [kesbek, setKesbek] = useState([]);
  const { setNav } = useContext(navContext);
  const { dataKorup, setDataKorup } = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/promo/promo")
        .then((response) => {
          const filterr = response.data.filter(
            (item) => item.jenis == "Cashback"
          );
          setKesbek(filterr);

          // filter detailpromo
          // filterr.forEach((promo) => {
          //   console.log(promo.promoDetail);
          // });
        });
    };
    fetchdata();
  }, []);

  kesbek.forEach((promo) => {
    console.log(promo.promoDetail);
  });

  console.log(kesbek);

  setNav("Cashback");
  document.title = "Cashback";
  return (
    <div className="flex flex-col px-5 py-8 gap-1 bg-white w-full min-h-full h-fit pt-8 text-[#454545] text-[12px]">
      {kesbek.length === 0 ? (
        <div className="flex justify-center items-center h-full my-auto ">
          Data tidak ada
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
          {kesbek.map((data, i) => (
            <Link
              to={{
                pathname: `/cashbackDetail/${data._id}`,
              }}
              state={dataKorup}
              className="grid place-items-start mt-4 w-full border border-[#BDBDBD] rounded-xl p-4"
              key={i}
            >
              <p className="font-medium">{data.namaPromo}</p>
              <div className="flex justify-between items-start text-[#BDBDBD] w-full">
                <p>{data.cashback}</p>
                <p className="text-[10px] text-[#EAC564]">{data.keterangan}</p>
              </div>
            </Link>
          ))}
        </>
      )}

      <div className="flex items-end h-full">
        <a
          href="tambahcashback"
          className="flex justify-center gap-2 text-white text-[14px] bg-gradient-to-r rounded-xl from-[#EAC564] to-[#C2A353] w-full p-4"
        >
          <img src={iTamPu} alt="TambahPu" />
          <p>Tambah Cashback</p>
        </a>
      </div>
    </div>
  );
};
