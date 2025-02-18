import { useContext, useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { navContext } from "../../../App2";

import gSertifikat from "../../../assets/iconDisplay/Sertifikat/gSertifikat.svg";
import axios from "axios";

export const SertifikatDetail = () => {
  const { setNav, setLink } = useContext(navContext);
  const [image, setImage] = useState([]);
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/foto/getSertifbyId/${id}`
        );
        setImage(response.data.foto);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
      }
    };

    fetchData();
  }, [id]);

  document.title = "Detail";
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
      <div className="flex flex-col justify-between w-full min-h-full h-fit py-3 px-3 ">
        <div className="flex w-full h-full justify-center">
          <div className="h-[214px]">
            <img src={image} alt="" className="w-[335px] h-[214px]" />
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
            to={`/pos/UpdateSertifikat/${id}`}
            className="flex justify-center items-center gap-2 h-[44px] w-full min-m-[160px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] "
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SertifikatDetail;
