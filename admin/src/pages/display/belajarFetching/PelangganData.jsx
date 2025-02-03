import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./partikel/Button";

const PelangganData = () => {
  const [datax, setDatax] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.drnich.co.id/api/pos/user/pelanggan"
      );
      setDatax(response.data);
    };
    fetchData();
  }, []);

  const filterdata = datax.filter(
    (data) =>
      data.namaPelanggan.toLowerCase().includes(search.toLowerCase()) ||
      data.nomorTelepon.toLowerCase().includes(search.toLowerCase())
  );
  // console.log(filterdata);

  return (
    <div className="flex flex-col px-0 py-3 gap-1 bg-white w-full h-full relative">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="search"
          placeholder="cari data"
          className="sticky top-0 hover:scale-110 translate duration-200 h-9 border-yellow-700 border p-3 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-yellow-700"
        />
      </form>
      <div className="flex flex-col justify-center gap-2 mt-2">
        {filterdata.length === 0 ? (
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-[14px] text-[#cdcdcd]">Tidak Ada Data</h1>
          </div>
        ) : (
          filterdata.map((data, i) => (
            <Link
              to={{ pathname: `/pelanngandetailni/${data._id}` }}
              className="py-2 px-3 shadow rounded-lg border hover:scale-110 duration-200 hover:border-yellow-600"
              key={i}
            >
              <p className="text-[14px] text-start  mb-1 font-semibold">
                {data.namaPelanggan}
              </p>
              <p className="text-[14px] text-start font-normal">
                {data.nomorTelepon}
              </p>
            </Link>
          ))
        )}
      </div>
      <div className="flex items-center justify-center">
        <Link
          to={{ pathname: "/menambahkanpelanggan" }}
          className="absolute py-2 bottom-0  h-10 bg-yellow-500 w-full rounded-md shadow-sm hover:scale-110 duration-500"
        >
          Tambah Data
        </Link>
      </div>
    </div>
  );
};

export default PelangganData;
