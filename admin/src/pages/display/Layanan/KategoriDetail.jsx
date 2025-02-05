import { useContext, useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { data, Link } from "react-router-dom";
import { navContext } from "../../../App2";
import { useLocation } from "react-router-dom";
import gkategori from "../../../assets/iconDisplay/Layanan/gkategori.svg";

export const KategoriDetail = () => {
  const lokasi = useLocation();
  const dataDammy = lokasi.state;
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
        <div className="flex flex-col w-full  border rounded-lg p-3 border-[#C2A353]">
          <div className="w-[115px] h-[115px] border rounded-lg ">
            <img src={gkategori} alt="" />
          </div>
          <div className="text-[12px] text-start  mt-2">
            <p className="text-[#BDBDBD]">Nama Kategori</p>
            <p className="text-[#454545]">{dataDammy.name}</p>
          </div>
          <div className="text-[12px] text-start  mt-2">
            <p className="text-[#BDBDBD]">Deskripsi</p>
            <p className="text-[#454545]">{dataDammy.deskripsi}</p>
          </div>
        </div>

        {/* {datax == {} ?
                    <div className="flex flex-col w-full h-full items-center justify-center text-black/40">Belum Ada Data sertifikat</div>
                    :
                    <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
                        {datax.map((data) => (
                            <Link to={{
                            }} className="w-full border flex  justify-between items-center rounded-xl px-3 py-3" key={data.id}>
                                <ul className=" flex flex-col place-items-start">
                                    <li className="text-[12px] font-medium text-[#454545]">sertifikat sinta.jpg</li>
                                </ul>
                                <AiOutlineRightCircle size={20} />
                            </Link>
                        ))}

                    </div>
                } */}
        <div className="flex gap-1">
          <a
            href=""
            className="flex justify-center items-center gap-2 h-[44px] w-full max-w-[115px]  border border-[#C2A353] font-medium rounded-lg text-[14px] bg-gradient-to-r from-[#C2A353] to-[#EAC564] text-transparent bg-clip-text"
          >
            Hapus{" "}
          </a>
          <Link
            to={{ pathname: "/UpdateKategoti" }}
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

export default KategoriDetail;
