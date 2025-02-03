import React, { useEffect, useState } from "react";
import Navbar from "../auth/navbar";
import Footer from "../auth/footer";
import ArrowRightDisable from "../../components/ArrowRight-Disable";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SecondCardLayanan from "../../components/SecondCardLayanan";
import LayananPopuler from "../../components/layananPopuler";
import ProdukTerbaru from "../../components/ProdukTerbaru";
function DetailJenisLayanan() {
  const navigate = useNavigate();
  const { idJenis } = useParams();

  const [listLayanan, setListLayanan] = useState();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const resJenis = (
        await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/layanan/getJenisLayananById/${idJenis}`
        )
      ).data;
      const resList = (
        await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/layanan/getLayananByJenisLayanan/${idJenis}`
        )
      ).data;
      setListLayanan(resList);
      setJudul(resJenis.nama);
      setDeskripsi(resJenis.deskripsi);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <section className="w-full flex flex-col items-center ">
        <div className="fixed w-full z-30">
          <Navbar selected={"Layanan"} />
        </div>
        <div className="flex items-center w-[90%] lg:w-4/5  justify-start space-x-2 mt-4 pt-20 ">
          <a
            onClick={() => navigate("/")}
            className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
            Beranda
          </a>
          <ArrowRightDisable />
          <a
            onClick={() => navigate("/layanan")}
            className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
            Layanan
          </a>
          <ArrowRightDisable />
          <a
            onClick={() => navigate("/layanan")}
            className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
            {judul}
          </a>
        </div>
        {loading ? (
          <>
            <h1>Loading..</h1>
          </>
        ) : error ? (
          <>
            <h1>{error}</h1>
          </>
        ) : (
          <main className="w-[90%] lg:w-[80%] flex flex-col mt-6 space-y-3">
            <h1 className="text-base font-medium font-SFPro text-secondary lg:text-2xl leading-5">
              {judul}
            </h1>
            <p className="max-w-full text-start font-SFPro text-text text-xs lg:text-lg">
              {deskripsi}
            </p>

            <h1 className="font-SFPro font-medium pt-4 lg:text-xl text-text text-sm">
              Daftar Treatment
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  items-center space-y-3 w-full">
              {listLayanan?.map((item) => (
                <div
                  key={item._id}
                  className=""
                  onClick={() =>
                    navigate(`/layanan/detail/${idJenis}/${item._id}`)
                  }>
                  <SecondCardLayanan item={item} />
                </div>
              ))}
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

export default DetailJenisLayanan;
