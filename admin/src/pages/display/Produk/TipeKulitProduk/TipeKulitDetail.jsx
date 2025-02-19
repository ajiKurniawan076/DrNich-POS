import { useContext, useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { navContext } from "../../../../App2";
import { useLocation } from "react-router-dom";
import gkt from "../../../../assets/iconDisplay/produk/gkt.svg";
import axios from "axios";

const TipeKulitDetail = () => {
  const {id} = useParams()
  const { setNav, setLink } = useContext(navContext);
  const [datax, setdatax] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/getAlltipeKulit`)
          const filteredData = response.data.find(item => item._id === id)
          setdatax(filteredData)
        }
    fetchingData();
    setNav("Detail Tipe Kulit");
    setLink('/pos/tipekulit')
  }, [id]);

  document.title = "Detail";
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
          <div className="flex flex-col justify-between w-full h-full py-3 px-3">
            <div className="flex flex-col text-[12px] w-full border rounded-lg p-3 border-[#C2A353]">
              <div className="text-start  mt-1 py-2">
                <p className="text-[#BDBDBD]">Nama Tipe Kulit</p>
                <p className="text-[#454545]">{datax.name}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <a
                href=""
                className="flex justify-center items-center gap-2 h-[44px] w-full max-w-[115px]  border border-[#C2A353] font-medium rounded-lg text-[14px] bg-gradient-to-r from-[#C2A353] to-[#EAC564] text-transparent bg-clip-text"
              >
                Hapus{" "}
              </a>
              <Link
                to={`/pos/TipeKulitEdit/${id}`}
                className="flex justify-center items-center gap-2 h-[44px] w-full min-m-[160px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] "
              >
                Edit
              </Link>
            </div>
          </div>
          <button
            className="w-10 h-10 bg-black/300 text-white"
            onClick={() => {
              setdatax([]);
            }}
          >
            RESET
          </button>
        </div>
  )
}
export default TipeKulitDetail