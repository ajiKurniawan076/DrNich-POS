import { useRef, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import ikon from "../../assets/ikon.svg";
import add from "../../assets/add.svg";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import { Link } from "react-router-dom";
import axios from "axios";

export const Supplier = () => {
  const { setNav, setSort, asc, setLink } = useContext(navContext);
  const [datax, setDatax] = useState([]);
  const [tampil, setTampil] = useState([]);
  const [datasupplier, setdatasupplier] = useState([]);
  const cari = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/user/supplier")
        .then((response) => (setDatax(response.data),setTampil(response.data)));
    };
    fetchData();
    setNav("Supplier");
    setLink('/pos/user')
    setSort(true)
  }, []);

useEffect(()=>{

  if(asc=='asc'){
    const sorting = [...tampil].sort((a,b)=> a.namaPerusahaan.localeCompare(b.namaPerusahaan))
    console.log(sorting)
    setTampil(sorting)
  }
  else if(asc=='desc'){
    const sorting = [...tampil].sort((a,b)=> b.namaPerusahaan.localeCompare(a.namaPerusahaan))
    console.log(sorting)
    setTampil(sorting)
  }
},[asc])



  const filterData = () =>{ 
    
    const filter = datax.filter(
    (data) =>
      data.namaPerusahaan?.toLowerCase().includes(cari.current.value.toLowerCase()) ||
      data.nomorTelepon?.toLowerCase().includes(cari.current.value.toLowerCase())
  );
  setTampil(filter)
}
  // console.log(filterData);

  document.title = "Supplier";
  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] h-screen overflow-auto overflow-y-scroll scrollbar-hide px-7">
      <form className="my-5 flex gap-2 mx-3 border border-[#BDBDBD] rounded-xl items-center p-3">
        <AiOutlineSearch size={20} />
        <input
        onChange={filterData}
          ref={cari}
          type="text"
          className="text-sm w-full h-[30px] focus:outline-none"
          placeholder="Cari..."
        ></input>
      </form>
      <div className="flex flex-col justify-between w-full h-full py-3 px-3 text-[12px] overflow-auto">
        {datax.length === 0 ? (
          <div className="flex flex-col w-full h-full items-center justify-center text-[#454545]">
            Belum Ada Data Supplier!
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
            {tampil.map((supp) => (
              <Link
                to={{
                  pathname: `/pos/supplierdet/${supp._id}`,
                }}
                className="w-full border flex justify-between items-center rounded-xl border-[#BDBDBD] px-3 py-3"
                key={supp._id}
              >
                <ul className=" flex flex-col place-items-start text-[12px]">
                  {/* <li>{supp.id}</li> */}
                  <li className="font-medium  text-[#454545]">
                    {supp.namaPerusahaan}
                  </li>
                  <li className="text-[#BDBDBD] font-normal">
                    {supp.nomorTelepon}
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
          href="addsupplier"
          className=" w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-bold rounded-xl p-3 text-[14px] mt-3"
        >
          <img src={add} className="h-[20px] w-[20px]" /> Tambah Supplier
        </a>
      </div>
    </div>
  );
};
