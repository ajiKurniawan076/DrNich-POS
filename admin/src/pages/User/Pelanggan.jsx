import { useContext, useEffect, useRef, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import ikon from "../../assets/ikon.svg";
import add from "../../assets/add.svg";
import { Link } from "react-router-dom";
import { navContext } from "../../App2";
import axios from "axios";

export const Pelanggan = () => {
  const { setNav, setSort, asc, setLink, ascP } = useContext(navContext);
  const [datax, setdatax] = useState([]);
  const [tampil, setTampil] = useState([]);
  const cariRef = useRef(null)
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/user/pelanggan")
        .then((response) => {setdatax(response.data)
          setTampil(response.data)
        });
    };
    fetchData();
    setNav("Pelanggan");
    setSort(true)
    setLink('/pos/users')
  }, []);

  useEffect(()=>{

    if(asc=='asc'){
      const sorting = [...tampil].sort((a,b)=> a.namaPelanggan.localeCompare(b.namaPelanggan))
      console.log(sorting)
      setTampil(sorting)
    }
    else if(asc=='desc'){
      const sorting = [...tampil].sort((a,b)=> b.namaPelanggan.localeCompare(a.namaPelanggan))
      console.log(sorting)
      setTampil(sorting)
    }
    else if(ascP=='ascP'){
      const sorting = [...tampil].sort((a,b)=> b.poin - a.poin)
      console.log(sorting)
      setTampil(sorting)
    }
    else if(ascP=='descP'){
      const sorting = [...tampil].sort((a,b)=> a.poin - b.poin)
      console.log(sorting)
      setTampil(sorting)
    }
  },[asc, ascP])
  const filterData = () => {
    
    const filterr =  datax.filter(
    (data) =>
      data.namaMarketing?.toLowerCase().includes(cariRef.current.value.toLowerCase()) ||
      data.nomorTelepon?.toLowerCase().includes(cariRef.current.value.toLowerCase())
  )
  setTampil(filterr)
  }
  // console.log(filterdata);

  document.title = "Pelanggan";
  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7">
      <form className="my-5 flex gap-2 mx-3 border border-[#BDBDBD] rounded-xl items-center p-3">
        <AiOutlineSearch size={20} />
        <input
          onChange={filterData}
          ref={cariRef}
          type="text"
          className="text-sm w-full h-[30px] focus:outline-none"
          placeholder="Cari..."
        ></input>
      </form>
      <div className="flex flex-col justify-between w-full h-full py-3 px-3 text-[12px]">
        {tampil.length === 0 ? (
          <div className="flex flex-col w-full min-h-screen items-center justify-center text-[#cdcdcd]">
            Tidak Ada Data
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
            {tampil.map((data, i) => (
              <Link
                to={{
                  pathname: `/pos/pelanggandetail/${data._id}`,
                }}
                className="w-full border flex justify-between items-center rounded-xl border-[#BDBDBD] px-3 py-3"
                key={i}
              >
                <ul className=" flex flex-col place-items-start text-[12px]">
                  <li className="font-medium  text-[#454545]">
                    {data.namaPelanggan}
                  </li>
                  <li className="text-[#BDBDBD] font-normal">
                    {data.nomorTelepon}
                  </li>
                </ul>
                <img src={ikon} className="h-[20px] w-[20px]" />
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="flex mt-auto mx-2">
        <a
          href="addpelanggan"
          className="flex w-full justify-center items-center gap-2 bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-bold rounded-xl p-3 text-[14px] mt-3"
        >
          <img src={add} className="h-[20px] w-[20px]" /> Tambah Pelanggan
        </a>
      </div>
    </div>
  );
};
