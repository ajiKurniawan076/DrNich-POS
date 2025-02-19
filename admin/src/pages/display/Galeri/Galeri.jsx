import { useContext, useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { navContext } from "../../../App2";
import axios from "axios";

export const Galeri = () => {
  const { setNav, setLink } = useContext(navContext);
  const [datax, setdatax] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/gallery/getAllGaleri`
      );
      setdatax(response.data);
      console.log("data: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const dammyData = [
      {
        id: 1,
        nama: "Treatment Facial Gold Acne",
        link: "https://youtube.com",
        namachannel: "dr. nich beauty aesthetic",
        sosialmedia: "Youtube",
        desrkipsi: "ini Treatment Facial Gold Acne",
      },
      {
        id: 2,
        nama: "Treatment Facial Brightening",
        link: "https://youtube.com",
        namachannel: "dr. nich beauty aesthetic",
        sosialmedia: "Whatshapp",
        desrkipsi: "Treatment Facial Brightening",
      },
    ];
    setdatax(dammyData);
    // fetch("/marketing.json").then(
    //     (response) => response.json()
    // ).then((data) => (setdatax(data)
    // ))
    fetchData();
    setNav("Galeri");
    setLink("/pos/display");
  }, []);

  document.title = "Galeri";
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
      <div className="flex flex-col justify-between w-full h-full py-3 px-3">
        {datax.length === 0 ? (
          <div className="flex flex-col w-full h-full items-center justify-center text-black/40">
            Belum Ada Data Galeri
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
            {datax.map((data) => (
              <Link
                to={{
                  pathname: `/pos/galeridetail/${data._id}`,
                }}
                state={data}
                className="w-full border flex  justify-between items-center rounded-xl px-3 py-3"
                key={data._id}>
                <ul className=" flex flex-col place-items-start">
                  <li className="text-[12px] font-medium text-[#454545]">
                    {data.judul}
                  </li>
                </ul>
                <AiOutlineRightCircle size={20} />
              </Link>
            ))}
          </div>
        )}
        <Link
          to={{ pathname: "/pos/galeriAdd" }}
          className="flex justify-center items-center gap-2 h-[44px]  bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] ">
          <AiFillPlusCircle size={20} /> Tambah Galeri
        </Link>
      </div>
    </div>
  );
};

export default Galeri;
