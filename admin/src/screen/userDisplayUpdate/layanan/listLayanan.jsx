/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Navbar from "../../../assets/component/navbar.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmPopUp from "../../../assets/component/confirmPopUp";
import CardJenisLayanan from "../../../assets/component/cardJenisLayanan";
import CardLayanan from "../../../assets/component/CardLayanan";
import CardPaketLayananBeranda from "../../../assets/component/CardPaketTreatment copy.jsx";
function ListLayanan() {
  const navigate = useNavigate();
  const [layanan, setLayanan] = useState();
  const [jenisLayanan, setJenisLayanan] = useState([]);
  const [paketLayanan, setPaketLayanan] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [jenis, setJenis] = useState("");
  const [image, setImage] = useState(null);
  const [deskripsi, setDeskripsi] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(""); // Clear previous errors before fetching

      const [response, jenisLayanan, paketLayanan] = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/layanan/getAllLayanan`
        ),
        axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/layanan/getAllJenisLayanan`
        ),
        axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/paketLayanan/getAllpaketLayanan`
        ),
      ]);

      setPaketLayanan(
        paketLayanan.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
      setJenisLayanan(
        jenisLayanan.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
      setLayanan(
        response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Djenis = {
      nama: jenis,
      foto: image,
      deskripsi: deskripsi,
    };
    try {
      const res = (
        await axios.post(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/layanan/tambahJenisLayanan`,
          Djenis,
          {
            headers: {
              "Content-Type": "application/json", // Ensure proper content type
            },
          }
        )
      ).data;
      console.log(res);
      setOpen(false);
      fetchData();
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  function convertBase64(e) {
    const file = e.target.files[0];
    if (!file) {
      setError("No image selected.");
      return false;
    }

    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      setError("Invalid file type. Only JPEG and PNG files are allowed.");
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File is too large. Maximum file size is 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = () => {
      setError("Failed to process the image.");
    };
  }

  return (
    <>
      <main className="container h-auto flex flex-col items-center">
        <Navbar selected={"/layanan"} />
        <section className="w-full pt-32 pb-20 flex flex-col items-center">
          <ConfirmPopUp open={open} onClose={() => setOpen(false)}>
            <h1 className="w-full text-center text-xl mb-4 font-bold">
              Jenis Layanan
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-4">
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded Preview"
                    className="w-full h-80 object-cover rounded-md border"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-md font-montserrat flex items-center justify-center text-gray-600">
                    + Add Image
                  </div>
                )}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setImage(null)}
                    className="px-4 py-2 bg-red-600 font-montserrat text-white rounded-md">
                    Remove
                  </button>
                  <label className="px-4 py-2 font-montserrat bg-blue-600 text-white rounded-md cursor-pointer">
                    Add
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={convertBase64}
                    />
                  </label>
                </div>
              </div>
              <input
                type="text"
                placeholder="Jenis Layanan"
                className="w-full p-2 border rounded-md mt-4"
                onChange={(e) => setJenis(e.target.value)}
              />
              <textarea
                placeholder="Deskripsi"
                className="w-full p-2 border rounded-md mt-4"
                onChange={(e) => setDeskripsi(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-4">
                Submit
              </button>
            </form>
          </ConfirmPopUp>

          <ConfirmPopUp open={isEdit} onClose={() => setIsEdit(false)}>
            <h1 className="w-full text-center text-xl mb-4 font-bold">
              Jenis Layanan
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-4">
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded Preview"
                    className="w-full h-80 object-cover rounded-md border"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-md font-montserrat flex items-center justify-center text-gray-600">
                    + Add Image
                  </div>
                )}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setImage(null)}
                    className="px-4 py-2 bg-red-600 font-montserrat text-white rounded-md">
                    Remove
                  </button>
                  <label className="px-4 py-2 font-montserrat bg-blue-600 text-white rounded-md cursor-pointer">
                    Add
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={convertBase64}
                    />
                  </label>
                </div>
              </div>
              <input
                type="text"
                placeholder="Jenis Layanan"
                className="w-full p-2 border rounded-md mt-4"
                onChange={(e) => setJenis(e.target.value)}
              />
              <input
                type="text"
                placeholder="Jenis Layanan"
                className="w-full p-2 border rounded-md mt-4"
                onChange={(e) => setJenis(e.target.value)}
              />
              <textarea
                type="text"
                placeholder="Deskripsi"
                className="w-full p-2 border rounded-md mt-4"
                onChange={(e) => setDeskripsi(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-4">
                Submit
              </button>
            </form>
          </ConfirmPopUp>

          <section className="flex flex-col  w-[70%] items-center space-y-4">
            {isLoading ? (
              <div className="h- h-screen w-full flex justify-center items-center">
                <p>Loading...</p>
              </div>
            ) : error ? (
              <div className="h-fit w-fit bg-white border border-disable-line ">
                <h1 className="font-SFPro text-red-700 font-medium text-base w-full text-center">
                  Something Wrong
                </h1>
                <p className="text-text text-sm font-SFPro text-center">
                  {error}
                </p>
              </div>
            ) : (
              <main className="w-full flex flex-col font-semibold items-center lg:items-start space-y-4">
                <h1 className="font-SFPro w-full text-start lg:text-2xl text-secondary font-medium text-base">
                  Jenis Layanan
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-fit justify-center mt-4">
                  {jenisLayanan && jenisLayanan.length > 0 ? (
                    jenisLayanan.map((item) => (
                      <div key={item._id}>
                        <CardJenisLayanan item={item} />
                      </div>
                    ))
                  ) : (
                    <p>No data available</p>
                  )}
                </div>
              </main>
            )}
          </section>

          <h1 className="text-2xl text-secondary font-semibold text-start w-[70%] mx-auto mt-10">
            Layanan Kami
          </h1>
          <div className="flex flex-col space-y-2 lg:grid lg:grid-cols-4 gap-4 lg:w-[70%] mt-5">
            {Array.isArray(layanan) ? (
              layanan.map((layananItem, index) => (
                <CardLayanan key={index} item={layananItem} />
              ))
            ) : (
              <p>Data is not in the expected format.</p>
            )}
          </div>
          <section className="flex flex-col my-[15px] w-[70%] items-center ">
            <main className="w-full flex justify-between">
              <h1 className="text-[#464646] text-base lg:text-xl font-medium font-SFPro leading-[25px] tracking-tight">
                Paket Treatment
              </h1>
            </main>
            {isLoading ? (
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
              <div className="flex flex-col w-full lg:w-full ">
                <div className="flex lg:justify-start justify-center items-center ">
                  <div className="carousel carousel-center w-full lg:w-full  ">
                    <div className="carousel-item gap-2 py-4  ">
                      {paketLayanan.length > 0 ? (
                        paketLayanan
                          .slice(0, paketLayanan.length)
                          .map((item) => (
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

          <div className="fixed space-x-4 flex right-0 bottom-0 p-4 rounded-lg">
            <button
              onClick={() => navigate("/layanan/tambahLayanan")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Tambah Layanan
            </button>
            <button
              onClick={() => setOpen(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Tambah Jenis Layanan
            </button>
            <button
              onClick={() => navigate("layanan/tambahPaketLayanan")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Tambah Paket Layanan
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default ListLayanan;
