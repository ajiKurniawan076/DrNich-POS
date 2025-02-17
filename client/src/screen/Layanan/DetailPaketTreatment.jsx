import React, { useEffect, useState } from "react";
import Navbar from "../auth/navbar";
import Footer from "../auth/footer.jsx";
import { useParams, useNavigate } from "react-router-dom";
import ArrowRightDisable from "../../components/ArrowRight-Disable.jsx";
import axios from "axios";
import LayananPopuler from "../../components/layananPopuler.jsx";
import ProdukTerbaru from "../../components/ProdukTerbaru.jsx";
import { sendWhatsAppReservasiLayananMessage } from "../../../../backend/controller/whatsappController.js";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";

function DetailPaketTreatment() {
  const { idTreatment } = useParams();
  const navigate = useNavigate();

  const [jenis, setJenis] = useState("");
  const [judul, setJudul] = useState("");
  const [image, setImage] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [listTreatment, setListTreatment] = useState("");
  const [manfaat, setManfaat] = useState("");
  const [durasi, setDurasi] = useState("");
  const [resDataJenis, setResDataJenis] = useState(null); // State for jenisLayanan data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (idTreatment) {
        const treatmentResponse = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/paketLayanan/getpaketLayananById/${idTreatment}`
        );
        const data = treatmentResponse.data;
        setJudul(data.nama);
        setDeskripsi(data.deskripsi);
        setImage(data.image);
        setDurasi(data.durasi);
        setManfaat(data.manfaat);
        setListTreatment(data.listTreatment);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong");
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idTreatment]);

  return (
    <section className="flex flex-col items-center space-y-4">
      <div className="fixed w-full z-30">
        <Navbar selected={"Layanan"} />
      </div>
      <div className="flex items-center w-[90%] justify-start space-x-2 mt-4 pt-20">
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
          onClick={() =>
            navigate(`/layanan/detailPaketTreatment/${idTreatment}`)
          }
          className="cursor-pointer text-xs text-disable-text  lg:text-sm font-normal">
          {judul}
        </a>
      </div>
      {loading ? (
        <>
          <LoadingSpinner />
        </>
      ) : error ? (
        <>
          <h1>{error}</h1>
        </>
      ) : (
        <main className="w-[90%] lg:[80%] flex flex-col space-y-3 items-center">
          <h1 className="text-secondary  lg:text-2xl  font-SFPro font-medium text-base w-full text-start leading-5 tracking-wide">
            {judul}
          </h1>
          <div className="w-full flex flex-col space-y-4 lg:flex-row lg:justify-start lg:space-x-8">
            <img
              src={image}
              className="w-full h-auto lg:w-96 lg:h-96 object-cover rounded-lg"
              alt={judul}
            />
            <div className="w-full space-y-2 lg:max-w-[60%]">
              <p className="whitespace-pre-line text-xs lg:text-base font-SFPro font-normal text-text leading-4 lg:leading-5 tracking-normal lg:-tracking-tight">
                {deskripsi}
              </p>
              {listTreatment ? (
                <>
                  <p className="whitespace-pre-line text-xs lg:text-base font-SFPro font-normal text-text leading-4 lg:leading-5 tracking-normal lg:-tracking-tight pt-2">
                    Treatment
                  </p>
                  <p className="whitespace-pre-line text-xs lg:text-base font-SFPro font-normal text-text leading-4 lg:leading-5 tracking-normal lg:-tracking-tight">
                    {listTreatment}
                  </p>
                </>
              ) : null}

              {manfaat ? (
                <>
                  <p className="whitespace-pre-line text-xs lg:text-base font-SFPro font-normal text-text leading-4 lg:leading-5 tracking-normal lg:-tracking-tight pt-2">
                    Manfaat
                  </p>
                  <p className="whitespace-pre-line text-xs lg:text-base font-SFPro font-normal text-text leading-4 lg:leading-5 tracking-normal lg:-tracking-tight">
                    {manfaat}
                  </p>
                </>
              ) : null}

              <p className="w-full text-start text-xs lg:text-base  font-SFPro font-normal text-text leading-4 lg:leading-5  tracking-normal lg:-tracking-tight pt-2">
                Durasi Treatment: {durasi}
              </p>
              <button
                className="w-full py-3 lg:w-[15%] lg:mt-8  rounded-xl bg-secondary text-white text-sm font-SFPro font-medium hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.30)] hover:shadow-[0px_8px_12px_6px_rgba(0,0,0,0.15)] transition-all duration-200"
                onClick={() => {
                  sendWhatsAppReservasiLayananMessage(judul);
                }}>
                Reservasi
              </button>
            </div>
          </div>

          <div className="w-full">
            <section className="lg:w-full w-full">
              <LayananPopuler />
            </section>
            <section className="lg:w-full w-full">
              <ProdukTerbaru />
            </section>
          </div>
        </main>
      )}
      <div></div>

      <Footer />
    </section>
  );
}

export default DetailPaketTreatment;
