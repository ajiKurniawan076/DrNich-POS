import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// produk1

function PromoLainnya() {
  const navigate = useNavigate();
  const [produk, setProduk] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(0);

  const data = async () => {
    try {
      console.log("FETCHING PROMO LAINNYA");
      const response = (
        await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/promo/getAllpromo  `
        )
      ).data;
      if (response.length > 6) {
        setLimit(6);
      } else {
        setLimit(response.length);
      }

      const sorted = response.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setProduk(sorted);

      console.log("PRODUCT DATA :", produk);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    data();
  }, []);

  return (
    <section className="flex flex-col my-[26px] w-full items-center">
      <main className="w-full flex justify-between">
        <h1 className="text-[#464646] text-base lg:text-xl font-medium font-SFPro leading-[25px] tracking-tight">
          Promo Lainnya
        </h1>
        <h1
          className="font-SFPro text-xs text-secondary font-medium lg:text-base cursor-pointer  tracking-tight"
          onClick={() => navigate("/promo")}>
          Lihat Semua
        </h1>
      </main>
      {loading ? (
        <>
          <div className="h-full w-full flex items-center justify-center">
            <h1 className="font-SFPro text-base text-secondary font-medium">
              Loading..
            </h1>{" "}
          </div>
        </>
      ) : error ? (
        <>
          <div className="h-full w-full flex items-center justify-center">
            <h1 className="font-SFPro text-base text-red-800 font-medium">
              {error}
            </h1>{" "}
          </div>
        </>
      ) : (
        <div className="flex flex-col w-full lg:w-full pt-[15px] lg:pt-0 ">
          <div className="flex lg:justify-start justify-center items-center   lg:pt-0  ">
            <div className="carousel carousel-center w-full lg:w-full space-x-[10px]  ">
              <div className="carousel-item gap-6">
                {produk ? (
                  produk.slice(0, limit).map((item) => (
                    <div
                      className="w-[207px] h-[221px] rounded-[10px] flex flex-col items-center bg-white border border-disable-text"
                      key={item._id}>
                      <img
                        src={item.fotoMobile}
                        alt={item.nama}
                        className="w-[207px] h-[151px] object-cover rounded-t-[10px]"
                      />
                      <div className="w-full h-full flex items-center justify-center">
                        <h1 className=" px-[12px] text-left font-SFPro font-medium text-xs leading-[25px] line-clamp-2 tracking-tight ">
                          {item.nama}
                        </h1>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <h1 className="font-SFPro text-base text-secondary font-medium">
                      Promo Tidak Ditemukan
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PromoLainnya;
