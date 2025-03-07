import { useContext, useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { data, Link, useNavigate, useParams } from "react-router-dom";
import { navContext } from "../../../../App2";
import { useLocation } from "react-router-dom";

import gkt from "../../../../assets/iconDisplay/produk/gkt.svg";
import axios from "axios";
import { toast } from "react-toastify";

export const Detail1 = () => {
  const lokasi = useLocation();

  const { id } = useParams();

  const { setNav, setLink } = useContext(navContext);
  const [datax, setdatax] = useState("");
  const [image, setImage] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/produk/getCategoryById/${id}`
        );
        setImage(response.data.image);
        setdatax(response.data.name);
      } catch (error) {
        console.log(error.response?.data?.message || "An error occurred");
        toast.error("Ada masalah. Silahkan coba lagi!");
      }
    };
    FetchData();
    setNav("Detail");
    setLink("/pos/kategoriproduk2");
  }, []);

  const navigate = useNavigate();
  const handleHapus = () => {
    try {
      axios
        .delete(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/produk/deletekategoriProduk/${id}`
        )
        .then((response) => {
          response.status == 200 &&
            toast.success("Berhasil Menghapus Kategori Produk");
          setTimeout(() => {
            toast.success("Kembali ke halaman Produk");
            navigate("/pos/produk");
          }, 1000);
        });
    } catch {
      toast.error("Gagal menghapus Kategori Produk");
    }
  };

  document.title = "Detail";
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
      <div className="flex flex-col justify-between w-full h-full py-3 px-3">
        <div className="flex flex-col text-[12px] w-full border rounded-lg p-3 border-[#C2A353]">
          <div className="w-[115px] h-[115px] border rounded-lg ">
            <img src={image} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="text-start  mt-1">
            <p className="text-[#BDBDBD]">Nama Kategori</p>
            <p className="text-[#454545]">{datax}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={handleHapus}
            className="flex justify-center items-center gap-2 h-[44px] w-full max-w-[115px]  border border-[#C2A353] font-medium rounded-lg text-[14px] bg-gradient-to-r from-[#C2A353] to-[#EAC564] text-transparent bg-clip-text">
            Hapus{" "}
          </button>
          <Link
            to={{ pathname: `/pos/UpdateKategoriJenisProduct/${id}` }}
            className="flex justify-center items-center gap-2 h-[44px] w-full min-m-[160px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] ">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Detail1;
