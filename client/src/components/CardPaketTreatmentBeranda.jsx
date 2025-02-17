import React, { useEffect, useState, useCallback } from "react";
import CardPaketLayananBeranda from "./CardPaketTreatment copy";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PaketTreatmentBeranda() {
  const navigate = useNavigate();
  const [layanan, setLayanan] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);

  // Function untuk mengambil data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Cek data di localStorage
      const cachedLayanan = localStorage.getItem("paketlayananData");
      const cacheTimestamp = localStorage.getItem("paketlayananTimestamp");
      const cacheExpiry = 5 * 60 * 1000; // Cache berlaku 5 menit

      if (
        cachedLayanan &&
        cacheTimestamp &&
        Date.now() - cacheTimestamp < cacheExpiry
      ) {
        const parsedLayanan = JSON.parse(cachedLayanan);
        setLayanan(parsedLayanan);
        setLimit(Math.min(parsedLayanan.length, 6));
        console.log("Loaded from localStorage:", parsedLayanan);
        setLoading(false);
        return;
      }

      // Ambil dari API jika cache tidak ditemukan atau expired
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/paketLayanan/getAllpaketLayanan`,
        { timeout: 10000 }
      );

      // Urutkan berdasarkan jumlah reservasi
      const sortedLayanan = response.data.sort(
        (a, b) => b.reservedCount - a.reservedCount
      );

      // Simpan ke localStorage dengan timestamp
      localStorage.setItem("paketlayananData", JSON.stringify(sortedLayanan));
      localStorage.setItem("paketlayananTimestamp", Date.now());

      setLayanan(sortedLayanan);
      setLimit(Math.min(sortedLayanan.length, 6));
      console.log("Fetched from API:", sortedLayanan);
    } catch (error) {
      setError(
        error.code === "ECONNABORTED"
          ? "Request timed out. Please try again later."
          : error.response?.data?.message || "An error occurred"
      );
      console.error("Error fetching data:", error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Ambil data saat komponen mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section className="flex flex-col my-[15px] w-full items-center">
      <main className="w-full flex justify-between">
        <h1 className="text-[#464646] text-base lg:text-xl font-medium font-SFPro leading-[25px] tracking-tight">
          Paket Treatment
        </h1>
        <h1
          className="font-SFPro text-xs text-secondary font-medium lg:text-base cursor-pointer tracking-tight"
          onClick={() => navigate("/layanan/paketTreatment")}>
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
          <div className="flex lg:justify-start justify-center items-center">
            <div className="carousel carousel-center w-full lg:w-full">
              <div className="carousel-item gap-2 py-4">
                {layanan.length > 0 ? (
                  layanan.slice(0, limit).map((item) => (
                    <div key={item._id}>
                      <CardPaketLayananBeranda item={item} />
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

export default PaketTreatmentBeranda;
