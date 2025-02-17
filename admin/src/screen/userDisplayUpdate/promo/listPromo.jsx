/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../../assets/component/navbar";
import ConfirmPopup from "../../../assets/component/confirmPopUp.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "../../../assets/component/LoadingSpinner.jsx";

function ListPromo() {
  const [promo, setPromo] = useState([]);
  const [name, setName] = useState("");
  const [syarat, setSyarat] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [imageDesktop, setimageDesktop] = useState("");
  const [imageMobile, setimageMobile] = useState("");

  const [editName, setEditName] = useState("");
  const [editSyarat, setEditSyarat] = useState("");
  const [editDeskripsi, setEditDeskripsi] = useState("");
  const [editimageDesktop, setEditimageDesktop] = useState("");
  const [editimageMobile, setEditimageMobile] = useState("");

  const [selectedPromo, setSelectedPromo] = useState(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const imgaeRef1 = useRef(null)
  const imgaeRef2 = useRef(null)
  const imgaeRef1e = useRef(null)
  const imgaeRef2e = useRef(null)

  const fetchPromo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/promo/getAllPromo`
      );
      const data = response.data;
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }
      setPromo(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching promo:", err.message);
      toast.error("Failed to fetch promos. Please try again later.");
    } finally {
      setLoading(false); // Ensure loading is reset
    }
  };

  useEffect(() => {
    fetchPromo();
  }, []);

  const resetFormStates = () => {
    setName("");
    setSyarat("");
    setDeskripsi("");
    setimageDesktop("");
    setEditName("");
    setEditSyarat("");
    setEditDeskripsi("");
    setEditimageDesktop("");
  };

  const handleAddPromo = async (e) => {
    e.preventDefault();
    if (!name || !syarat || !deskripsi || !imageDesktop) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/promo/tambahpromo`,
        {
          nama: name,
          detail: deskripsi,
          syarat: syarat,
          fotoDesktop: imgaeRef1.current.files[0],
          fotoMobile: imgaeRef2.current.files[0],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setPromo((prev) => [...prev, response.data]);
        setOpen(false);
        resetFormStates();
        toast.success("Promo added successfully!");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error adding promo:", err.message);
      toast.error("Failed to add promo. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deletePromo = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/promo/deletePromo/${selectedPromo._id
        }`
      );
      setPromo((prev) => prev.filter((item) => item._id !== selectedPromo._id));
      setConfirmOpen(false);
      toast.success("Promo deleted successfully!");
    } catch (error) {
      setError(error.message);
      console.error("Error deleting promo:", error.message);
      toast.error("Failed to delete promo. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const updatePromo = async (e) => {
    e.preventDefault();
    if (!editName || !editSyarat || !editDeskripsi || !editimageDesktop) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      // formData.append("nama", "nama");
      // formData.append("detail", "nama");
      // formData.append("syarat", "nama");
      // formData.append("fotoDesktop", "nama"); // File input
      // formData.append("fotoMobile", "nama"); // File input
      formData.append("nama", editName);
      formData.append("detail", editDeskripsi);
      formData.append("syarat", editSyarat);
      formData.append("fotoDesktop", imgaeRef1e.current.files[0]); // File input
      formData.append("fotoMobile", imgaeRef2e.current.files[0]); // File input
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      const { data: updatedPromo } = await axios.put(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/promo/updatepromo/${selectedPromo._id
        }`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      )
      setPromo((prev) =>
        prev.map((item) =>
          item._id === selectedPromo._id ? { ...item, ...updatedPromo } : item
        )
      );
      toast.success("Promo updated successfully!");
      resetFormStates();
      setEditing(false);
    } catch (error) {
      setError(error.message);
      console.error("Error updating promo:", error.message);
      toast.error("Failed to update promo. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item, e) => {
    e.preventDefault();
    setEditing(true);
    setSelectedPromo(item);
    setEditName(item.nama);
    setEditSyarat(item.syarat);
    setEditDeskripsi(item.detail);
    setEditimageMobile(item.fotoMobile);
    setEditimageDesktop(item.fotoDesktop);
  };

  const handleDelete = (item, e) => {
    e.preventDefault();
    setConfirmOpen(true);
    setSelectedPromo(item);
  };

  const convertBase64 = (e, setFunction) => {
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
    const maxSize = 5 * 1024 * 1024; // 5MB size limit
    if (file.size > maxSize) {
      toast.error("File is too large. Maximum file size is 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      try {
        setFunction(reader.result);
      } catch (error) {
        toast.error("Failed to process the image. Please try again.");
        console.error("image processing error:", error);
      }
    };
  };

  return (
    <main className="flex flex-col container">
      <Navbar selected={"/listpromo"} />
      <ToastContainer />
      <ConfirmPopup open={open} onClose={() => setOpen(false)}>
        <div className="w-auto flex space-x-4">
          <div className="flex flex-wrap justify-center gap-6">
            {/* Desktop Image Uploader */}
            <div className="w-full max-w-lg p-6 border rounded-lg shadow-lg bg-white">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 font-montserrat">
                Promo Image for Desktop
              </h3>
              <div className="flex flex-col space-y-4 items-center">
                {imageDesktop ? (
                  <img
                    src={imageDesktop}
                    alt="Uploaded Preview"
                    className="w-full max-h-32 object-cover rounded-lg shadow-md border border-gray-300"
                  />
                ) : (
                  <div className="w-full max-h-32 aspect-video bg-gray-100 border border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-600 text-sm">
                    + Add image
                  </div>
                )}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setimageDesktop(null)}
                    className="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition">
                    Remove
                  </button>
                  <label className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition">
                    Add
                    <input
                      type="file"
                      ref={imgaeRef1}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => convertBase64(e, setimageDesktop)}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Mobile Image Uploader */}
            <div className="w-full max-w-lg p-6 border rounded-lg shadow-lg bg-white">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 font-montserrat">
                Promo Image for Mobile
              </h3>
              <div className="flex flex-col space-y-4 items-center">
                {imageMobile ? (
                  <img
                    src={imageMobile}
                    alt="Uploaded Preview"
                    className="w-28 h-auto aspect-[9/16] object-cover rounded-lg shadow-md border border-gray-300"
                  />
                ) : (
                  <div className="w-28 h-auto aspect-[9/16] bg-gray-100 border border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-600 text-sm">
                    + Add image
                  </div>
                )}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setimageMobile(null)}
                    className="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition">
                    Remove
                  </button>
                  <label className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition">
                    Add
                    <input
                      type="file"
                      ref={imgaeRef2}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => convertBase64(e, setimageMobile)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleAddPromo}
            className="flex flex-col w-full lg:w-3/4 items-center justify-center p-2 rounded-3xl">
            <div className="w-full p-5 border rounded-md shadow-md bg-white">
              <h3 className="text-xl font-semibold mb-4 font-montserrat">
                Promo Details
              </h3>
              <div className="flex flex-col space-y-4">
                <div>
                  <label className="block text-gray-700 font-montserrat mb-1">
                    Promo Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="border rounded-md p-2 font-montserrat"
                  />
                </div>

                <div className="w-96">
                  <label className="block text-gray-700 font-montserrat mb-1">
                    Promo Description
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md font-montserrat"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Enter product description"
                    rows="7"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-montserrat mb-1">
                    Syarat dan Ketentuan
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md font-montserrat"
                    value={syarat}
                    onChange={(e) => setSyarat(e.target.value)}
                    placeholder="Enter terms and conditions"
                    rows="4"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="p-2 bg-primary text-white font-SFPro mt-4 px-10 rounded-xl">
              Tambah
            </button>
          </form>
        </div>
      </ConfirmPopup>
      <ConfirmPopup open={editing} onClose={() => setEditing(false)}>
        <div className="w-fit flex space-x-4">
          <div className="flex flex-wrap justify-center gap-6">
            {/* Desktop Image Uploader */}
            <div className="w-full max-w-lg p-6 border rounded-lg shadow-lg bg-white">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 font-montserrat">
                Promo Image for Desktop
              </h3>
              <div className="flex flex-col space-y-4 items-center">
                {editimageDesktop ? (
                  <img
                    src={editimageDesktop}
                    alt="Uploaded Preview"
                    className="w-full max-h-32 object-cover rounded-lg shadow-md border border-gray-300"
                  />
                ) : (
                  <div className="w-full max-h-32 aspect-video bg-gray-100 border border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-600 text-sm">
                    + Add image
                  </div>
                )}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setEditimageDesktop(null)}
                    className="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition">
                    Remove
                  </button>
                  <label className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition">
                    Add
                    <input
                      type="file"
                      ref={imgaeRef1e}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => convertBase64(e, setEditimageDesktop)}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Mobile Image Uploader */}
            <div className="w-full max-w-lg p-6 border rounded-lg shadow-lg bg-white">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 font-montserrat">
                Promo Image for Mobile
              </h3>
              <div className="flex flex-col space-y-4 items-center">
                {editimageMobile ? (
                  <img
                    src={editimageMobile}
                    alt="Uploaded Preview"
                    className="w-28 h-auto aspect-[9/16] object-cover rounded-lg shadow-md border border-gray-300"
                  />
                ) : (
                  <div className="w-28 h-auto aspect-[9/16] bg-gray-100 border border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-600 text-sm">
                    + Add image
                  </div>
                )}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setEditimageMobile(null)}
                    className="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition">
                    Remove
                  </button>
                  <label className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition">
                    Add
                    <input
                      type="file"
                      ref={imgaeRef2e}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => convertBase64(e, setEditimageMobile)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <form
            onSubmit={updatePromo}
            className="flex flex-col w-full lg:w-3/4 items-center justify-center p-2 rounded-3xl">
            <div className="w-full p-5 border rounded-md shadow-md bg-white">
              <h3 className="text-xl font-semibold mb-4 font-montserrat">
                Promo Details
              </h3>
              <div className="flex flex-col space-y-4">
                <div>
                  <label className="block text-gray-700 font-montserrat mb-1">
                    Promo Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Name"
                    className="border rounded-md p-2 font-montserrat"
                  />
                </div>

                <div className="w-96">
                  <label className="block text-gray-700 font-montserrat mb-1">
                    Promo Description
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md font-montserrat"
                    value={editDeskripsi}
                    onChange={(e) => setEditDeskripsi(e.target.value)}
                    placeholder="Enter product description"
                    rows="7"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-montserrat mb-1">
                    Syarat dan Ketentuan
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md font-montserrat"
                    value={editSyarat}
                    onChange={(e) => setEditSyarat(e.target.value)}
                    placeholder="Enter terms and conditions"
                    rows="4"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="p-2 bg-primary text-white font-SFPro mt-4 px-10 rounded-xl">
              Update
            </button>
          </form>
        </div>
      </ConfirmPopup>
      <ConfirmPopup open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <div className="flex flex-col space-y-4 p-8 bg-white rounded-md shadow-md">
          <h1>Anda yakin ingin menghapus promo ini?</h1>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setConfirmOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Cancel
            </button>
            <button
              onClick={() => (setConfirmOpen(false), deletePromo())}
              className="bg-red-500 text-white px-4 py-2 rounded-md">
              Delete
            </button>
          </div>
        </div>
      </ConfirmPopup>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <section className="w-full pt-32 pb-20 flex flex-col items-center">
          <h1 className="text-xl font-bold text-secondary">List Promo</h1>
          <div className="grid grid-cols-1 gap-4 w-full max-w-4xl mt-5">
            {promo.length > 0
              ? promo.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between h-fit p-4 items-center border border-disable-line rounded-lg shadow-md">
                  <span className="font-SFPro font-normal text-base text-text">
                    {item.nama}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleEdit(item, e)}
                      className="bg-blue-500 text-sm text-white px-4 py-2 rounded-md">
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(item, e)}
                      className="bg-red-500 text-sm text-white px-4 py-2 rounded-md">
                      Delete
                    </button>
                  </div>
                </div>
              ))
              : !error && (
                <div className="text-gray-500 mt-8">
                  No promotions available
                </div>
              )}
          </div>

          <div className="absolute right-0 bottom-0 p-4 z-0">
            <button
              onClick={() => setOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Add Promo
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default ListPromo;
