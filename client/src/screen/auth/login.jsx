import React, { useState } from "react";
import axios from "axios";
import Footer from "../auth/footer";
import Navbar from "../auth/navbar";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/login", { email, password });
      console.log(res.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      

      {/* Main Content */}
      <div className="container mx-auto flex-grow px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex justify-between items-center text-xs text-gray-400">
          <p>
            Beranda / <span className="text-gray-600">Masuk</span>
          </p>
          <p>
            Belum punya Akun?{" "}
            <a href="#" className="text-[#2b463c] font-medium">
              Daftar
            </a>
          </p>
        </div>

        {/* Form Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Masuk</h2>
          <p className="text-sm text-gray-600 mt-1">
            Masuk untuk melakukan reservasi!
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#2b463c] focus:outline-none"
                placeholder="Masukan Email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Kata Sandi
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#2b463c] focus:outline-none"
                placeholder="Masukan Kata Sandi"
                required
              />
            </div>

            <p className="text-right text-xs text-gray-400">
              <a href="#" className="hover:text-[#2b463c]">
                Lupa Kata Sandi?
              </a>
            </p>

            <button
              type="submit"
              className="w-full py-3 bg-[#dcdcdc] text-white rounded-full font-medium shadow focus:ring-2 focus:ring-[#2b463c] focus:outline-none"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}
