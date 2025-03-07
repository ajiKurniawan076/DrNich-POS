import { useContext, useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { data, Link, useNavigate } from "react-router-dom";
import { navContext } from "../../../App2";
import { useLocation } from "react-router-dom";
import axios from "axios";
import gkategori from "../../../assets/iconDisplay/Layanan/gkategori.svg";
import { toast } from "react-toastify";

export const LayananDetail = () => {
  const lokasi = useLocation();
  const { setNav, setLink } = useContext(navContext);
  const [datax, setdatax] = useState([]);
  const datadummy = lokasi.state;
  useEffect(() => {
    // fetch("/marketing.json").then(
    //     (response) => response.json()
    // ).then((data) => (setdatax(data)
    // ))
    console.log(datadummy)
    setNav("Detail");
    setLink("/pos/layanan")
  }, []);

  const navigate = useNavigate()
const handleHapus = () => {
    axios.delete(`${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/layanan/deletelayanan/${datadummy._id}`).then(
      response =>{
        console.log(response)
        response.status==200 && toast.success("Berhasil Menghapus Layanan")
        setTimeout(()=>{
          toast.success('Kembali ke halaman Layanan')
          navigate('/pos/layanan')
        },1000)
      }
    ).
    catch((error) => {
      console.log(error)
      toast.error("Gagal menghapus Layanan")
    })
  }

  document.title = "Detail";
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
      <div className="flex flex-col justify-between w-full h-full py-3 px-3">
        <div className="flex flex-col text-[12px] w-full border rounded-lg p-3 border-[#C2A353]">
          <div className="w-[115px] h-[115px] border rounded-lg ">
            <img src={datadummy.image} alt="" />
          </div>
          <div className="text-start  mt-1">
            <p className="text-[#BDBDBD]">Nama Layanan</p>
            <p className="text-[#454545]">{datadummy.nama}</p>
          </div>
          <div className=" text-start ">
            <p className="text-[#BDBDBD]">Kategori</p>
            <p className="text-[#454545]">{datadummy.kategori}</p>
          </div>
          <div className=" text-start ">
            <p className="text-[#BDBDBD]">harga</p>
            <p className="text-[#454545]">{datadummy.harga}</p>
          </div>
          <div className=" text-start ">
            <p className="text-[#BDBDBD]">Durasi</p>
            <p className="text-[#454545]">{datadummy.durasi}</p>
          </div>
          <div className="text-start ">
            <p className="text-[#BDBDBD]">Deskripsi Detail</p>
            <p className="text-[#454545]">{datadummy.deskripsi}</p>
          </div>
          <div className="text-start ">
            <p className="text-[#BDBDBD]">Deskripsi kartu</p>
            <p className="text-[#454545]">{datadummy.cardDeskripsi}</p>
          </div>
        </div>
        <div className="flex gap-1">
        <button
            onClick={handleHapus}
            className="flex justify-center items-center gap-2 h-[44px] w-full max-w-[115px]  border border-[#C2A353] font-medium rounded-lg text-[14px] bg-gradient-to-r from-[#C2A353] to-[#EAC564] text-transparent bg-clip-text"
          >
            Hapus{" "}
          </button>
          <Link
            to={{ pathname: "/pos/UpdateLayanan/"+datadummy._id }}
            className="flex justify-center items-center gap-2 h-[44px] w-full min-m-[160px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] "
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LayananDetail;
