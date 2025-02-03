/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../../../assets/component/navbar";
import ConfirmPopup from "../../../assets/component/confirmPopUp.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "../../../assets/component/LoadingSpinner.jsx";

function ListUlasan() {
  const [promo, setPromo] = useState([]);
  const [name, setName] = useState("");
  const [ulasan, setUlasan] = useState("");
  const [rating, setRating] = useState(1);
  const [image, setImage] = useState("");

  const [editName, setEditName] = useState("");
  const [editUlasan, setEditUlasan] = useState("");
  const [editRating, setEditRating] = useState("");
  const [editImage, setEditImage] = useState("");

  const [selectedReview, setSelectedReview] = useState(null);

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPromo = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/ulasan/getAllulasan`
      );
      const data = response.data;
      if (Array.isArray(data)) {
        setPromo(data);
      } else {
        throw new Error("Invalid response format");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.error("Error fetching promo:", err.message);
      toast.error("Failed to fetch promos. Please try again later.");
    }
  };

  useEffect(() => {
    fetchPromo();
  }, []);

  const handleAddPromo = async (e) => {
    e.preventDefault();

    if (!name || !ulasan || !rating || !image) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }
    if (rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 and 5.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/ulasan/tambahulasan`,
        {
          nama: name,
          ulasan: ulasan,
          rating: rating,
          foto: image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setLoading(false);
        setPromo((prev) => [...prev, response.data]);
        setOpen(false);
        setName("");
        setUlasan("");
        setRating(1);
        setImage("");
        toast.success("Promo added successfully!");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.error("Error adding promo:", err.message);
      toast.error("Failed to add promo. Please try again later.");
    }
  };

  const deletePromo = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/ulasan/deleteulasan/${
          selectedReview._id
        }`
      );
      setPromo((prev) =>
        prev.filter((item) => item._id !== selectedReview._id)
      );
      setConfirmOpen(false);
      setLoading(false);
      toast.success("Promo deleted successfully!");
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.error("Error deleting promo:", error.message);
      toast.error("Failed to delete promo. Please try again later.");
    }
  };

  const updatePromo = async (e) => {
    if (editRating < 1 || editRating > 4) {
      toast.error("Rating must be between 1 and 4.");
      return;
    }
    setLoading(true);
    e.preventDefault();
    try {
      const { data: updatedPromo } = await axios.put(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/ulasan/updateulasan/${
          selectedReview._id
        }`,
        {
          nama: editName,
          ulasan: editUlasan,
          raitng: editRating,
          foto: editImage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      toast.success("Promo updated successfully!");
      setPromo((prev) =>
        prev.map((item) =>
          item._id === selectedReview._id ? { ...item, ...updatedPromo } : item
        )
      );
      setEditing(false);
      setEditUlasan("");
      setEditUlasan("");
      setEditName("");
      setEditImage("");
      fetchPromo(); // Refresh the list
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.error("Error updating promo:", error.message);
      toast.error("Failed to update promo. Please try again later.");
    }
  };

  const handleEdit = (item, e) => {
    e.preventDefault();
    setEditing(true);
    setSelectedReview(item);
    setEditName(item.nama);
    setEditUlasan(item.ulasan);
    setEditRating(item.rating);
    setEditImage(item.foto);
    console.log("Edit promo with id:", item._id);
  };

  const handleDelete = (item, e) => {
    e.preventDefault();
    setConfirmOpen(true);
    setSelectedReview(item);
  };

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
    const maxSize = 5 * 1024 * 1024; // 5MB size limit
    if (file.size > maxSize) {
      toast.error("File is too large. Maximum file size is 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (editing) setEditImage(reader.result);
      else setImage(reader.result);
    };
  };

  return (
    <main className="flex flex-col container">
      <Navbar selected={"/ulasan"} />
      <ToastContainer />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <section className="w-full pt-32 pb-20 flex flex-col items-center">
          <h1 className="text-xl font-bold text-secondary">List Review</h1>
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
              Tambah Review
            </button>
          </div>
        </section>
      )}
      <ConfirmPopup open={open} onClose={() => setOpen(false)}>
        <div className="w-fit flex space-x-4">
          <div className="w-full lg:w-fit p-5 border rounded-md shadow-md bg-white">
            <h3 className="text-xl font-semibold mb-4 font-montserrat">
              Foto Reviewer
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
            onSubmit={handleAddPromo}
            className="flex flex-col w-full lg:w-3/4 items-center justify-center p-2 rounded-3xl">
            <div className="w-full p-5 border rounded-md shadow-md bg-white">
              <h3 className="text-xl font-semibold mb-4 font-montserrat">
                Deatil Review
              </h3>
              <div className="flex flex-col space-y-4">
                <div>
                  <label className="block text-gray-700 font-montserrat mb-1">
                    Nama Reviewer
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
                    Ulasan
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md font-montserrat"
                    value={ulasan}
                    onChange={(e) => setUlasan(e.target.value)}
                    placeholder="Masukan ulasan pelanggan"
                    rows="7"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-montserrat mb-1">
                    Rating
                  </label>
                  <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full p-2 border rounded-md font-montserrat"
                    placeholder="Jumlah Bintang"
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
          <div className="w-full lg:w-fit p-5 border rounded-md shadow-md bg-white">
            <h3 className="text-xl font-semibold mb-4 font-montserrat">
              Promo Image
            </h3>
            <div className="flex flex-col space-y-4">
              {selectedReview ? (
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
            onSubmit={updatePromo}
            className="flex flex-col w-full lg:w-3/4 items-center justify-center p-2 rounded-3xl">
            <div className="w-full p-5 border rounded-md shadow-md bg-white">
              <h3 className="text-xl font-semibold mb-4 font-montserrat">
                Detail Review
              </h3>
              <div className="flex flex-col space-y-4">
                <div>
                  <label className="block text-gray-700 font-montserrat mb-1">
                    Nama Reviewer
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
                    Ulasan
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md font-montserrat"
                    value={editUlasan}
                    onChange={(e) => setEditUlasan(e.target.value)}
                    placeholder="Enter product description"
                    rows="7"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-montserrat mb-1">
                    Rating
                  </label>
                  <input
                    type="number"
                    value={editRating}
                    onChange={(e) => setEditRating(e.target.value)}
                    className="w-full p-2 border rounded-md font-montserrat"
                    placeholder="Jumlah Bintang"
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
    </main>
  );
}

export default ListUlasan;
