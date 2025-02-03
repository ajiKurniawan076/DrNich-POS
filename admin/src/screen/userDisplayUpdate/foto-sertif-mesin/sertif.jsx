/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../../../assets/component/navbar";
import ConfirmPopup from "../../../assets/component/confirmPopUp.jsx";
import axios from "axios";

function ListSertif() {
  const [sertif, setSertif] = useState([]);
  const [image, setImage] = useState("");

  const [editImage, setEditImage] = useState("");

  const [selectedContent, setSelectedContent] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const fetchSertif = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/foto/getAllSertif`
      );
      const data = response.data;
      if (Array.isArray(data)) {
        setSertif(data);
        setLoading(false);
        setError("");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setLoading(false);
      console.error("Error fetching promo:", err.message);
      setError("Failed to fetch promo. Please try again later.");
    }
  };

  useEffect(() => {
    fetchSertif();
  }, []);

  const handleAddContent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/foto/createSertif`,
        {
          foto: image,
        }
      );
      if (response.status === 200) {
        setOpen(false);
        fetchSertif();
      } else {
        setError("Failed to add promo. Please try again later.");
      }
    } catch (err) {
      console.error("Error adding promo:", err.message);
      setError("Failed to add promo. Please try again later.");
    }
  };

  const deleteGaleri = () => {
    try {
      const response = axios.delete(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/foto/deleteSertif/${
          selectedContent._id
        }`
      );
      window.location.reload();
      fetchSertif();
    } catch (error) {
      console.error("Error deleting promo:", error.message);
      setError("Failed to delete promo. Please try again later.");
    }
    console.log("Delete promo with id:", selectedContent._id);
  };

  const editGaleri = () => {
    try {
      const response = axios.put(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/foto/editSertif/${
          selectedContent._id
        }`,
        {
          foto: editImage,
        }
      );
      fetchSertif();
    } catch (error) {
      console.error("Error editing promo:", error.message);
      setError("Failed to edit promo. Please try again later.");
    }
    console.log("Edit promo with id:", selectedContent._id);
  };

  const handleEdit = (item, e) => {
    e.preventDefault();
    setEditing(true);
    setSelectedContent(item);
    setEditImage(item.foto);
    console.log("Edit promo with id:", item._id);
  };

  const handleDelete = (item, e) => {
    e.preventDefault();
    setConfirmOpen(true);
    setSelectedContent(item);
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
      if (editing) {
        setEditImage(reader.result);
      } else {
        setImage(reader.result);
      }
    };
  };

  return (
    <main className="flex flex-col container">
      <Navbar selected={"/sertifikat"} />
      <ConfirmPopup open={open} onClose={() => setOpen(false)}>
        <div className="w-fit flex items-start space-x-4">
          <div className="w-full lg:w-full p-5 border rounded-md shadow-md bg-white">
            <h3 className="text-xl font-semibold mb-4 font-montserrat">
              Foto Sertifikat
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
          <form
            onSubmit={handleAddContent}
            className="flex flex-col w-full lg:w-3/4 items-center justify-center rounded-3xl">
            <button
              type="submit"
              className="p-2 bg-primary text-white font-SFPro mt-4 px-10 rounded-xl">
              Tambah
            </button>
          </form>
        </div>
      </ConfirmPopup>
      <ConfirmPopup open={editing} onClose={() => setEditing(false)}>
        <div className="w-fit flex items-start space-x-4">
          <div className="w-full lg:w-full p-5 border rounded-md shadow-md bg-white">
            <h3 className="text-xl font-semibold mb-4 font-montserrat">
              Content Thumbnail
            </h3>
            <div className="flex flex-col space-y-4">
              {selectedContent ? (
                <img
                  src={editImage}
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
                  onClick={() => setEditImage(null)}
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
          <form
            onSubmit={editGaleri}
            className="flex flex-col w-full lg:w-3/4 items-center justify-center rounded-3xl">
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
          <h1>Anda yakin ingin menghapus ini?</h1>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setConfirmOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Cancel
            </button>
            <button
              onClick={() => (setConfirmOpen(false), deleteGaleri())}
              className="bg-red-500 text-white px-4 py-2 rounded-md">
              Delete
            </button>
          </div>
        </div>
      </ConfirmPopup>
      <section className="w-full pt-32 pb-20 flex flex-col items-center">
        <h1 className="text-xl font-bold text-secondary">List Sertifikat</h1>
        {error && <div className="text-red-500 my-4">{error}</div>}
        <div className="grid grid-cols-2 gap-4 w-full max-w-4xl mt-5">
          {sertif.length > 0
            ? sertif.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between w-fit h-fit p-4 items-center border border-disable-line rounded-lg shadow-md">
                  <img
                    className="h-auto max-w-96 aspect-video p-4"
                    src={item.foto}
                  />
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

        <div className="fixed right-0 bottom-0 p-4 z-0">
          <button
            onClick={() => setOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded-md">
            Add Gallery
          </button>
        </div>
      </section>
    </main>
  );
}

export default ListSertif;
