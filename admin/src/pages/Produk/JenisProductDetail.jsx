import { useContext, useEffect, useState } from "react";
import { navContext } from "../../App2";
import { AiOutlineRight, AiOutlineWhatsApp } from "react-icons/ai";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import wa from "../../assets/wa.svg";
import axios from "axios";
import next2 from "../../assets/next2.svg";

export const JenisProductDetail = () => {
  const { setNav, setSort, setLink } = useContext(navContext);
  const navigate = useNavigate();
  const [datax, setDatax] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/produk/jenisproduk/" + id)
        .then((response) => {
          setDatax(response.data);
        });
    };
    fetchData();
    setNav("Jenis Product");
    setLink('/pos/jenisproduk')
    setSort(false)
  }, []);
  const deleteModel = async () => {
    await axios
      .delete(
        "https://api.drnich.co.id/api/pos/produk/deletejenisProdukPos/" + id
      )
      .then((response) => response.status == 200 && navigate("../jenisproduk"));
  };
  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-full overflow-auto overflow-y-scroll scrollbar-hide px-9">
      <div className="flex flex-col px-3 mx-1 rounded-xl border border-[#C2A353] p-4">
        <label className="text-start text-[#BDBDBD] font-normal text-[10px]">
          Nama Jenis Produk{" "}
        </label>
        <p className="text-start text-[12px] font-normal text-[#454545]">
          {datax?.jenis}
        </p>
      </div>
      <div className="flex justify-between mx-1 my-1 text-[12px] text-[#BDBDBD]">
        <p>Terakhir Diperbaharui</p>
        <p>
          {new Date(datax.updatedAt).toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </p>
      </div>
      <div className="mx-1 flex flex-col gap-3 h-full justify-between">
        <a
          href={`/pos/produkbyjenis/${datax._id}`}
          className=" w-full h-[50px] border-b-2"
        >
          <span className="w-full  h-full border rounded-xl text-[#C2A353] border-[#C2A353] flex items-center font-normal px-5">
            Lihat Daftar Produk
            <div className="flex ms-auto">
              <img src={next2} className="h-[18px] w-[18px]" />
            </div>
          </span>
        </a>
      </div>
      <div className="flex gap-5 w-full justify-between text-[14px]">
        <button className="flex justify-center items-center border-[#C2A353] border rounded-lg w-[30%] p-3 text-[14px] bg-white text-[#C2A353]">
          Hapus
        </button>
        <Link
          to={`/pos/updatejenisproduk/${id}`}
          className="flex justify-center items-center bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white rounded-lg w-[70%] p-3 text-[14px]"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};
