/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../../../assets/component/navbar";
import axios from "axios";
import ConfirmPopUp from "../../../assets/component/confirmPopUp";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [productType, setProductType] = useState([]);

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState("");
  const [manfaat, setManfaat] = useState("");
  const [caraPakai, setCaraPakai] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState("");
  const [tipeProduk, setTipeProduk] = useState("");

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resCat = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/produk/getAllkategoriProduk`
        );
        const resType = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/produk/getAllproductType`
        );
        if (!resCat?.data || !resType?.data) {
          throw new Error("Data is empty or undefined");
        }
        setCategoryProduct(resCat.data);
        setProductType(resType.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch data", {
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setOpen(false);
    setLoading(true);

    try {
      if (!nama.trim()) {
        throw new Error("Mohon isi nama produk!");
      }

      if (!deskripsi.trim()) {
        throw new Error("Mohon isi deskripsi produk!");
      }

      if (!image) {
        throw new Error("Mohon pilih gambar produk!");
      }

      if (!manfaat.trim()) {
        throw new Error("Mohon isi manfaat produk!");
      }

      if (!caraPakai.trim()) {
        throw new Error("Mohon isi cara pakai produk!");
      }

      if (!harga.trim()) {
        throw new Error("Mohon isi harga produk!");
      }

      if (!kategori) {
        throw new Error("Mohon pilih kategori produk!");
      }

      const parsedHarga = parseFloat(harga);
      if (isNaN(parsedHarga) || parsedHarga <= 0) {
        throw new Error("Please enter a valid price");
      }

      const payload = {
        nama,
        deskripsi,
        foto: image,
        manfaat,
        cara_pakai: caraPakai,
        harga: parsedHarga,
        kategori,
        tipeProduk: tipeProduk || null, // Set null if empty or undefined
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/tambahproduk`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message || "Product added successfully!", {
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/produk");
      }, 3000);

      setNama("");
      setDeskripsi("");
      setImage("");
      setManfaat("");
      setCaraPakai("");
      setHarga("");
      setKategori("");
      setTipeProduk(""); // Reset tipeProduk
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "An error occurred",
        { autoClose: 5000 }
      );
    } finally {
      setLoading(false);
    }
  };

  const convertBase64 = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No image selected", { autoClose: 3000 });
      return;
    }
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPEG and PNG files are allowed.", {
        autoClose: 3000,
      });
      return;
    }

    const maxSize = 2 * 1024 * 1024; // 2MB size limit
    if (file.size > maxSize) {
      toast.error("File is too large. Maximum file size is 2MB.", {
        autoClose: 3000,
      });
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
          Apakah Anda yakin ingin mengubah data produk ini?
          <div className="flex justify-between bg-white mt-4">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded-md"
              onClick={() => setOpen(false)}>
              Batal
            </button>
            <button
              className="px-4 py-2 bg-primary text-white rounded-md"
              onClick={submitHandler}>
              Tambah
            </button>
          </div>
        </ConfirmPopUp>
        <ToastContainer />
        <Navbar />
        {loading ? (
          <>
            <div className="w-full h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary shadow-primary drop-shadow-sm"></div>
            </div>
          </>
        ) : (
          <section className="w-full lg:pt-20  flex flex-col items-center justify-center min-h-screen ">
            <div className="w-[90%] p-4 pt-4 h-auto  flex items-start space-x-4">
              <div className="w-full h-[90%] lg:w-full p-5 border rounded-md shadow-md bg-white">
                <h3 className="text-xl font-semibold mb-4 font-montserrat">
                  Gambar Produk
                </h3>
                <div className="flex flex-col space-y-4">
                  {image ? (
                    <img
                      src={image}
                      alt="Uploaded Preview"
                      className="w-auto h-80 aspect-video object-cover rounded-md border"
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
                      Hapus
                    </button>
                    <label className="px-4 py-2 font-montserrat bg-blue-600 text-white rounded-md cursor-pointer">
                      Tambah
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
              <form className="flex flex-col w-full h-full lg:w-3/4 items-center justify-center rounded-3xl">
                <div className="w-full h-full space-x-4 flex justify-center items-center">
                  <div className="w-full p-5 border rounded-md shadow-md bg-white">
                    <h3 className="text-xl font-semibold mb-4 font-montserrat">
                      Detail Produk
                    </h3>
                    <div className="flex flex-col space-y-4">
                      <div>
                        <label className="block text-gray-700 font-montserrat mb-1">
                          Nama Produk
                        </label>
                        <input
                          type="text"
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                          placeholder="Nama Produk"
                          className="border rounded-md w-full p-2 font-montserrat"
                        />
                      </div>

                      <div className="w-96">
                        <label className="block text-gray-700 font-montserrat mb-1">
                          Deskripsi Produk
                        </label>
                        <textarea
                          type="text"
                          className="w-full p-2 border rounded-md font-montserrat"
                          value={deskripsi}
                          onChange={(e) => setDeskripsi(e.target.value)}
                          placeholder="Deskripsi"
                          rows="4"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-montserrat mb-1">
                          Cara Pakai
                        </label>
                        <textarea
                          type="text"
                          className="w-full p-2 border rounded-md font-montserrat"
                          value={caraPakai}
                          onChange={(e) => setCaraPakai(e.target.value)}
                          placeholder="Cara Pemakaian Produk"
                          rows="4"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-5 h-full border rounded-md shadow-md bg-white">
                    <div className="flex flex-col space-y-4">
                      <div>
                        <label className="block text-gray-700 font-montserrat mb-1">
                          Manfaat
                        </label>
                        <textarea
                          type="text"
                          className="w-full p-2 border rounded-md font-montserrat"
                          value={manfaat}
                          onChange={(e) => setManfaat(e.target.value)}
                          placeholder="Manfaat Produk"
                          rows="4"
                        />
                      </div>

                      <div className="w-96">
                        <label className="block text-gray-700 font-montserrat mb-1">
                          Harga
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md font-montserrat"
                          value={harga}
                          onChange={(e) => setHarga(String(e.target.value))}
                          placeholder="Harga Produk"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-montserrat mb-1">
                          Kategori Produk
                        </label>
                        <select
                          className="w-full p-2 border rounded-md font-SFPro pt-2"
                          value={kategori}
                          onChange={(e) => setKategori(e.target.value)}>
                          <option className="" value="" disabled>
                            Pilih katagori produk
                          </option>
                          {categoryProduct && categoryProduct.length > 0 ? (
                            categoryProduct.map((cat) => (
                              <option
                                className="font-montserrat text-sm"
                                value={cat._id}
                                key={cat._id}>
                                {cat.name}
                              </option>
                            ))
                          ) : (
                            <option
                              disabled
                              className=" lg:p-2 p-1 rounded-md   ">
                              <p className="font-normal">
                                Kategori produk tidak ditemukan
                              </p>
                            </option>
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-montserrat mb-1">
                          Tipe Produk
                        </label>
                        <select
                          className="w-full p-2 border rounded-md font-SFPro pt-2"
                          value={tipeProduk}
                          onChange={(e) => setTipeProduk(e.target.value)}>
                          <option className="" value="" disabled>
                            Pilih tipe produk
                          </option>
                          {productType && productType.length > 0 ? (
                            productType.map((cat) => (
                              <option
                                className="font-montserrat text-sm"
                                value={cat._id}
                                key={cat._id}>
                                {cat.name}
                              </option>
                            ))
                          ) : (
                            <option
                              disabled
                              className=" lg:p-2 p-1 rounded-md   ">
                              <p className="font-normal">
                                Tipe produk tidak ditemukan
                              </p>
                            </option>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => (setOpen(true), e.preventDefault())}
                  className="p-2 bg-primary w-full text-white font-SFPro mt-4 px-10 rounded-xl">
                  Tambah
                </button>
              </form>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default AddProduct;
