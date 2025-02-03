import { useContext, useEffect, useState } from "react";
import { navContext } from "../../App2";
import { AiOutlineRight, AiOutlineWhatsApp } from "react-icons/ai";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import wa from "../../assets/wa.svg";
import axios from "axios";

export const PelangganDetail = () => {
  const { setNav } = useContext(navContext);
  const [datax, setDatax] = useState([]);
  const { id } = useParams();
  const navigasi = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://api.drnich.co.id/api/pos/user/pelanggan/${id}`)
        .then((response) => setDatax(response.data));
    };
    fetchData();
    setNav("Detail Pelanggan");
  }, []);

  const handleDelete = async () => {
    (await axios
      .delete(`https://api.drnich.co.id/api/pos/user/deletepelanggan/${id}`)
      .then((response) => response.status == 200)) & navigasi("../pelanggan");
  };

  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-5">
      <div className="flex flex-col gap-1 px-5">
        <div className="flex flex-col gap-1 px-3 rounded-xl border border-[#C2A353] pt-2">
          {datax.length === 0 ? (
            <div className="flex justify-center items-center min-h-screen">
              Data Tidak ada
            </div>
          ) : (
            <>
              <label className="text-start text-[#BDBDBD] text-[10px] md:text-[12px]">
                Nama
              </label>
              <p className="text-start font-semibold h-[30px]">
                {datax.namaPelanggan}
              </p>
              <label className="text-start text-[#BDBDBD] text-[10px] md:text-[12px]">
                Nomor Telepon
              </label>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(`https://wa.me/` + datax.nomorTelepon, "_blank");
                }}
                className="flex items-center gap-1 w-fit"
              >
                <span>
                  <img src={wa} />
                </span>
                <p className="flex items-center text-start font-semibold h-[30px]">
                  {datax.nomorTelepon}
                </p>
              </button>
              <label className="text-start text-[#BDBDBD] text-[10px] md:text-[12px]">
                Jenis Kelamin
              </label>
              <p className="text-start font-semibold h-[30px]">
                {datax.gender}
              </p>
              <label className="text-start text-[#BDBDBD] text-[10px] md:text-[12px]">
                Alamat
              </label>
              <p className="text-start font-semibold h-[30px]">
                {datax.alamat}
              </p>
              <label className="text-start text-[#BDBDBD] text-[10px] md:text-[12px]">
                Keterangan
              </label>
              <p className="text-start font-semibold h-[30px]">
                {datax.keterangan}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between text-start  font-medium bg-[#F6F6F6] text-[#BDBDBD] my-3 py-2">
        <span className="ms-2">Terakhir Diperbaharui</span>
        <span className="text-end me-2">1 Nov 2024</span>
      </div>
      <div className="w-full h-[50px] px-5">
        <a href="#" className=" w-full h-[50px]">
          <span className="hover:scale-105 w-full  h-full border rounded-xl text-[#C2A353] border-[#C2A353] flex items-center font-semibold px-5 mt-2">
            Lihat Riwayat Transaksi
            <div className="flex ms-auto">
              <AiOutlineRight className="text-yellow-300" size={15} />
              <AiOutlineRight className="text-yellow-600" size={15} />
            </div>
          </span>
        </a>
      </div>
      <div className="flex gap-5 w-full justify-end h-full text-[14px] px-5 mt-auto">
        <div className="flex justify-center items-center border-[#C2A353] border rounded-lg w-[30%] p-3 text-[14px] ">
          <button href="#" className="bg-white text-[#C2A353]">
            Hapus{" "}
          </button>
        </div>
        <Link
          to={{ pathname: `/pos/pelanggangupdate/${id}` }}
          href="#"
          className="flex justify-center items-center bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white rounded-lg w-[70%] p-3 text-[14px]"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};
