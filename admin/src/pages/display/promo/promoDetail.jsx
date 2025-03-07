import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function PromoDetail() {
  const { id } = useParams();
  const [datax, setDatax] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/promo/getPromoById/${id}`
      );
      setDatax(response.data);
      console.log("data: ", response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Error fetching data");
    }
  };

  const handleHapus = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/promo/deletePromo/${id}`
      );
      if (res.status === 200) {
        toast.success("Promo berhasil dihapus");
        setTimeout(() => {
          window.location.href = "/pos/display";
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ada masalah. Silahkan coba lagi!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
      <ToastContainer />
      <div className="flex flex-col justify-between w-full h-full py-3 px-3">
        <div className="flex flex-col gap-2 text-[12px] w-full border rounded-lg p-3 border-[#C2A353]">
          <div className="flex items-center justify-start w-full gap-3">
            <div className="border aspect-square object-cover rounded-lg flex flex-col max-w-52 p-3">
              <img
                src={datax.fotoDesktop}
                alt=""
                className="object-cover aspect-square w-[115px] h-[115px] border rounded-lg "
              />
              <p>Foto di Desktop</p>
            </div>
            <div className="border aspect-square object-cover rounded-lg flex flex-col max-w-52 p-3">
              <img
                src={datax.fotoMobile}
                alt=""
                className="object-cover aspect-square w-[115px] h-[115px] border rounded-lg "
              />
              <p>Foto di Mobile</p>
            </div>
          </div>

          <div className="text-start  mt-1">
            <p className="text-[#BDBDBD]">Judul Promo</p>
            <p className="text-[#454545]">{datax.nama}</p>
          </div>
          <div className="text-start  mt-1">
            <p className="text-[#BDBDBD]">Syarat</p>
            <p className="text-[#454545]">{datax.syarat}</p>
          </div>
          <div className=" text-start ">
            <p className="text-[#BDBDBD]">Deskripsi</p>
            <p className="text-[#454545]">{datax.detail}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={handleHapus}
            className="flex justify-center items-center gap-2 h-[44px] w-full max-w-[115px]  border border-[#C2A353] font-medium rounded-lg text-[14px] bg-gradient-to-r from-[#C2A353] to-[#EAC564] text-transparent bg-clip-text">
            Hapus
          </button>
          <Link
            to={{ pathname: `/pos/UpdateDisplayPromo/${id}` }}
            className="flex justify-center items-center gap-2 h-[44px] w-full min-m-[160px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] ">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export { PromoDetail };
