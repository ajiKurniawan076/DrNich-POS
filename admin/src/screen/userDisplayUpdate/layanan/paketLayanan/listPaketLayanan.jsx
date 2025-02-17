/* eslint-disable no-unused-vars */
import Navbar from "../../../assets/component/navbar";
import { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../../assets/component/LoadingSpinner";

function CreatePaketLayanan() {
  const [nama, setNama] = useState("");
  const [durasi, setDurasi] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [cardDeskripsi, setCardDeskripsi] = useState("");
  const [idJenis, setIdJenis] = useState("");
  const [image, setImage] = useState(null);

  const [jenisLayanan, setJenisLayanan] = useState([]);
  const [loading, setLoading] = useState(false);

  const convertBase64 = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No image selected.");
      return;
    }

    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPEG and PNG files are allowed.");
      return;
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      toast.error("File is too large. Maximum file size is 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImage(reader.result);
    reader.onerror = () => toast.error("Failed to process the image.");
  };

  // Form Submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate Inputs
    if (!nama || !durasi || !harga || !deskripsi || !idJenis || !image) {
      toast.error("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/layanan/tambahLayanan`,
        { nama, durasi, harga, deskripsi, image, cardDeskripsi, idJenis },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Layanan successfully created!");
      setTimeout(() => {
        toast.success("Redirecting...");
        window.location.href = "/layanan";
      }, 3000);
      setNama("");
      setDurasi("");
      setHarga("");
      setDeskripsi("");
      setCardDeskripsi("");
      setIdJenis("");
      setImage(null);
    } catch (err) {
      console.error(err);
      toast.error(
        `Failed to create layanan: ${
          err.response?.data?.message || "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="container h-screen flex flex-col items-center">
        <Navbar />
        <ToastContainer />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <section className="w-full lg:pt-14">
            <div className="h-screen w-full p-10 flex items-center justify-center">
              <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-10 w-full mt-10">
                <div className="w-full lg:w-1/4 p-5 border rounded-md shadow-md bg-white">
                  <h3 className="text-xl font-semibold mb-4 font-montserrat">
                    Product Image
                  </h3>
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
                </div>

                <div className="w-full lg:w-3/4 p-5 border rounded-md bg-white shadow-md">
                  <h3 className="text-xl font-montserrat font-semibold mb-4">
                    General Information
                  </h3>
                  <form
                    onSubmit={submitHandler}
                    className="flex flex-col space-y-4">
                    <div>
                      <label className="block font-montserrat text-gray-700 mb-1">
                        Nama Layanan
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md font-montserrat"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <label className="block text-gray-700 mb-1 font-montserrat">
                          Jenis Layanan
                        </label>
                        <select
                          className="w-full p-2 border font-montserrat rounded-md"
                          value={idJenis}
                          onChange={(e) => setIdJenis(e.target.value)}
                          required>
                          <option value="">Pilih Jenis Layanan</option>
                          {jenisLayanan.map((jenis) => (
                            <option key={jenis._id} value={jenis._id}>
                              {jenis.nama}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-1/2">
                        <label className="block text-gray-700 font-montserrat mb-1">
                          Harga
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border font-montserrat rounded-md"
                          value={harga}
                          onChange={(e) => setHarga(e.target.value)}
                          placeholder="Enter price"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-gray-700 font-montserrat mb-1">
                          Durasi
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border font-montserrat rounded-md"
                          value={durasi}
                          onChange={(e) => setDurasi(e.target.value)}
                          placeholder="Masukan Durasi Layanan"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-around w-full  space-x-2">
                      <div className="w-3/5">
                        <label className="block text-gray-700 font-montserrat mb-1">
                          Product Description
                        </label>
                        <textarea
                          className="w-full p-2 border rounded-md font-montserrat"
                          value={deskripsi}
                          onChange={(e) => setDeskripsi(e.target.value)}
                          placeholder="Enter product description"
                          rows="4"
                        />
                      </div>
                      <div className="w-2/5">
                        <label className="block text-gray-700 font-montserrat mb-1">
                          Card Description
                        </label>
                        <textarea
                          className="w-full p-2 border rounded-md font-montserrat"
                          value={cardDeskripsi}
                          onChange={(e) => setCardDeskripsi(e.target.value)}
                          placeholder="Enter product description"
                          rows="4"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-600 text-white p-1 rounded-xl font-montserrat font-medium">
                      Tambah Layanan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default CreatePaketLayanan;
