import { useContext, useEffect, useState } from "react";
import { navContext } from "../../App2";
import { AiOutlineRight } from "react-icons/ai";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import wa from "../../assets/wa.svg";

export const SupplierDetail = () => {
  const { setNav, setSort } = useContext(navContext);
  const [datasupp, setDataSupp] = useState([]);
  const { id } = useParams();
  const navigasi = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://api.drnich.co.id/api/pos/user/supplier/${id}`)
        .then((response) => setDataSupp(response.data));
    };
    fetchData();

    setNav("Detail Supplier");
    setSort(false)
  }, []);
  const handleDelete = async () => {
    await axios
      .delete(`https://api.drnich.co.id/api/pos/user/deletesupplier/${id}`)
      .then((response) => response.status == 200 && navigasi("../supplier"));
  };

  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-9">
      <div className="flex flex-col gap-1 px-3 rounded-xl border border-[#C2A353] pt-2 mx-1">
        <label className="text-start text-[#BDBDBD] text-[10px] md:text-[12px]">
          Nama Perusahaan
        </label>
        <p className="text-start font-semibold h-[30px]">
          {datasupp.namaPerusahaan}
        </p>
        <label className="text-start text-[#BDBDBD] text-[10px] md:text-[12px]">
          Nama Kontak
        </label>
        <p className="text-start font-semibold h-[30px]">
          {datasupp.namaKontak}
        </p>
        <label className="text-start text-[#BDBDBD] text-[10px] md:text-[12px]">
          Email
        </label>
        <p className="text-start font-semibold h-[30px]">{datasupp.email}</p>
        <label className="text-start text-[#BDBDBD] text-[10px] md:text-[12px]">
          Nomor Telepon
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            window.open(`https://wa.me/` + datasupp.nomorTelepon, "_blank");
          }}
          className="flex items-center gap-1 w-fit"
        >
          <span>
            <img src={wa} />
          </span>
          <p className="flex items-center text-start font-semibold h-[30px]">
            {datasupp.nomorTelepon}
          </p>
        </button>
        <label className="text-start text-[#BDBDBD] text-[10px] md:text-[12px]">
          Alamat
        </label>
        <p className="text-start font-semibold h-[30px]">{datasupp.alamat}</p>
        <label className="text-start text-[#BDBDBD] text-[10px] md:text-[12px]">
          Keterangan
        </label>
        <p className="text-start font-semibold h-[30px]">
          {datasupp.keterangan}
        </p>
      </div>
      <div className="text-start  font-medium bg-[#F6F6F6] text-[#BDBDBD] my-3 py-2">
        <span className="ms-2">Informasi Rekening</span>
      </div>
      <div className="flex flex-col gap-1 px-3 mx-1 rounded-xl border border-[#C2A353]  pt-2">
        <label className="text-start text-[#BDBDBD] text-[10px] md:text-[12px]">
          Nama Pemilik Rekening
        </label>
        <p className="text-start font-semibold h-[30px]">
          {datasupp.namaRekening}
        </p>
        <label className="text-start text-[#BDBDBD] text-[10px] md:text-[12px]">
          Bank
        </label>
        <p className="text-start font-semibold h-[30px]">{datasupp.bank}</p>
        <label className="text-start text-[#BDBDBD] text-[10px] md:text-[12px]">
          Nomor Rekening
        </label>
        <p className="text-start font-semibold h-[30px]">
          {datasupp.nomorRekening}
        </p>
        <label className="text-start text-[#BDBDBD] text-[10px] md:text-[12px]">
          Keterangan
        </label>
        <p className="text-start font-semibold h-[30px]">
          {datasupp.keteranganRek}
        </p>
      </div>
      <div className="mx-1 flex flex-col gap-3">
        <a href="#" className=" w-full h-[50px]">
          <span className="hover:scale-105 w-full  h-full border rounded-xl text-[#C2A353] border-[#C2A353] flex items-center font-semibold px-5 mt-2">
            Lihat Daftar Produk
            <div className="flex ms-auto">
              <AiOutlineRight className="text-yellow-300" size={15} />
              <AiOutlineRight className="text-yellow-600" size={15} />
            </div>
          </span>
        </a>
        <a href="../riwayatsupplier" className=" w-full h-[50px]">
          <span className="hover:scale-105 w-full  h-full border rounded-xl text-[#C2A353] border-[#C2A353] flex items-center font-semibold px-5">
            Lihat Riwayat Terakhir
            <div className="flex ms-auto">
              <AiOutlineRight className="text-yellow-300" size={15} />
              <AiOutlineRight className="text-yellow-600" size={15} />
            </div>
          </span>
        </a>
        <div className="flex gap-5 w-full justify-between text-[14px]">
          <div className="flex justify-center items-center border-[#C2A353] border rounded-lg w-[30%] p-3 text-[14px]">
            <button className="bg-white text-[#C2A353] ">Hapus</button>
          </div>
          <Link
            to={`/pos/updatesupplier/${id}`}
            className="flex justify-center items-center bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white rounded-lg w-[70%] p-3 text-[14px]"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};
