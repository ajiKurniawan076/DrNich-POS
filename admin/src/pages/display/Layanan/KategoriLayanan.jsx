import { useContext, useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { data, Link } from "react-router-dom";
import { navContext } from "../../../App2";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
export const KategoriLayanan = () => {
  const { setNav, setLink } = useContext(navContext);
  const [datax, setdatax] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/layanan/getAllJenisLayanan`
        );
        const data = response.data;
        setdatax(data);
        console.log("data: ", response);
      } catch (error) {
        console.log(error.response?.data?.message || "An error occurred");
        toast.error("Ada masalah. Silahkan coba lagi!");
      }
    };
    fetchData();
    // fetch("/marketing.json").then(
    //     (response) => response.json()
    // ).then((data) => (setdatax(data)
    // ))
    setLink("/pos/layananKategori")
    setNav("Layanan Kategori");
  }, []);

  document.title = "Layanan Kategori";
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full min-h-full h-fit">
      <ToastContainer />
      <div className="flex flex-col justify-between w-full h-full py-3 px-3">
        {datax.length === 0 ? (
          <div className="flex flex-col w-full h-full items-center justify-center text-black/40">
            Belum Ada Data Ketegori Layanan
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
            {datax.length > 0 &&
              datax?.map((data) => (
                <Link
                  to={{
                    pathname: `/pos/kategoridetail/${data._id}`,
                  }}
                  state={data}
                  className="w-full border flex  justify-between items-center rounded-xl px-3 py-3"
                  key={data._id}
                >
                  <ul className=" flex flex-col place-items-start">
                    <li className="text-[12px] font-medium text-[#454545]">
                      {data.nama}
                    </li>
                  </ul>
                  <AiOutlineRightCircle size={20} />
                </Link>
              ))}
          </div>
        )}

        <Link
          to={{ pathname: "/pos/kategoriAdd" }}
          className="flex justify-center items-center gap-2 h-[44px]  bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] "
        >
          <AiFillPlusCircle size={20} /> Tambah Kategori{" "}
        </Link>
      </div>
    </div>
  );
};

export default KategoriLayanan;
