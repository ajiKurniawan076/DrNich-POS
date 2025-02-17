import React, { useEffect, useState } from "react";
import Navbar from "../auth/navbar";
import Footer from "../auth/footer";
import ArrowRightDisable from "../../components/ArrowRight-Disable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardPaketLayanan from "../../components/CardPaketTreatment";
import LayananPopuler from "../../components/layananPopuler";
import ProdukTerbaru from "../../components/ProdukTerbaru";
import LoadingSpinner from "../../components/LoadingSpinner";
function ListPaketLayanan() {
  const [jenisLayanan, setJenisLayanan] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLayanan = async () => {
    try {
      setLoading(true);
      const resJenis = (
        await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/paketLayanan/getAllpaketLayanan`
        )
      ).data;
      setJenisLayanan(resJenis);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "An error occurred");
      console.log(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchLayanan();
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <section className="flex flex-col items-center space-y-4">
        <div className="fixed w-full z-10">
          <Navbar selected={"Layanan"} />
        </div>

        <div className="flex items-center w-[90%] lg:w-4/5  justify-start space-x-2 mt-4 pt-20 ">
          <a
            onClick={() => navigate("/")}
            className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
            Beranda
          </a>
          <ArrowRightDisable />
          <a className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
            Paket Treatment
          </a>
        </div>
        {loading ? (
          <div className="h- h-screen w-full flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="h-fit w-fit bg-white border border-disable-line ">
            <h1 className="font-SFPro text-red-700 font-medium text-base w-full text-center">
              Something Wrong
            </h1>
            <p className="text-text text-sm font-SFPro text-center">{error}</p>
          </div>
        ) : (
          <main className="w-[90%] lg:w-4/5 flex flex-col items-center lg:items-start space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-fit justify-center mt-4">
              {jenisLayanan && jenisLayanan.length > 0 ? (
                jenisLayanan.map((item) => (
                  <div key={item._id}>
                    <CardPaketLayanan item={item} />
                  </div>
                ))
              ) : (
                <p>No data available</p>
              )}
            </div>
            <section className="lg:w-full w-full">
              <LayananPopuler />
            </section>
            <section className="lg:w-full w-full">
              <ProdukTerbaru />
            </section>
          </main>
        )}
        <Footer />
      </section>
    </>
  );
}

export default ListPaketLayanan;
