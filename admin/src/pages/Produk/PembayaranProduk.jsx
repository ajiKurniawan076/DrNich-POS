import React, { useContext, useEffect, useState } from "react";
import { navContext } from "../../App2";
import iPemSu from "../../assets/iconproduk/iPemSu.svg";
import iDown from "../../assets/iconproduk/iDown.svg";
import { useParams } from "react-router-dom";
import axios from "axios";

export const PembayaranProduk = () => {
  const { setNav } = useContext(navContext);
  const [datax, setDatax] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://api.drnich.co.id/api/pos/produk/belanjaPos/${id}`)
        .then((response) => setDatax(response.data.belanjaDetail));
    };

    fetchData();
  }, []);
  console.log(datax);

  setNav("Pembayaran Produk");
  document.title = "Pembayaran Produk";
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full pt-8">
      {datax.map((item, i) => (
        <>
          <div className="grid place-items-center">
            <img src={iPemSu} alt="Pembayaran Berhasil" />
            <p className="text-[14px] text-[#27AE60] pt-8">
              Pembayaran Berhasil
            </p>
            <p className="text-[12px] text-[#bdbdbd] mt-4">#DN0928013</p>
            <p className="text-[12px] text-[#bdbdbd]">
              {new Date()
                .toLocaleString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZoneName: "short",
                  hour12: false,
                })
                .replace("pukul ", ",")}
            </p>

            <p className="text-[24px] text-[#454545] font-bold mt-3">
              IDR {item.totalHarga}
            </p>
          </div>
          <div className="mt-7 text-[12px]">
            <div className="flex justify-between text-start">
              <p>{item.produk.namaProduk}</p>
              <p>Rp {item.totalHarga}</p>
            </div>
            <div className="flex items-start text-[#BDBDBD] my-1">
              <p>
                {item.jumlah} x {item.produk.hargaBeli}
              </p>
            </div>
            <div className="border border-dashed border-[#BDBDBD] my-3"></div>
            <div className="flex justify-between text-[12px]">
              <p>Total</p>
              <p>Rp {item.totalHarga}</p>
            </div>
          </div>
          <div className="flex h-full items-end">
            <div className="flex justify-end w-full">
              <button className="bg-gradient-to-r from-[#C2A353] to-[#EAC564] w-[90px] p-3 rounded-xl flex justify-center">
                <img src={iDown} alt="iDownload" />
              </button>
              <a
                href=""
                className="border ml-2 border-[#C2A353] w-full rounded-xl flex justify-center items-center text-[#C2A353]"
              >
                Kembali
              </a>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};
