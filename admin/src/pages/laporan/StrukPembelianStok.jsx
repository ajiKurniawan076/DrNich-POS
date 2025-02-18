import React, { useContext, useEffect, useState } from "react";
import { navContext } from "../../App2";
import iPemSu from "../../assets/iconproduk/iPemSu.svg";
import iDown from "../../assets/iconproduk/iDown.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const StrukPembelianStok = () => {
  const { setNav, setLink } = useContext(navContext);
  const [datax, setDatax] = useState([]);
  const [fetched, setFetched] = useState(false)
  const navigasi = useNavigate();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://api.drnich.co.id/api/pos/produk/belanjaPos/${id}`)
        .then((response) => setDatax(response.data));
    };

    fetchData();
    setLink("/pos/LaporanRingkasanPenjualan");
      
    
    setTimeout(()=>{setFetched(true)},500)
  }, []);
  console.log(datax);

  setNav("Pembayaran Produk");
  document.title = "Pembayaran Produk";
  return (
    <div className="flex flex-col px-9 py-3 gap-1 bg-white w-full h-fit min-h-full pt-8">
          <div className="flex flex-col w-full place-items-center">
            <img src={iPemSu} alt="Pembayaran Berhasil" className={`${fetched? 'scale-125' : 'scale-50'} duration-500`}/>
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
              IDR {datax.total}
            </p>
        {datax?.belanjaDetail?.map((item, i) => (
          <div key={i} className="mt-7 text-[12px] w-full">
            <div className="flex justify-between text-start">
              <p>{item.produk.namaProduk}</p>
              <p>Rp {item.totalHarga}</p>
            </div>
            <div className="flex items-start text-[#BDBDBD] my-1">
              <p>
                {item.jumlah} x {item.produk.hargaBeli}
              </p>
            </div>
          </div>
        ))}
          <div className="w-full border border-dashed border-[#BDBDBD] my-3 mb-[20px]"></div>
            <div className="w-full flex justify-between text-[12px] font-semibold">
              <p>Total</p>
              <p>Rp {datax.total}</p>
            </div>
          <div className="flex w-full h-full mt-10 justify-end items-end">
            <div className="flex justify-end w-full">
              <button className="bg-gradient-to-r from-[#C2A353] to-[#EAC564] w-[90px] p-3 rounded-xl flex justify-center">
                <img src={iDown} alt="iDownload" />
              </button>
              <button
                onClick={() => navigasi("/pos/LaporanDataPembelianStok")}
                className="border ml-2 border-[#C2A353] w-full rounded-xl flex justify-center items-center text-[#C2A353]"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};
