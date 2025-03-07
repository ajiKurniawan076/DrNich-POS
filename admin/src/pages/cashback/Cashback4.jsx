import React, { useContext, useEffect, useRef, useState } from "react";
import { navContext } from "../../App2";
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iTamPu from "../../assets/iconkasir/iTamPu.svg";
import axios from "axios";
import { Link } from "react-router-dom";

export const Cashback4 = () => {
  const [kesbek, setKesbek] = useState([]);
  const { setNav, setLink, asc, setSort } = useContext(navContext);
  const { dataKorup, setDataKorup } = useState([]);
  const [tampil,setTampil] = useState([])
  const cariRef = useRef(null)

  const cari = () => {
    const filter = kesbek.filter((item)=>item.namaPromo.toLowerCase().includes(cariRef.current.value))
    setTampil(filter)
  }
  useEffect(() => {
    const fetchdata = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/promo/promo")
        .then((response) => {
          const filterr = response.data.filter(
            (item) => item.jenis == "Cashback"
          );
          setKesbek(filterr);
          setTampil(filterr)
          // filter detailpromo
          // filterr.forEach((promo) => {
          //   console.log(promo.promoDetail);
          // });
        });
    };
    fetchdata();
    setLink('/pos/promo')
    setSort(true)
    setNav("Cashback");
    document.title = "Cashback";
  }, []);

useEffect(()=>{

        if(asc=='asc'){
          const sorting = [...tampil].sort((a,b)=> a.namaPromo.localeCompare(b.namaPromo))
          console.log(sorting)
          setTampil(sorting)
        }
        else if(asc=='desc'){
          const sorting = [...tampil].sort((a,b)=> b.namaPromo.localeCompare(a.namaPromo))
          console.log(sorting)
          setTampil(sorting)
        }
      },[asc])

  kesbek.forEach((promo) => {
    console.log(promo.promoDetail);
  });

 

  return (
    <div className="flex flex-col px-7 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]">
      {kesbek.length === 0 ? (
        <div className="flex justify-center items-center h-full my-auto ">
          Data tidak ada
        </div>
      ) : (
        <div className='flex flex-col overflow-auto gap-[10px] mx-3 h-full'>
          <form className="mb-5 flex gap-2 border border-[#BDBDBD] rounded-xl items-center p-3">
            <img src={iCari} alt="Cari" />
              <input 
              ref={cariRef}
              onChange={cari}
              type="text" className="text-sm w-full h-[30px] focus:outline-none" placeholder="Cari..."
            />
          </form>
          {tampil.map((data, i) => (
            <Link
              to={{
                pathname: `/pos/cashbackDetail/${data._id}`,
              }}
              state={dataKorup}
              className="grid place-items-start w-full border border-[#BDBDBD] rounded-xl p-4"
              key={i}
            >
              <p className="font-medium">{data.namaPromo}</p>
              <div className="flex justify-between items-start text-[#BDBDBD] w-full">
                <p>{data.cashback}</p>
                <p className="text-[10px] text-[#EAC564]">{data.keterangan}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <a href='tambahcashback' className='flex mt-auto'>
        <button className='flex justify-center gap-2 text-white text-[14px] bg-gradient-to-r rounded-xl from-[#EAC564] to-[#C2A353] w-full p-4 mx-3'>
          <img src={iTamPu} alt="TambahPu" />
          <p>Tambah Cashback</p>
        </button>
      </a>
    </div>
  );
};
