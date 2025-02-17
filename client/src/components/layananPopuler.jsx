import React, { useEffect, useState } from "react";
import CardLayanan from "./CardLayanan";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LayananPopuler() {
  const navigate = useNavigate();
  const [layanan, setLayanan] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6); // Default limit to 6

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/layanan/getAllLayanan`,
        { timeout: 1000000 } // 10 seconds timeout
      );

      const sortedLayanan = response.data.sort(
        (a, b) => b.reservedCount - a.reservedCount
      );

      setLayanan(sortedLayanan);
      setLimit(sortedLayanan.length > 6 ? 6 : sortedLayanan.length);

      console.log("LAYANAN DATA :", sortedLayanan);
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        setError("Request timed out. Please try again later.");
      } else {
        setError(error.response?.data?.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="flex flex-col my-[15px] w-full items-center">
      <main className="w-full flex justify-between">
        <h1 className="text-[#464646] text-base lg:text-xl font-medium font-SFPro leading-[25px] tracking-tight">
          Treatment Populer
        </h1>
        <h1
          className="font-SFPro text-xs text-secondary font-medium lg:text-base cursor-pointer tracking-tight"
          onClick={() => navigate("/layanan/viewAllTreatment")}>
          Lihat Semua
        </h1>
      </main>
      {loading ? (
        <div className="h-full w-full flex items-center justify-center">
          <h1 className="font-SFPro text-base text-secondary font-medium">
            Loading..
          </h1>
        </div>
      ) : error ? (
        <div className="h-full w-full flex items-center justify-center">
          <h1 className="font-SFPro text-base text-red-800 font-medium">
            {error}
          </h1>
        </div>
      ) : (
        <div className="flex flex-col w-full lg:w-full lg:pt-[15px] ">
          <div className="flex lg:justify-start justify-center items-center ">
            <div className="carousel carousel-center w-full lg:w-full  ">
              <div className="carousel-item gap-2 py-4  ">
                {layanan.length > 0 ? (
                  layanan.slice(0, limit).map((item) => (
                    <div key={item._id}>
                      <CardLayanan item={item} />
                    </div>
                  ))
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <h1 className="font-SFPro text-base text-secondary font-medium">
                      Layanan Tidak Ditemukan
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

export default LayananPopuler;
