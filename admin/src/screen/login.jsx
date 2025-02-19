import React, { useState } from "react";
import UserIcon from "../assets/icon/userLogo.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [openPass, setOpenPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/pos/Login`,
        { name: username, password: password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Cek respons dari API
      console.log("API Response:", res.data);
      const { level } = res.data;
      if (level === undefined) {
        toast.error("Level admin tidak ditemukan.");
        setLoading(false);
        return;
      }

      toast.success("Login Berhasil");

      // Simpan token ke localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("level", res.data.level);

      // Navigasi berdasarkan level admin
      if (level === 1) {
        navigate("/pos");
      } else if (level === 2) {
        navigate("/pos/produks");
      } else if (level === 3) {
        navigate("/pos/Kasir");
      } else if (level === 4) {
        navigate("/pos/display");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.message || "Login Gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-screen bg-gradient-to-l from-[#c2a353] to-[#eac464] flex flex-col items-center justify-between">
      <ToastContainer />
      <h1 className="text-base font-Inter font-semibold capitalize tracking-wide w-[90%] text-left text-white pt-5">
        Point of Sale
      </h1>
      <section className="bg-white rounded-t-[40px] flex flex-col items-center w-full h-[80vh]">
        <img
          src={UserIcon}
          alt="User Icon"
          className="w-[100px] h-[100px] absolute top-20"
        />
        <div className="w-[90%] mt-20 ">
          <h1 className="w-full font-Inter text-center text-xl font-semibold capitalize tracking-tight">
            Masuk
          </h1>
          <form
            className="w-full flex flex-col items-start justify-center gap-4 mt-10"
            onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-2">
              <label>
                <p className="font-Inter text-xs font-normal capitalize text-text">
                  Username
                </p>
              </label>
              <input
                type="text"
                className="w-full h-[40px] border border-[#BDBDBD] rounded-lg px-3 text-xs font-Inter font-normal"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label>
                <p className="font-Inter text-xs font-normal capitalize text-text">
                  Password
                </p>
              </label>
              <div className="relative">
                <input
                  type={openPass ? "text" : "password"}
                  className="w-full h-[40px] border border-[#BDBDBD] rounded-lg px-3 text-xs font-Inter font-normal"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  type="button"
                  className="absolute translate-y-1/2"
                  onClick={() => setOpenPass(!openPass)}>
                  {openPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-[40px] ${
                loading
                  ? "bg-gray-400"
                  : "bg-gradient-to-l from-[#c2a353] to-[#eac464]"
              } rounded-lg text-white font-semibold`}>
              {loading ? "Loading..." : "Masuk"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
