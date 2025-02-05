import { useContext, useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { navContext } from "../../../App2";

import gSertifikat from "../../../assets/iconDisplay/Sertifikat/gSertifikat.svg";

export const SertifikatDetail = () => {
  const { setNav, setLink } = useContext(navContext);
  const [datax, setdatax] = useState([]);
  useEffect(() => {
    // fetch("/marketing.json").then(
    //     (response) => response.json()
    // ).then((data) => (setdatax(data)
    // ))
    setNav("Detail");
  }, []);

  document.title = "Detail";
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
      <div className="flex flex-col justify-between w-full h-full py-3 px-3">
        <div className="flex w-full h-full">
          <div className="h-[214px]">
            <img src={gSertifikat} alt="" />
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
            to={{ pathname: "/UpdateSertifikat" }}
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
  );
};

export default SertifikatDetail;
