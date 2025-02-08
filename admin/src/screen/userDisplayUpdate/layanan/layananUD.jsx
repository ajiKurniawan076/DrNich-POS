/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../../../assets/component/navbar.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import ConfirmPopUp from "../../../assets/component/confirmPopUp";

function LayananUD() {
  const { id } = useParams();
  const [nama, setNama] = useState("");
  const [durasi, setDurasi] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [cardDeskripsi, setCardDeskripsi] = useState("");
  const [idJenis, setIdJenis] = useState("");
  const [image, setImage] = useState(null);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [jenisLayanan, setJenisLayanan] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJenisLayanan = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/layanan/getAllJenisLayanan`
        );
        const sortedJenisLayanan = response.data.sort(
          (b, a) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setJenisLayanan(sortedJenisLayanan);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    const fetchDataLayanan = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/layanan/getLayananById/${id}`
        );
        setNama(response.data.nama);
        setDurasi(response.data.durasi);
        setHarga(response.data.harga);
        setDeskripsi(response.data.deskripsi);
        setCardDeskripsi(response.data.cardDeskripsi);
        setIdJenis(response.data.idJenis);
        setImage(response.data.image);
        console.log("dataa : ", response.data);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDataLayanan();
    fetchJenisLayanan();
  }, [id]);

  useEffect(() => {
    console.log("Jenis from API:", idJenis);
    console.log(
      "Available JenisLayanan:",
      jenisLayanan.map((j) => j._id)
    );
  }, [idJenis, jenisLayanan]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("jenis update :", idJenis);
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/layanan/updateLayanan/${id}`,
        {
          idJenis: idJenis,
          durasi: durasi,
          harga: harga,
          deskripsi: deskripsi,
          cardDeskripsi: cardDeskripsi,
          image: image,
          nama: nama,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure proper content type
          },
        }
      );
      console.log("updated", data);
      setSuccessMessage(data.message);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/layanan/deleteLayanan/${id}`
      );
      setNama("");
      setDurasi("");
      setHarga("");
      setDeskripsi("");
      setIdJenis("");
      setImage(null);
      setSuccessMessage(res.data.message);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
      setOpen(false); // Close the confirmation pop-up after delete
    }
  };

  const convertBase64 = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError("No image selected");
      return;
    }
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      setError("Invalid file type. Only JPEG and PNG files are allowed.");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB size limit
    if (file.size > maxSize) {
      setError("File is too large. Maximum file size is 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  return (
    <>
      <main className="container h-screen flex flex-col items-center">
        <ConfirmPopUp open={open} onClose={() => setOpen(false)}>
          Apakah Anda yakin ingin menghapus layanan ini?
          <div className="flex justify-between bg-white mt-4">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded-md"
              onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md"
              onClick={handleDelete}>
              Delete
            </button>
          </div>
        </ConfirmPopUp>
        <Navbar />
        <section className="w-full lg:pt-14">
          <div
            className="h-screen w-full p-10 flex items-center justify-center"
            onClick={() => setOpen(false)}>
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
                {error && <p className="text-red-500">{error}</p>}
                {successMessage && (
                  <p className="text-green-500">{successMessage}</p>
                )}
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
                        value={idJenis || ""}
                        onChange={(e) => setIdJenis(e.target.value)}
                        required>
                        <option value="" disabled>
                          Pilih Jenis Layanan
                        </option>
                        {jenisLayanan.length > 0 ? (
                          jenisLayanan.map((jenis) => (
                            <option key={jenis._id} value={jenis._id}>
                              {jenis.nama}
                            </option>
                          ))
                        ) : (
                          <option disabled>Loading...</option>
                        )}
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
                    className={`bg-blue-600 text-white p-1 rounded-xl font-montserrat font-medium ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}>
                    Edit Layanan
                  </button>
                </form>
                <button
                  onClick={handleDelete}
                  className={`bg-red-600 text-white p-1 rounded-xl font-montserrat font-medium w-full mt-2
                  ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default LayananUD;
