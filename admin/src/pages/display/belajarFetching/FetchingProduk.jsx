import axios from "axios";
import { useEffect, useState } from "react";

const FetchingProduk = () => {
  const [datax, setDatax] = useState([]);
  ////api/pos/produk/Produk
  //
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/produk/Produk")
        .then((response) => setDatax(response.data));
    };
    fetchData();
  }, []);

  console.log(datax);

  return (
    <>
      <div className="flex flex-col px-0 py-3 gap-1 bg-white w-full h-full relative">
        {datax.map((data, i) => (
          <div key={i}>
            <h1>{data.namaProduk}</h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default FetchingProduk;
