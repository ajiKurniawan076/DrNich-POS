import { useContext, useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { navContext } from "../../../App2";
import axios from "axios";

export const Rating = () => {
  const { setNav, setLink } = useContext(navContext);
  const [datax, setdatax] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        // "http://localhost:8000/api/ulasan/getAllulasan"
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/ulasan/getAllulasan`
      );
      setdatax(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // const dummydata = [
    //   {
    //     id: 1,
    //     nama: "Diana",
    //     deskripsi:
    //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, asperiores?",
    //   },
    //   {
    //     id: 2,
    //     nama: "hana",
    //     deskripsi:
    //       "perawatan di dr.nich benar benar mengubah kulit saya lebih cerah dan halus",
    //   },
    // ];
    // setdatax(dummydata);
    // fetch("/marketing.json").then(
    //     (response) => response.json()
    // ).then((data) => (setdatax(data)
    // ))
    setNav("Rating");
  }, []);

  document.title = "Rating";
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
      <div className="flex flex-col justify-between w-full h-full py-3 px-3">
        {datax.length === 0 ? (
          <div className="flex flex-col w-full h-full items-center justify-center text-black/40">
            Belum Ada Data Rating
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
            {datax.map((data) => (
              <Link
                to={{
                  pathname: `/pos/ratingdetail/${data._id}`,
                }}
                state={data}
                className="w-full border flex  justify-between items-center rounded-xl px-3 py-3"
                key={data.id}
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
          to={{ pathname: "/pos/retingAdd" }}
          className="flex justify-center items-center gap-2 h-[44px]  bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] "
        >
          <AiFillPlusCircle size={20} />
          Tambah Rating
        </Link>
      </div>
    </div>
  );
};

export default Rating;
