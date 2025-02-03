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

export const Terapis = () => {
  const { setNav, setSort, asc } = useContext(navContext);
  const [datax, setdatax] = useState([]);
  const [search, setSearch] = useState("");
  const [tampil, setTampil] = useState([]);
  const cariRef = useRef(null)
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/user/terapis")
        .then((response) => {setdatax(response.data)
           setTampil(response.data)});
    };
    fetchData();
    setNav("Terapis");
    setSort(true)
  }, []);
  useEffect(()=>{

    if(asc=='asc'){
      const sorting = [...tampil].sort((a,b)=> a.namaTerapis.localeCompare(b.namaTerapis))
      console.log(sorting)
      setTampil(sorting)
    }
    else if(asc=='desc'){
      const sorting = [...tampil].sort((a,b)=> b.namaTerapis.localeCompare(a.namaTerapis))
      console.log(sorting)
      setTampil(sorting)
    }
  },[asc])
  const filterData = () => {
    
    const filterr =  datax.filter(
    (data) =>
      data.namaTerapis?.toLowerCase().includes(cariRef.current.value.toLowerCase()) ||
      data.nomorTelepon?.toLowerCase().includes(cariRef.current.value.toLowerCase())
  )
  setTampil(filterr)
}
  // console.log(search);
  // console.log(filterData);

  document.title = "Terapis";
  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] h-screen overflow-y-scroll scrollbar-hide px-7">
      <form className="mt-5 flex gap-2 mx-3 border border-[#BDBDBD] rounded-xl items-center p-3">
        <AiOutlineSearch size={20} />
        <input
          ref={cariRef}
          onChange={filterData}
          type="text"
          className="w-full focus:outline-none"
          placeholder="Cari..."
        ></input>
      </form>
      <div className="flex flex-col justify-between w-full h-full py-3 px-3 text-[12px] overflow-auto">
        {tampil.length === 0 ? (
          <div className="flex flex-col w-full h-full items-center justify-center text-[#454545]">
            Tidak Ada Data
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
            {tampil.map((data, i) => (
              <Link
                to={{
                  pathname: `/pos/terapisdetail/${data._id}`,
                }}
                className="w-full border flex justify-between items-center rounded-xl border-[#BDBDBD] px-3 py-3"
                key={i}
              >
                <ul className=" flex flex-col place-items-start text-[12px]">
                  <li className="font-medium  text-[#454545]">
                    {data.namaTerapis}
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
      <div className="mt-auto">
        <a
          href="addterapis"
          className="flex justify-center items-center gap-2 bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-bold rounded-xl p-3 text-[14px] mt-3"
        >
          <img src={add} className="h-[20px] w-[20px]" /> Tambah Terapis
        </a>
      </div>
    </div>
  );
};
